/**
 * This script uses fetch API -> Node 18 is a must
 */
const { youtubeApi } = require("../youtube-api");
const { saveVideoInfoToJson } = require("./save-video-info-to-json");
const { filterMusicSessions } = require("../../filter/filter-music-sessions");
const { UPLOADS_ID } = require("../../constants/bzrp-ids");

const QUERY_PARAMS = {
  maxResults: 50,
  playlistId: UPLOADS_ID,
  part: "snippet",
};

const fetchSessions = async (nextPageToken) => {
  const queryParams = { ...QUERY_PARAMS };
  if (nextPageToken) {
    queryParams.pageToken = nextPageToken;
  }

  try {
    const data = await youtubeApi.playlistItems(queryParams);

    const musicSessions = filterMusicSessions(data.items);
    let nextPageMusicSessions = [];

    if (data.nextPageToken) {
      nextPageMusicSessions = await fetchSessions(data.nextPageToken);
    }

    return [...musicSessions, ...nextPageMusicSessions];
  } catch (err) {
    console.error(err);
  }
};

fetchSessions().then((musicSessions) => {
  musicSessions.forEach(({ snippet }) => {
    saveVideoInfoToJson({
      id: snippet.resourceId.videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnails: snippet.thumbnails,
      publishedAt: snippet.publishedAt,
    });
  });
});
