import { draftMode, cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/lib/contentful/client";

const { CONTENTFUL_PREVIEW_SECRET } = process.env;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  if (searchParams.get("previewSecret") !== CONTENTFUL_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  const slug = searchParams.get("slug");
  const pageType = searchParams.get("type");

  draftMode().enable();
  // Set the cookie here

  const cookieStore = cookies();
  const cookie = cookieStore.get("__prerender_bypass")!;
  const draftValue = cookie?.value;
  if (draftValue) {
    cookies().set({
      name: "__prerender_bypass",
      value: draftValue,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none",
    });
  }

  // const headers = new Headers();
  let redirectTo = "/";

  if (pageType === "landingPage") {
    // handle landing page redirect

    redirectTo = `/${slug}`;
  }

  if (pageType === "blog") {
    // handle landing page redirect
   

    return client(true)
      .getEntries({
        content_type: "blogPost",
        // @ts-ignore
        "fields.slug": slug,
      })
      .then((res) => {
        const post: any = res?.items?.[0];
        const category: any = post?.fields?.category?.fields?.slug;

        redirectTo = `/blog/${category}/${slug}`;
        redirect(redirectTo);
      });
  }

  if (pageType === "category") {
    // handle landing page redirect

    redirectTo = `/category/${slug}`;
  }

  // const redirectTo = searchParams.get("redirect");

  if (redirectTo === "/homepage") {
    redirect("/");
  }

  redirect(redirectTo || "/");
}
