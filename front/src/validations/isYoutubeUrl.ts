const isYoutubeUrl = (url: string) => {
  const match = url.match(
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
  );
  return match ? true : false;
};

export default isYoutubeUrl;
