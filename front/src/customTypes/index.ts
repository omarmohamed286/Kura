type Video = {
  _id?: string;
  url?: string;
  isWatched?: string;
  title: string;
  thumbnail: string;
  channelName: string;
};

type Blog = {
  _id?: string;
  url?: string;
  title: string;
  description: string;
};

export { type Video, type Blog };
