import React, { FC } from "react";
import { IImage } from "@/lib/shared/interfaces/topics";
import { Chip } from "@nextui-org/chip";
import Link from "next/link";

interface IProps {
  title: string;
  image: IImage;
  author: string;
  date: string;
  href: string;
  tag?: string;
}

const SimpleBlogCard: FC<IProps> = ({
  title,
  image,
  author,
  date,
  tag,
  href
}) => {
  return (
    <div className="relative">
      {tag && (
        <div className="absolute z-30 translate top-8 right-8 ">
          <Chip color="primary">{tag}</Chip>
        </div>
      )}
      <Link href={href}>
      <div className="group cursor-pointer w-full  border border-default-300 rounded-2xl p-5 transition-all duration-300 hover:border-primary-600">
        <div className="flex items-center mb-6">
          
          <img src={image.url} alt={image.alt} className="rounded-lg w-full " />
        </div>
        <div className="block">
          <h4 className=" font-medium leading-8 mb-9 line-clamp-1">{title}</h4>
          <div className="flex items-center justify-between  font-medium">
            <h6 className="text-sm text-foreground-500">{author}</h6>
            <span className="text-sm text-primary-600">{date}</span>
          </div>
        </div>
      </div>
      </Link>

  
    </div>
  );
};

export default SimpleBlogCard;
