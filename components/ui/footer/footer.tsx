"use client";
import React, { FC } from "react";
import {
  INavigationMenu,
  INavigationItem,
} from "@/lib/contentful/interfaces/blocks";
import FooterSection from "./footer-section";
import {
  retrieveImageUrlFromMediaWrapper,
  retrieveUrlFromTarget,
  extractCtfImageUrl,
} from "@/lib/contentful/helpers/common";
import IconPicker from "@/components/ui/icon-picker/icon-picker";
import { Link } from "@nextui-org/link";
import { Divider } from "@nextui-org/divider";

interface INavbar {
  navEntry: INavigationMenu;
}

const Footer: FC<INavbar> = ({ navEntry }) => {
  const footerSections = navEntry?.fields?.footerSections;
  const year = new Date().getFullYear();
  const siteName = navEntry?.fields?.siteName || "Site Name";
  const siteLogo: string =
    extractCtfImageUrl(navEntry?.fields?.siteLogo) ||
    "https://picsum.photos/200/300";
  return (
    <footer className="">
      <Divider orientation="horizontal" />
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="hidden flex flex-col items-center gap-4 rounded-lg bg-primary-600 p-6 shadow-lg sm:flex-row sm:justify-between">
          <strong className="text-xl text-white sm:text-xl">
            Make Your Next Career Move!{" "}
          </strong>

          <a
            className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 text-indigo-600 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90"
            href="#"
          >
            <span className="text-sm font-medium"> Lets Get Started </span>

            <svg
              className="size-5 rtl:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 justify-items-centerx">
          {footerSections?.map((sct, sctx) => {
            return (
              <FooterSection section={sct} key={`${sct?.sys?.id}-${sctx}`} />
            );
          })}
        </div>

        <div className="mt-16">
          <ul className="flex justify-center gap-6 sm:justify-end list-none">
            {navEntry?.fields?.socialLinks?.map((lnk, lnx) => {
              return (
                <Link
                  key={`${lnk?.sys?.id}-${lnx}`}
                  isExternal
                  href={lnk ? retrieveUrlFromTarget(lnk) : "/"}
                  aria-label={lnk?.fields?.title}
                >
                  <div className="text-foreground">
                    
                    <IconPicker name={lnk?.fields?.optionalIcon || ""} />
                  </div>
                </Link>
              );
            })}
          </ul>

          <div className="mt-16 sm:flex sm:items-center sm:justify-between">
            <div className="flex justify-center  sm:justify-start">
              <div
                data-contentful-entry-id={navEntry?.sys?.id}
                data-contentful-field-id={"siteLogo"}
                className="w-full "
              >
                <img src={siteLogo} alt="site logo" className="w-full md:w-40 h-full" />
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-foreground-500 sm:mt-0 sm:text-right">
              Copyright &copy; {siteName} {year} {"  "} All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
