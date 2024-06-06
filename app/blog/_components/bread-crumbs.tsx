"use client";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";
import { useParams } from "next/navigation";
import { FC } from "react";

interface ICrumbItem {
  label: string;
  href: string;
}
interface IProps {}

const BreadCrumbs: FC<IProps> = () => {
  const params = useParams<{ category: string; slug: string }>();
  return (
    <div>
      <Breadcrumbs color={"primary"}>
        <BreadcrumbItem href={"/blog"}>
          <span className="capitalize">Blog</span>
        </BreadcrumbItem>
        {params?.category && (
          <BreadcrumbItem href={`/blog/${params?.category}`}>
            <span className="capitalize">{params?.category}</span>
          </BreadcrumbItem>
        )}
        {params?.slug && (
          <BreadcrumbItem href={`/blog/${params?.category}/${params?.slug}`}>
            <span className="capitalize"></span>
          </BreadcrumbItem>
        )}
      </Breadcrumbs>
    </div>
  );
};

export default BreadCrumbs;
