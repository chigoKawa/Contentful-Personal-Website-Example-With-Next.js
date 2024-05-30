import React, {FC} from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
  Image,
  Link,
  ButtonProps
} from "@nextui-org/react";

interface IButtonVariant{
    variant : ""
}
interface ILinkbutton extends ButtonProps {
    label : string;
    href: string;

}


const LinkButton :FC<ILinkbutton> = ({label, href, variant, radius, color}) => {
  return (
    <Button
      href={href}
      as={Link}
      color={color}
      showAnchorIcon={false}
      variant={variant}
      radius={radius}
      className="px-4 py-3x"
    >
      {label}
    </Button>
  );
};

export default LinkButton;
