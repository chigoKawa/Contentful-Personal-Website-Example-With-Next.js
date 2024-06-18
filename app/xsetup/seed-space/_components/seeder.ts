"use client";
import { createClient } from "contentful-management";

const contentfulSpaceExportFile = require("@/json/contentful-space-export.json");

async function importEditorInterfaces(
  client: any,
  contentfulSpaceExportFile: any
) {
  try {
    for (const editorInterface of contentfulSpaceExportFile.editorInterfaces) {
      const contentTypeId = editorInterface?.sys?.contentType?.sys?.id;
      if (contentTypeId) {
        console.log(
          `Importing editor interface for content type "${contentTypeId}"`
        );

        // Fetch the current editor interface to get the version number
        const currentEditorInterface = await client.editorInterface.get({
          contentTypeId,
        });
        const currentVersion = currentEditorInterface.sys.version;

        await client.editorInterface.update(
          { contentTypeId },
          { ...editorInterface, sys: { version: currentVersion } }
        );
      }
    }
    console.log("Editor interfaces imported successfully.");
  } catch (error) {
    console.error("Error importing editor interfaces:", error);
    throw error;
  }
}

export async function cleanSpace(client: any) {
  const entries = await client.entry.getMany({});
  // delete entries
  console.error(`Deleting!  entries`, entries);
  for (const entry of entries.items) {
    if (entry.sys.publishedVersion) {
      console.log(`Unpublishing entry "${entry.sys.id}"`);

      try {
        await client.entry.unpublish(
          {
            entryId: entry?.sys?.id,
          },
          { ...entry }
        );
      } catch (error) {}
    }

    await client.entry.delete({
      entryId: entry?.sys?.id,
    });
  }

  // Clean assets
  const assets = await client.asset.getMany({});
  console.error(`Deleting ${assets.total} assets`);
  for (const asset of assets.items) {
    console.log("asset sys", asset.sys);
    if (asset.sys.firstPublishedAt) {
      console.log(`Unpublishing asset "${asset.sys.id}"`);
      try {
        await client.asset.unpublish({
          assetId: asset.sys.id,
        });
      } catch (error) {}
    }
    await client.asset.delete({
      assetId: asset.sys.id,
    });
  }

  // delete content types

  const contentTypes = await client.contentType.getMany({});
  let totalContentTypes = contentTypes.total;
  console.log(`Deleting! ${totalContentTypes} content types`);

  for (const contentType of contentTypes.items) {
    if (contentType.sys.firstPublishedAt) {
      console.log(`Unpublishing content type "${contentType.sys.id}"`);

      await client.contentType.unpublish({
        contentTypeId: contentType.sys.id,
      });
    }

    await client.contentType.delete({
      contentTypeId: contentType.sys.id,
    });
  }
}

async function createAndPublishContentType(client: any, contentType: any) {
  try {
    const createdContentType = await client.contentType.createWithId(
      { contentTypeId: contentType.sys.id },
      {
        name: contentType.name,
        fields: contentType.fields,
        displayField: contentType.displayField,
        description: contentType.description,
      }
    );

    await client.contentType.publish(
      { contentTypeId: createdContentType.sys.id },
      {
        sys: {
          version: 1,
        },
      }
    );

    console.log(`Content type ${contentType.sys.id} published.`);
  } catch (error) {
    console.error(`Error creating content type ${contentType.sys.id}:`, error);
    throw error;
  }
}

async function createEntriesWithoutPublishing(client: any, entries: any[]) {
  const createdEntries = {};

  for (const entry of entries) {
    try {
      const createdEntry = await client.entry.createWithId(
        { entryId: entry.sys.id, contentTypeId: entry.sys.contentType.sys.id },
        { fields: entry.fields }
      );
      // @ts-ignore
      createdEntries[entry.sys.id] = createdEntry;
      console.log(`Entry created: ${createdEntry.sys.id}`);
    } catch (error) {
      console.error(`Error creating entry ${entry.sys.id}:`, error);
      throw error;
    }
  }

  return createdEntries;
}

