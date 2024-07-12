import React, { useRef, useState } from "react";
import YouTube, { YouTubeProps, YouTubePlayer } from "react-youtube";

import { useMediaQuery } from "usehooks-ts";

import { Chip } from "@nextui-org/chip";

interface Props {
    videoId: string;
}
const YouTubeVideo: React.FC<Props> = ({ videoId }) => {
    const playerRef = useRef<YouTubePlayer | null>(null);
    const [duration, setDuration] = useState<number>(0);
    const [currentTime, setCurrentTime] = useState<number>(0);

    const isMobile = useMediaQuery("(max-width: 768px)");
    const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
    const isMediumDevice = useMediaQuery(
        "only screen and (min-width : 769px) and (max-width : 992px)"
    );
    const isLargeDevice = useMediaQuery(
        "only screen and (min-width : 993px) and (max-width : 1200px)"
    );
    const isExtraLargeDevice = useMediaQuery(
        "only screen and (min-width : 1201px)"
    );

    // Event handler for video playback
    const handleVideoProgress = (event: { target: YouTubePlayer }): void => {
        const currentTime = event.target.getCurrentTime();
        setCurrentTime(currentTime);
    };

    // Event handler for video duration change
    const handleVideoReady = (event: { target: YouTubePlayer }): void => {
        const duration = event.target?.getDuration();

        setDuration(duration);
    };

    const opts = {
        // height: "390",
        // width: isMobile ? 280 : 640,
        width: "100%",
        height: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    if (!videoId) {
        return (
            <div
                style={{
                    height: `${opts?.height}px`,
                    width: `${opts?.width}px`,
                }}
                className=""
            >
                <div className="flex flex-col h-full w-full items-center justify-center justify-items-center">
                    <Chip color="warning">Not implemented </Chip>
                </div>
            </div>
        );
    }

    return (
        <div className="  w-full h-full aspect-video ">
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={handleVideoReady}
                onPlaybackRateChange={handleVideoProgress}
                onStateChange={handleVideoProgress}
                ref={playerRef}
                className=" h-full"
            />

            {/* <div>
        <p>Duration: {duration.toFixed(2)} seconds</p>
        <p>Current Time: {currentTime.toFixed(2)} seconds</p>
      </div> */}
        </div>
    );
};

export default YouTubeVideo;
