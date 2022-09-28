const { youtubeApiKey } = process.env;

const YOUTUBE_API_URL = "https://www.googleapis.com/youtube/v3";

const createApi = (url, acceptedResources) => {
  return new Proxy(
    {},
    {
      get: (target, prop) => {
        return async (params = {}) => {
          if (!acceptedResources.includes(prop)) {
            throw new Error(`Resource ${prop} not accepted`);
          }

          const queryParams = {
            ...params,
            key: youtubeApiKey,
          };

          const resource = `${url}/${prop}?${new URLSearchParams(queryParams)}`;
          const response = await fetch(resource);

          if (!response) {
            throw new Error(`Something wrong happened with ${resource}`);
          }

          const data = await response.json();

          if (data.error) {
            throw new Error(data.error.message);
          }

          return data;
        };
      },
    }
  );
};

module.exports = {
  youtubeApi: createApi(YOUTUBE_API_URL, ["playlistItems", "videos"]),
};
