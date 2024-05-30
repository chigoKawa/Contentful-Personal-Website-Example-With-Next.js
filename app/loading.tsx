import { Card, Skeleton } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <>
      <Progress
        size="sm"
        isIndeterminate
        aria-label="Loading..."
        className="w-full"
      />
      <Skeleton className="rounded-lg">
        <div className="h-screen rounded-lg bg-primary-300"></div>
      </Skeleton>
    </>
  );
}
