import React, { FC } from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaGithub, FaInstagram } from "react-icons/fa";
import { PiPlaceholderDuotone, PiPlaceholderBold } from "react-icons/pi";


interface IIconPicker {
  name:
    | "Twitter"
    | "Instagram"
    | "Facebook"
    | "TikTok"
    | "LinkedIn"
    | "Github"
    | string;
}

const ICON_SIZE = 20;
const IconPicker: FC<IIconPicker> = ({ name }) => {
  if (name === "LinkedIn") {
    return <FaLinkedin size={ICON_SIZE} className=""/>;
  }
  if (name === "Twitter") {
    return <FaTwitter size={ICON_SIZE} />;
  }
  if (name === "Instagram") {
    return <FaInstagram size={ICON_SIZE} />;
  }
  if (name === "Facebook") {
    return <FaFacebook size={ICON_SIZE} />;
  }
  if (name === "Github") {
    return <FaGithub size={ICON_SIZE} />;
  }

  return <PiPlaceholderBold size={ICON_SIZE} />;
};

export default IconPicker;
