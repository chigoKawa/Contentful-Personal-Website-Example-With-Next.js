"use client";
import { createClient } from "contentful-management";
import { cleanSpace } from "../../seed-space/_components/seeder";

export async function cleanTheSpace({ managementToken, spaceId, envId }: any) {
  try {
    const client = createClient(
      { accessToken: managementToken },
      {
        type: "plain",
        defaults: { spaceId, environmentId: envId },
      }
    );

    await cleanSpace(client);

    return { message: "Space cleaning was successful" };
  } catch (error) {
    let errorMessage = "An unknown error occurred.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Error cleaning space:", error);
    return { message: errorMessage, hasError: true };
  }
}
