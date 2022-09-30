const fs = require("fs");
const { VIDEOS_FOLDER_PATH } = require("./save-video-info-to-json");
const saveViewcountToJson = require("./save-viewcount-to-json");
const { youtubeApi } = require("./youtube-api");

const QUERY_PARAMS = {
  part: "statistics",
};

const time = new Date().toISOString();

const getVideoViewCount = async (videoId) => {
  const queryParams = {
    ...QUERY_PARAMS,
    id: videoId
  };

  try {
    const data = await youtubeApi.videos(queryParams);
    const { viewCount, likeCount, commentCount } = data.items[0].statistics;

    return {
        time,
        viewCount,
        likeCount,
        commentCount
    };
  } catch (err) {
    console.error(err);
  }
};

fs.readdir(VIDEOS_FOLDER_PATH, async (err, files) => {
  if (err) {
    throw new Error(`It is NOT possible to read ${VIDEOS_FOLDER_PATH} folder.`);
  }

  for (let file of files) {
    const videoId = file.replace(".json", "");
    
    try {
      const data = await getVideoViewCount(videoId);

      saveViewcountToJson(videoId, data);
    } catch (err) {
      console.log(`${videoId} could not be recorded`);
    }
  }
});
