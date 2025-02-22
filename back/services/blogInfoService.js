const urlMetadata = require("url-metadata");

module.exports = async (url) => {
  const { title, description } = await urlMetadata(url);
  return { title, description };
};
