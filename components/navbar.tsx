"use client";

import {
  Navbar as NextUINavbar,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";

import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { MdOutlineLink } from "react-icons/md";
import IconPicker from "@/components/ui/icon-picker/icon-picker";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { FaChevronRight, FaChevronDown } from "react-icons/fa";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import {
  INavigationMenu,
  INavigationItem,
} from "@/lib/contentful/interfaces/blocks";
import { FC, useState } from "react";
import {
  retrieveImageUrlFromMediaWrapper,
  retrieveUrlFromTarget,
  extractCtfImageUrl,
} from "@/lib/contentful/helpers/common";

import { Logo } from "@/components/icons";

interface INavbar {
  navEntry: INavigationMenu;
}



const NavMenuSubItem = ({ item }: { item: INavigationItem }) => {
  const subNavigationItems: any | undefined = item?.fields?.subNavigationItems;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dropdown key={item.sys.id} type="listbox">
      <NavbarItem>
        <DropdownTrigger>
          <div
            className={clsx(
              "data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer"
            )}
            color="foreground"
            // href={
            //   item.fields.target
            //     ? retrieveUrlFromTarget(item.fields.target)
            //     : "/"
            // }
            onMouseEnter={() => {
              setIsOpen(true);
            }}
          >
            <div
              data-contentful-entry-id={item?.sys?.id}
              data-contentful-field-id={"label"}
              className="flex space-x-2 items-center"
            >
              <span className="">{item.fields.label}</span>
              <FaChevronDown />
            </div>
          </div>
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="Sub Menu items"
        itemClasses={{
          base: "",
        }}
        onMouseLeave={() => {
          setIsOpen(false);
        }}
      >
        {subNavigationItems.map((subItem: INavigationItem, sbx: number) => {
          return (
            <DropdownItem
              key={`${subItem?.sys?.id}-${sbx}`}
              description=""
              startContent={<MdOutlineLink />}
            >
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={
                  subItem.fields.target
                    ? retrieveUrlFromTarget(subItem.fields.target)
                    : "/"
                }
              >
                {subItem?.fields?.label}
              </NextLink>
            </DropdownItem>
          );
        })}
      </DropdownMenu>
    </Dropdown>
  );
};

const NavMenuComposite = ({ navEntry }: { navEntry: INavigationMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {navEntry?.fields?.content?.map((item, itx) => {
        let subNavigationItems: any | undefined =
          item?.fields?.subNavigationItems;
        if (subNavigationItems) {
          return <NavMenuSubItem key={item.sys.id} item={item} />;
        }
        return (
          <NavbarItem
            data-contentful-entry-id={item?.sys?.id}
            data-contentful-field-id={"label"}
            key={item.sys.id}
          >
            <NextLink
              className={clsx(
                linkStyles({ color: "foreground" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="foreground"
              href={
                item.fields.target
                  ? retrieveUrlFromTarget(item.fields.target)
                  : "/"
              }
            >
              {item.fields.label}
            </NextLink>
          </NavbarItem>
        );
      })}
    </>
  );
};
export const Navbar: FC<INavbar> = ({ navEntry }) => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );
  const siteName = navEntry?.fields?.siteName || "Site Name";
  const siteLogo: string =
    extractCtfImageUrl(navEntry?.fields?.siteLogo) ||
    "https://picsum.photos/200/300";

  return (
    <NextUINavbar
      data-contentful-entry-id={navEntry?.sys?.id}
      data-contentful-field-id={"content"}
      maxWidth="xl"
      position="sticky"
      className="bg-primaryx text-primary-foregroundx"
    >
      <NavbarBrand as="li" className="gap-3 max-w-fit ">
        <NextLink className="flex justify-start items-center gap-1" href="/">
          <div className="w-full ">
            <img src={siteLogo} alt="site logo" className="w-28 h-full" />
          </div>
          <p
            data-contentful-entry-id={navEntry?.sys?.id}
            data-contentful-field-id={"siteName"}
            className="font-bold text-inherit text-small uppercase "
          >
            {siteName}
          </p>
        </NextLink>
      </NavbarBrand>

      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          <NavMenuComposite navEntry={navEntry} />
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {navEntry?.fields?.socialLinks?.map((lnk, lnx) => {
            return (
              <Link
                key={`${lnk?.sys?.id}-${lnx}`}
                isExternal
                href={lnk ? retrieveUrlFromTarget(lnk) : "/"}
                aria-label="Twitter"
              >
                <div className="text-foregroundx">
                  <IconPicker name={lnk?.fields?.optionalIcon || ""} />
                </div>
              </Link>
            );
          })}

          {/* <ThemeSwitch /> */}
        </NavbarItem>
        <NavbarItem className="hidden lg:flexx">{searchInput}</NavbarItem>
        <NavbarItem className="hidden md:flexx">
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-default-600 bg-default-100"
            href={siteConfig.links.sponsor}
            startContent={<HeartFilledIcon className="text-danger" />}
            variant="flat"
          >
            Sponsor
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal href={siteConfig.links.github} aria-label="Github">
          <GithubIcon className="text-default-500" />
        </Link> */}
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {/* {searchInput} */}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navEntry?.fields?.content?.map((item, index) => (
            <NavbarMenuItem
              className="!list-none"
              key={`${item?.sys?.id}-${index}`}
            >
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === navEntry?.fields?.content.length - 1
                    ? "danger"
                    : "foreground"
                }
                href={
                  item.fields.target
                    ? retrieveUrlFromTarget(item.fields.target)
                    : "/"
                }
                size="lg"
              >
                {item?.fields?.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
