import useRemoveVideo from "@hooks/useRemoveVideo";
import { useQueryClient } from "@tanstack/react-query";
import { Video } from "src/types";

import notify from "@utils/notify";
import { handleApiError } from "@utils/handleApiError";

import styles from "./styles.module.css";
import { Button } from "@mantine/core";
const { videoCard, videoTitle, wrapper } = styles;

type VideoCardProps = {
  video: Video;
};

const VideoCard = ({ video }: VideoCardProps) => {
  const { isRemovingVideo, removeVideo } = useRemoveVideo(video._id);

  const queryClient = useQueryClient();

  const handleRemoveVideo = () => {
    removeVideo({ throwOnError: true })
      .then(() => queryClient.refetchQueries({ queryKey: ["videos"] }))
      .catch((err) => notify(handleApiError(err), "error"));
  };

  return (
    <div className={wrapper}>
      <div className={videoCard}>
        <img src={video.thumbnail} alt={video.title} />
        <div>
          <p className={videoTitle}>{video.title}</p>
          <p>{video.channelName}</p>
          <a href={video.url} target="_blank">
            Watch Video
          </a>
        </div>
      </div>
      <div>
        <Button
          color="red"
          loading={isRemovingVideo ? true : false}
          loaderProps={{ type: "dots" }}
          onClick={handleRemoveVideo}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default VideoCard;