async function updateAndPublishEntries(
  client: any,
  entries: any[],
  createdEntries: any
) {
  for (const entry of entries) {
    try {
      const entryToUpdate = createdEntries[entry.sys.id];

      // Update the entry if it has dependencies
      if (entry.fields) {
        for (const locale of Object.keys(entry.fields)) {
          for (const field of Object.keys(entry.fields[locale])) {
            const fieldValue = entry.fields[locale][field];

            // Check if the field value is a link
            if (
              fieldValue &&
              fieldValue.sys &&
              fieldValue.sys.type === "Link"
            ) {
              const linkedEntryId = fieldValue.sys.id;
              if (!createdEntries[linkedEntryId]) {
                console.error(
                  `Dependency ${linkedEntryId} for entry ${entry.sys.id} not found.`
                );
                // throw new Error(
                //   `Dependency ${linkedEntryId} for entry ${entry.sys.id} not found.`
                // );
              }
            }
          }
        }
      }

      const updatedEntry = await client.entry.update(
        { entryId: entryToUpdate.sys.id },
        { sys: entryToUpdate.sys, fields: entryToUpdate.fields }
      );
      try {
        const publishedEntry = await client.entry.publish(
          {
            entryId: updatedEntry.sys.id,
          },
          {
            ...updatedEntry,
          }
        );
        console.log(`Entry published: ${publishedEntry.sys.id}`);
      } catch (error) {}
    } catch (error) {
      console.error(
        `Error updating or publishing entry ${entry.sys.id}:`,
        error
      );
      throw error;
    }
  }
}

async function createAndPublishAsset(client: any, asset: any) {
  try {
    const createdAsset = await client.asset.createWithId(
      { assetId: asset.sys.id },
      {
        fields: {
          ...asset.fields,
          file: {
            "en-US": {
              contentType: asset.fields.file["en-US"].contentType,
              fileName: asset.fields.file["en-US"].fileName,
              upload: `https:${asset.fields.file["en-US"].url}`,
            },
          },
        },
      }
    );

    console.log(`Asset created: ${createdAsset.fields.file}`);

    // await client.asset.processForAllLocales({ assetId: createdAsset.sys.id });
    const processedAsset = await client.asset.processForAllLocales(
      { assetId: createdAsset.sys.id },
      { ...createdAsset }
    );

    // Wait for the asset to be ready
    let assetReady = false;
    while (!assetReady) {
      const assetStatus = await client.asset.get({
        assetId: processedAsset.sys.id,
      });
      if (assetStatus.fields.file["en-US"].url) {
        assetReady = true;
      } else {
        console.log("Waiting for asset to be processed...");
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before checking again
      }
    }

  

    // Publish the asset
    const publishedAsset = await client.asset.publish(
      {
        assetId: processedAsset.sys.id,
      },
      { ...processedAsset }
    );

    // await client.asset.publish({ assetId: createdAsset.sys.id });
    console.log("Asset published:", publishedAsset?.sys.id);
  } catch (error) {
    console.error(`Error creating asset ${asset.sys.id}:`, error);
    // throw error;
  }
}

export async function seedTheSpace({ managementToken, spaceId, envId }: any) {
  try {
    const client = createClient(
      { accessToken: managementToken },
      {
        type: "plain",
        defaults: { spaceId, environmentId: envId },
      }
    );

    await cleanSpace(client);

    // Create and publish content types
    for (const contentType of contentfulSpaceExportFile.contentTypes) {
      await createAndPublishContentType(client, contentType);
    }

    //  update editor interface
    await importEditorInterfaces(client, contentfulSpaceExportFile);

    // Create and publish assets
    for (const asset of contentfulSpaceExportFile.assets) {
      await createAndPublishAsset(client, asset);
    }

    // Create entries without publishing
    const createdEntries = await createEntriesWithoutPublishing(
      client,
      contentfulSpaceExportFile.entries
    );

    // Update and publish entries
    await updateAndPublishEntries(
      client,
      contentfulSpaceExportFile.entries,
      createdEntries
    );

    return { message: "Space setup was successful" };
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error during Contentful import:", error);
    return { message: errorMessage, hasError: true };
  }
}
