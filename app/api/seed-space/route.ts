import { createClient } from "contentful-management";
import { NextResponse } from "next/server";

const contentfulSpaceExportFile = require("@/json/contentful-space-export.json");

async function cleanSpace(client: any) {
  const entries = await client.entry.getMany({});
  // delete entries
  console.error(`Deleting!  entries`, entries);
  for (const entry of entries.items) {
    if (entry.sys.firstPublishedAt) {
      console.log(`Unpublishing entry "${entry.sys.id}"`);

      await client.entry.unpublish(
        {
          entryId: entry?.sys?.id,
        },
        { ...entry }
      );
    }

    await client.entry.delete({
      entryId: entry?.sys?.id,
    });
  }

  // delete content types

  const contentTypes = await client.contentType.getMany({});
  let totalContentTypes = contentTypes.total;
  console.log(`Deleting! ${totalContentTypes} content types`);
  console.log(contentTypes);
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

      const publishedEntry = await client.entry.publish(
        {
          entryId: updatedEntry.sys.id,
        },
        {
          ...updatedEntry,
        }
      );
      console.log(`Entry published: ${publishedEntry.sys.id}`);
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

    // Wait for the asset to be processed
    // while (true) {
    //   const assetStatus = await client.asset.get({
    //     assetId: createdAsset.sys.id,
    //   });
    //   if (assetStatus.fields.file["en-US"].url) break;
    //   console.log("Waiting for asset to be processed...");
    //   await new Promise((resolve) => setTimeout(resolve, 1000));
    // }

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
    throw error;
  }
}

async function createAndPublishEntry(client: any, entry: any) {
  try {
    // const createdEntry = await client.entry.createWithId(
    //   { entryId: entry.sys.id, contentTypeId: entry.sys.contentType.sys.id },
    //   { fields: entry.fields }
    // );

    client.entry
      .create(
        { contentTypeId: entry?.sys?.contentType?.sys?.id },
        {
          fields: entry.fields,
        }
      )
      .then((entryRecord: any) => {
        client.entry.publish(
          { entryId: entryRecord.sys.id },
          {
            ...entryRecord,
          }
        );
      })
      .catch((er: any) => {
        throw er;
      });

    // console.log(`Entry published: ${createdEntry.sys.id}`);
  } catch (error) {
    console.error(`Error creating entry ${entry.sys.id}:`, error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const spaceId = res?.data?.space_id || "";
    const managementToken = res?.data?.mgt_access_token || "";
    const envId = res?.data?.envId || "master";

    const client = createClient(
      { accessToken: managementToken },
      {
        type: "plain",
        defaults: { spaceId, environmentId: envId },
      }
    );
    //  clean the space

    await cleanSpace(client);

    // Create and publish content types
    for (const contentType of contentfulSpaceExportFile.contentTypes) {
      await createAndPublishContentType(client, contentType);
    }

    // Create and publish assets
    for (const asset of contentfulSpaceExportFile.assets) {
      await createAndPublishAsset(client, asset);
    }

    // Create and publish entries
    // for (const entry of contentfulSpaceExportFile.entries) {
    //   await createAndPublishEntry(client, entry);
    // }

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

    return NextResponse.json({ message: "Space setup was successful" });
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error during Contentful import:", error);
    return NextResponse.json({ message: errorMessage, hasError: true });
  }
}
