import React from "react";
import { IPerson } from "@/lib/contentful/interfaces/topics";
import Link from "next/link";
import * as HoverCard from "@radix-ui/react-hover-card";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import richtextOptions from "../richtext/richtext-options";
import generateOptions from "../common/richtext/richtext-options";

const Person = ({ firstName, lastName, bio, avatar }: any) => {
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <span className=" text-primary-500  dark:text-accent-300 ">
          {firstName} {lastName}
        </span>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          className="data-[side=bottom]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=left]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade w-[300px] rounded-md bg-background text-blackx p-5 shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className="flex flex-col gap-[7px]">
            {avatar && (
              <img
                className="block h-[60px] w-[60px] rounded-full"
                src={avatar}
                alt={`${firstName} ${lastName}`}
              />
            )}

            <div className="flex flex-col gap-[15px]">
              <div>
                <div className="text-mauve12 m-0 text-[15px] font-medium leading-[1.5]">
                  {firstName} {lastName}
                </div>
                {/* <div className="text-mauve10 m-0 text-[15px] leading-[1.5]">
                  @radix_ui
                </div> */}
              </div>
              {bio && (
                <div className="text-inherit m-0 text-xs leading-[1.5]">
                  {bio}
                </div>
              )}
            </div>
          </div>

          <HoverCard.Arrow className="fill-white" />
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};

const InlinePersonWrapper = (entry: IPerson) => {
  const linkedInlink = entry?.fields?.linkedinProfileUrl?.fields?.url;
  const twitterLink = entry?.fields?.twitterProfileUrl?.fields?.url;
  const firstName = entry?.fields?.firstName;
  const lastName = entry?.fields?.lastName;
  const website = entry?.fields?.website;
  const bio = entry?.fields?.bio;
  const avatar = entry?.fields?.avatar?.fields?.file?.url;
  if (website) {
    return (
      <Link target="_blank" href={website.fields.url}>
        <Person
          bio={bio ? documentToReactComponents(bio, generateOptions()) : ""}
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
      </Link>
    );
  }
  if (linkedInlink) {
    return (
      <Link target="_blank" href={linkedInlink}>
        <Person
          bio={bio ? documentToReactComponents(bio, generateOptions()) : ""}
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
      </Link>
    );
  }
  if (twitterLink) {
    return (
      <Link target="_blank" href={twitterLink}>
        <Person
          bio={bio ? documentToReactComponents(bio, generateOptions()) : ""}
          avatar={avatar}
          firstName={firstName}
          lastName={lastName}
        />
      </Link>
    );
  }
  return (
    <Person
      bio={bio ? documentToReactComponents(bio, generateOptions()) : ""}
      avatar={avatar}
      firstName={firstName}
      lastName={lastName}
    />
  );
};

export default InlinePersonWrapper;
