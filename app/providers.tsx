"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { ContentfulLivePreviewProvider } from "@contentful/live-preview/react";


export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <ContentfulLivePreviewProvider locale="en-US">
        <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
      </ContentfulLivePreviewProvider>
    </NextUIProvider>
  );
}
