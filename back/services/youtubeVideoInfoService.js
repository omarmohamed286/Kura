const { Client } = require("youtubei");
const youtube = new Client();

module.exports = async (url) => {
  const regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const videoId = url.match(regExp)[2];

  const video = await youtube.getVideo(videoId);

  const title = video.title;
  const thumbnail = video.thumbnails[4].url;
  const channelName = video.channel.name;

  return { title, thumbnail, channelName };
};
