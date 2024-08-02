"use client";
import {
  createCommentsDb,
  hasCommentsTable,
} from "@/components/blog-page/blog-comments/actions";
import { useEffect, useState } from "react";


import { Button } from "@nextui-org/button";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from "@nextui-org/react";

const ConfigureComments = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgs, setErrorMsgs] = useState<any>(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const [hasComments, setHasComments] = useState<boolean>(true);

  const checkTable = async () => {
    try {
      setIsProcessing(true);
      const hasCmntTable = await hasCommentsTable();
      setIsProcessing(false);
      setHasComments(hasCmntTable);
    } catch (error) {
      setIsProcessing(false);
      setHasComments(false)
    }
  };
  const handleSubmit = async () => {
    const hasConsent = confirm(
      "⚠️ This would create a new Table in your configured Postgres database. Continue?"
    );

    if (!hasConsent) {
      return;
    }

    setErrorMsg("");
    setErrorMsgs(false);
    setIsProcessing(true);
    setHasError(false);

    try {
      const dbCreation = await createCommentsDb();
      setIsProcessing(false);
      alert("Configured successfully!");
      checkTable();
    } catch (error) {
      setHasError(true);
      if (error instanceof Error) {
   
        setErrorMsg(error.message);
      } else {
        setErrorMsg(String(error));
      }
      setIsProcessing(false);
      setHasError(true);
    }

    return;
  };



  useEffect(() => {
  

    checkTable();

    return () => {};
  }, []);

  return (
    <div className="py-20 spacing-component-max-width">
      <Card
        isBlurred
        shadow="lg"
        className="w-full border-[2px] border-primary p-4"
      >
        <CardHeader className="flex gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-xl font-bold">Add comments to your blog</p>
            <p className="text-small text-foreground/90">
              You need to setup Postgress in Vercel{" "}
              <Link href="https://vercel.com/docs/storage#vercel-postgres">
                Here
              </Link>
            </p>
            <p className="text-lg">
              {`If you have set up Vercel PostgreSQL and added the necessary environment variables, click "Configure Comments Database" below to proceed.`}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="">
            <Button
              disabled={isProcessing || hasComments}
              isLoading={isProcessing}
              type="submit"
              color="success"
              onClick={handleSubmit}
            >
              {hasComments ? (
                "Comments Table Already Exists"
              ) : (
                <>
                  {isProcessing
                    ? "Configuring Comments Database.."
                    : "Configure Comments Database"}
                </>
              )}
            </Button>

            <p className="mt-3 text-danger">{errorMsg}</p>
          </div>
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

export default ConfigureComments;
