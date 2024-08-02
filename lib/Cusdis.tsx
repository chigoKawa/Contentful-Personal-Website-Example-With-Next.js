"use client"
import { useEffect } from 'react';
import Script from 'next/script';

interface CusdisProps {
  appId: string;
  pageId: string;
  pageUrl: string;
  pageTitle: string;
}

declare global {
  interface Window {
    CUSDIS: {
      renderTo: (target: HTMLElement) => void;
      setTheme: (theme: 'dark' | 'light' | 'auto') => void;
      initial: () => void;
    };
  }
}

const Cusdis: React.FC<CusdisProps> = ({ appId, pageId, pageUrl, pageTitle }) => {
  useEffect(() => {
    if (window.CUSDIS) {
      window.CUSDIS.renderTo(document.getElementById('cusdis_thread') as HTMLElement);
    }
  }, []);

  return (
    <>
      <div
        id="cusdis_thread"
        data-host="https://cusdis.com"
        data-app-id={appId}
        data-page-id={pageId}
        data-page-url={pageUrl}
        data-page-title={pageTitle}
      ></div>
      <Script
        src="https://cusdis.com/js/cusdis.es.js"
        strategy="lazyOnload"
        onLoad={() => {
          if (window.CUSDIS) {
            window.CUSDIS.renderTo(document.getElementById('cusdis_thread') as HTMLElement);
          }
        }}
      />
    </>
  );
};

export default Cusdis;
