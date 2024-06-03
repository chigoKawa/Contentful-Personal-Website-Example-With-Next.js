"use client";
import { Input } from "@nextui-org/react";
import { useState } from "react";

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


const SpaceSetup = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgs, setErrorMsgs] = useState<any>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);

  const handleSubmit = (formData: FormData) => {
    setErrorMsg("");
    setErrorMsgs(false);
    setIsProcessing(true);
    setHasError(false);

    const spaceId = formData.get("space_id") || "";
    const managementToken = formData.get("mgt_access_token") || "";
    const envId = formData.get("env_id") || "";

    const rawFormData = {
      mgt_access_token: formData.get("mgt_access_token"),
      space_id: formData.get("space_id"),
      envId: formData.get("env_id"),
    };

    if (!spaceId || !managementToken || !envId) {
      alert("All fields are required");
      setIsProcessing(false);
      return;
    }
    axios
      .post("/api/seed-space", { data: rawFormData })
      .then((d) => {
        console.log("result", d)
        setHasError(d?.data?.hasError || false);
        setErrorMsgs(d?.data?.messages || false);
        setErrorMsg(d?.data?.message || "");
        setIsProcessing(false);
      })
      .catch((err) => {
        console.error(err);
        setIsProcessing(false);
      });
  };

  return (
    <div className="py-20 spacing-component-max-width">
      <Card className="w-full bg-foreground text-background">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Space Setup</p>
            <p className="text-small text-background/90">
              Fill your empty Contentful space with predefined content types and
              sample content for easy setup and quick start
            </p>
            <p className="text-danger-500">
              **For enhanced security, consider utilizing a temporary Content
              Management API (CMA) token or deleting it after its intended use.
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <form action={handleSubmit} className="">
            <div className=" w-full grid grid-cols-1 gap-6 ">
              <Input
                isRequired
                color="primary"
                type="text"
                label="Space Id"
                name="space_id"
                placeholder="Enter your Contentful Space ID"
                autoComplete="space_id"
              />
              <Input
                isRequired
                color="primary"
                type="text"
                label="Management API Access Token"
                name="mgt_access_token"
                placeholder="Enter your CMA Access Token"
                autoComplete="access_token"
              />

              <Input
                isRequired
                color="primary"
                type="text"
                label="Environment ID"
                name="env_id"
                placeholder="Enter your Environment ID"
              />

              <Button
                disabled={isProcessing}
                isLoading={isProcessing}
                type="submit"
                color="primary"
              >
                {isProcessing ? "Setting up your space.." : "Setup"}
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
            className="text-background"
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

export default SpaceSetup;
