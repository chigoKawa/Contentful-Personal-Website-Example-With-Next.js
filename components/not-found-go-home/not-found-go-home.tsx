"use client";
import React, { FC } from "react";
import Link from "next/link";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Avatar,
  Button,
} from "@nextui-org/react";

interface IProps {
  title: string;
  body?: string;
  children?: React.ReactNode;
}

const NotFoundGoHome: FC<IProps> = ({ title, body = "", children }) => {
  return (
    <div className="app-spacing app-first-spacing md:py-40">
      <br />
      <div className="flex flex-col items-center space-y-4 bg-background shadow-lg p-10 rounded-lg max-w-md m-auto text-center ">
        <h3 className="text-lgx text-danger font-bold">{title}</h3>
        <div className="mt-2">{body}</div>
        <div className=""></div>
        <Link href="/">
          <Button variant="solid" color="primary">
            Back to home
          </Button>
        </Link>

        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default NotFoundGoHome;
