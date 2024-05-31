"use client";
import { componentMap } from "@/components/contentful/common/mapping";
import React, { useRef } from "react";

// eslint-disable-next-line react/display-name
const ComponentResolver = React.forwardRef((props: any, ref) => {
  const { inline = false, field } = props;
  const entryId = field?.sys?.id;
  const contentType = field?.sys?.contentType?.sys?.id;

  const Component = componentMap[contentType];
  if (!Component) {
    return <>!{contentType}</>;
  }

  return (
    <div className="">
      
      <Component {...field} {...props} className={props.className} />
    </div>
  );
});

export default ComponentResolver;
