import React, { FC } from "react";
import { IImage } from "@/lib/shared/interfaces/topics";

export interface IImageItem {
  image: IImage;
  title: string;
  body: string;
}

interface IProps {
  item: IImageItem;
}

const CarouselItem: FC<IProps> = ({ item }) => {
  return (
    <div
      className="relative float-left -mr-[100%] hiddenx w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div
        className="h-[600px]x relative overflow-hidden bg-cover bg-no-repeat"
        style={{ backgroundPosition: "50%" }}
      >
        <img
          src={item?.image?.url}
          className="block w-full object-contain object-center h-[600px]  max-w-full "
        />
        <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-black bg-fixed opacity-50" />
      </div>
      <div className="absolute inset-x-[15%] bottom-5 hidden py-5 text-center text-white md:block">
        <h5 className="text-xl">{item?.title}</h5>
        <p>{item?.body}</p>
      </div>
    </div>
  );
};

export default CarouselItem;
