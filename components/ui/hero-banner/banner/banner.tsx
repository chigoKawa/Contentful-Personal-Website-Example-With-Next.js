import { FC } from "react";

import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import {
  Button,
  Link
} from "@nextui-org/react";

interface IBanner {
  img: IImage;
  headline: string[];
  body: string;
  actions?: ILink[] | null;
  entryId: string;
}
const Banner: FC<IBanner> = ({ img, headline, body, actions, entryId }) => {
  return (
    <section className="bg-background-100 text-foreground">
      
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1
            data-contentful-entry-id={entryId}
            data-contentful-field-id={"headline"}
            className="text-3xl font-extrabold sm:text-5xl"
          >
            {headline?.[0]}
            {headline?.[1] && (
              <strong className="font-extrabold text-danger-700 sm:block">
                {headline?.[1]}
              </strong>
            )}
          </h1>
          <p
            data-contentful-entry-id={entryId}
            data-contentful-field-id={"body"}
            className="mt-4 max-w-lg sm:text-xl/relaxed"
          >
            {body}
          </p>

          <div
            data-contentful-entry-id={entryId}
            data-contentful-field-id={"actionButtons"}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {Array.isArray(actions) &&
              actions?.map((btn: ILink, itx: number) => {
                return (
                  <div key={`${btn.url}-${itx}`} className="w-fullx ">
                    <Button
                      as={Link}
                      href={btn.url}
                      target={btn.openInNewTab ? "_blank" : "_self"}
                      color={btn.color}
                      variant={btn?.variant}
                      size={btn?.size}
                    >
                      {btn?.label}
                    </Button>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
