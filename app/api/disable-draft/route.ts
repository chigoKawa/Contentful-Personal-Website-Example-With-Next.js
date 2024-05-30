import { draftMode } from "next/headers";

export async function GET(request: Request) {
  draftMode().disable();
  return new Response("Preview mode is disabled");
}