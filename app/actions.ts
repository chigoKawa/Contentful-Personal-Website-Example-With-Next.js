"use server";

import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";
import contentful from "contentful-management";
import { createClient } from "contentful-management";
import spaceImport from "contentful-import";
import { ctfImport } from "./ctf-import.mjs";
const contentfulSPaceExportFile = require("../json/contentful-space-export.json");

// const contentful = require("contentful-management");
// const spaceImport = require("contentful-import");

export async function createPost(id: string) {
  try {
    // ...
  } catch (error) {
    // ...
  }

  revalidateTag("posts"); // Update cached posts
  redirect(`/post/${id}`); // Navigate to the new post page
}

export async function seedSpace(formData: FormData) {
  try {
    const spaceId = formData.get("space_id") || "";
    const managementToken = formData.get("mgt_access_token") || "";
    const envId = formData.get("env_id") || "master";

    const importOptions = {
      content: contentfulSPaceExportFile,
      spaceId: spaceId,
      managementToken: managementToken,
      environmentId: envId,
    };

    const importResp = ctfImport(importOptions);

    return { message: importResp };

    // spaceImport(options)
    //   .then(() => {
    //     console.log("Data imported successfully");
    //   })
    //   .catch((err) => {
    //     console.log("Oh no! Some errors occurred!", err);
    //   });

    // await spaceImport({
    //     spaceId: spaceId,
    //     managementToken: managementToken,
    //     environmentId: envId,
    //     content: contentfulSPaceExportFile,
    //   });
  } catch (error) {
    console.error(error);
    return { message: error };
  }
}
