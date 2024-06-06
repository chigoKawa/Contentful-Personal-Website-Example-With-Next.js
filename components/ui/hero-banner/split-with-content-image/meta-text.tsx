import { ILink } from "@/lib/shared/interfaces/topics";
import { Button, Link } from "@nextui-org/react";
import { FC } from "react";

interface ISplitWithContentImageMeta {
  title: string;
  body: string;
  actions?: any;
  entryId: string;
}
const MetaText: FC<ISplitWithContentImageMeta> = ({
  title,
  body,
  actions,
  entryId,
}) => {
  return (
    <div className="lg:py-24">
      <h2
        data-contentful-entry-id={entryId}
        data-contentful-field-id={"headline"}
        className="text-3xl font-bold sm:text-4xl"
      >
        {title}
      </h2>

      <p
        data-contentful-entry-id={entryId}
        data-contentful-field-id={"body"}
        className="mt-4"
      >
        {body}
      </p>
      <div
        data-contentful-entry-id={entryId}
        data-contentful-field-id={"actionButtons"}
        className="mt-8 flex  flex-wrap gap-4 text-center"
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
  );
};

export default MetaText;
