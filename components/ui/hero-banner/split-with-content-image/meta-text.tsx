import React, { FC } from "react";
import LinkButton from "@/components/primitives/link-button";
import { IImage, ILink } from "@/lib/shared/interfaces/topics";
import NextImage from "next/image";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Link,
} from "@nextui-org/react";

interface ISplitWithContentImageMeta {
  title: string;
  body: string;
  actions?: any;
  entryId: string;
}
const MetaText: FC<ISplitWithContentImageMeta> = ({ title, body, actions, entryId }) => {
  return (
    <div className="lg:py-24">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>

      <p className="mt-4">{body}</p>
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
