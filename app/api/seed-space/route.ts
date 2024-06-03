import { createClient } from "contentful-management";
import { NextResponse } from "next/server";

import 'any-observable/register/zen';
import { Observable } from 'rxjs';





import { ctfImport } from "../../ctf-import.mjs";
const contentfulSPaceExportFile = require("@/json/contentful-space-export.json");

export async function POST(request: Request) {
  try {
    const res = await request.json();


    const spaceId = res?.data?.space_id || "";
    const managementToken = res?.data?.mgt_access_token || "";
    const envId = res?.data?.envId || "master";

    //  TODO clean up space if it has content
    const scopedPlainClient = createClient(
      {
        accessToken: managementToken,
      },
      {
        type: "plain",
        defaults: {
          spaceId: spaceId,
          environmentId: envId,
        },
      }
    );

   

    // const entries = await scopedPlainClient.entry.getMany({
    //   query: {
    //     skip: 10,
    //     limit: 100,
    //   },
    // });

    const importOptions = {
      content: contentfulSPaceExportFile,
      spaceId: spaceId,
      managementToken: managementToken,
      environmentId: envId,
    };

    // const importResp = await ctfImport(importOptions);

    return NextResponse.json({ message: "importResp" });
  } catch (error) {
    let errorMessage: string;
    const anyError: any = error;
    if (error instanceof Error) {
      if (anyError?.errors && Array.isArray(anyError.errors)) {
        errorMessage =
          "Multiple errors occurred during Contentful import, check your credentials ";
        const errorMessages = anyError.errors.map((err: any) => {
          const originalError = err.error.originalError;
          return originalError.message
            ? originalError.message
            : "An error occurred";
        });

        let messages = errorMessages;

        try {
          messages = JSON.parse(errorMessages);
        } catch (error) {}

        return NextResponse.json({
          messages: messages,
          message: errorMessage,
          hasError: true,
        });
      }

      if (error.name === "ContentfulMultiError") {
        // Handle ContentfulMultiError specifically

        const originalError = anyError?.originalError;
        if (originalError) {
          errorMessage = originalError.message || "An unknown error occurred.";
        } else {
          errorMessage =
            "Multiple errors occurred during Contentful import, check your credentials ";
        }

        console.error("ContentfulMultiError details:", error);
      } else {
        errorMessage = error.message;
      }
    } else {
      errorMessage = String(error);
    }

    return NextResponse.json({ message: errorMessage, hasError: true });
  }
}
