import { Video } from "src/types";

import styles from "./styles.module.css";
const { videoCard } = styles;

type VideoCardProps = {
  video: Video;
};

const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <div className={videoCard}>
      <img src={video.thumbnail} alt={video.title} />
      <div>
        <p>{video.title}</p>
        <p>{video.channelName}</p>
        <a href={video.url} target="_blank">Watch Video</a>
      </div>
    </div>
  );
};

export default VideoCard;
