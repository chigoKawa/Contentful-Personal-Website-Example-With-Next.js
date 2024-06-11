import { extractYouTubeVideoID } from "@/lib/contentful/helpers/common";
import {
  IVideoWrapper
} from "@/lib/contentful/interfaces/topics";
import { Chip } from "@nextui-org/chip";

import YouTubeVideo from "@/components/ui/youtube-video/youtube-video";


const VideoMediaWrapper = (entry: IVideoWrapper) => {


  const contentfulVideoUrl: any =
    entry?.fields?.contentfulVideo?.fields?.file?.url || "";

  const videoSource = entry?.fields?.videoSource || "Youtube";

  const videoUrl = entry?.fields?.url || "";

  const videoTitle = entry?.fields?.title || "";

  // if (!img?.alt) {
  //   return <>...</>;
  // }

  if (videoSource === "Youtube") {
    return (
      <div className="w-full">
        <YouTubeVideo videoId={extractYouTubeVideoID(videoUrl) || ""} />
      </div>
    );
  }

  if (videoSource === "Contentful" && contentfulVideoUrl) {
    return (
      <div>
        <video className="w-full" controls>
          <source src={contentfulVideoUrl || ""} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <>

      <Chip color="warning">Not implemented </Chip>
    </>
  );
};

export default VideoMediaWrapper;
