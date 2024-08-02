import { useEffect } from 'react';

const CoralEmbed = ({storyID, storyURL}: any) => {
  useEffect(() => {
    const d = document;
    const s = d.createElement('script');
    s.src = 'http://127.0.0.1:5000/assets/js/embed.js';
    s.async = false;
    s.defer = true;
    s.onload = () => {
      // @ts-ignore
      Coral.createStreamEmbed({
        id: "coral_thread",
        autoRender: true,
        rootURL: 'http://127.0.0.1:5000',
        containerClassName: "coraly",
        customCSSURL: "/coral.css",
        // Uncomment these lines and replace with the ID of the
        // story's ID and URL from your CMS to provide the
        // tightest integration. Refer to our documentation at
        // https://docs.coralproject.net for all the configuration
        // options.
        storyID: `${storyID}`,
        storyURL: `${storyURL}`,
      });
    };
    (d.head || d.body).appendChild(s);
  }, []);

  return <div id="coral_thread" ></div>;
};

export default CoralEmbed;
