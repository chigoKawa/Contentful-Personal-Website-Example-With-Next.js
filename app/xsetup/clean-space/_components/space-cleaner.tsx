"use client";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import { cleanTheSpace } from "./cleaner";

import axios from "axios";

import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";

const SpaceCleaner = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgs, setErrorMsgs] = useState<any>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = (formData: FormData) => {
    const spaceId = formData.get("space_id") || "";
    const managementToken = formData.get("mgt_access_token") || "";
    const envId = formData.get("env_id") || "";

    if (!spaceId || !managementToken || !envId) {
      alert("All fields are required");

      return;
    }

    const hasConsent = confirm(
      "⚠️ This would wipe clean the selected space!!! Do you want to proceed?"
    );

    if (!hasConsent) {
      return;
    }

    setErrorMsg("");
    setErrorMsgs(false);
    setIsProcessing(true);
    setHasError(false);

    cleanTheSpace({ spaceId, managementToken, envId })
      .then((d: any) => {
        console.log("e don do!!!", d);
        setHasError(d?.hasError || false);
        setErrorMsgs(d?.messages || false);
        setErrorMsg(d?.message || "");
        setIsProcessing(false);
      })
      .catch((err) => {
        setIsProcessing(false);
        setHasError(true);
        setErrorMsg(err);
      });

    return;
  };

  return (
    <div className="py-20 spacing-component-max-width">
      <Card
        isBlurred
        shadow="lg"
        className="w-full border-[2px] border-primary p-4"
      >
        <CardHeader className="flex gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Space Cleaner</p>
            <p className="text-small text-foreground/90">
              <b className="text-warning">⚠️WARNING!</b> This tool will
              permanently delete all entries and content types from your
              Contentful space.{" "}
            </p>
            <p className="text-danger-500">
              **For enhanced security, consider utilizing a temporary Content
              Management API (CMA) token or deleting it after using it.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form action={handleSubmit} className="">
            <div className=" w-full grid grid-cols-1 gap-6 ">
              <Input
                isRequired
                color="default"
                type="text"
                label="Space Id"
                name="space_id"
                placeholder="Enter your Contentful Space ID"
                autoComplete="space_id"
              />
              <Input
                isRequired
                color="default"
                type="text"
                label="Management API Access Token"
                name="mgt_access_token"
                placeholder="Enter your CMA Access Token"
                autoComplete="access_token"
              />

              <Input
                isRequired
                color="default"
                type="text"
                label="Environment ID"
                name="env_id"
                placeholder="Enter your Environment ID"
              />

              <Button
                disabled={isProcessing}
                isLoading={isProcessing}
                type="submit"
                color="danger"
              >
                {isProcessing ? "Cleaning your space.." : "⚠️ Clean Space"}
              </Button>
              {hasError ? (
                <div className="">
                  {errorMsg && <p className="text-danger">{errorMsg}</p>}
                  {errorMsgs && (
                    <p className="px-2 text-danger-500">
                      {`> `} [{errorMsgs?.statusText}]{" "}
                      {errorMsgs?.details?.type && (
                        <> :[{errorMsgs?.details?.type}]</>
                      )}{" "}
                      : {errorMsgs?.message}
                    </p>
                  )}

                  {/* {JSON.stringify(errorMsgs)} */}
                </div>
              ) : (
                <> {errorMsg && <p className="text-success">{errorMsg}</p>}</>
              )}
            </div>
          </form>{" "}
        </CardBody>
        <Divider />
        <CardFooter className="">
          <Link
            className=""
            isExternal
            showAnchorIcon
            href="https://www.linkedin.com/in/chigokawa/"
          >
            Got questions?
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SpaceCleaner;
