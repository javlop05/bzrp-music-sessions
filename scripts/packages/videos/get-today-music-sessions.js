/**
 * This script uses fetch API -> Node 18 is a must
 */

const { youtubeApi } = require("../youtube-api");
const { saveVideoInfoToJson } = require("./save-video-info-to-json");
const { filterMusicSessions } = require("../../filter/filter-music-sessions");
const { UPLOADS_ID } = require("../../constants/bzrp-ids");
const { filterTodayVideos } = require("../../filter/filter-today-videos");

const QUERY_PARAMS = {
  maxResults: 5,
  playlistId: UPLOADS_ID,
  part: "snippet",
};

const fetchTodayVideos = async (nextPageToken) => {
  const queryParams = { ...QUERY_PARAMS };
  if (nextPageToken) {
    queryParams.pageToken = nextPageToken;
  }

  try {
    const data = await youtubeApi.playlistItems(queryParams);

    const todayVideos = filterTodayVideos(data.items);
    const allFetchedVideosAreFromToday =
      todayVideos.length === data.items.length;
    let nextPageVideos = [];

    // Corner case if more than 5 bizarrap sessions are uploaded on the same day
    if (allFetchedVideosAreFromToday) {
      nextPageVideos = fetchTodayVideos(data.nextPageToken);
    }

    return [...todayVideos, ...nextPageVideos];
  } catch (err) {
    console.error(err);
  }
};

fetchTodayVideos().then((videos) => {
  if (!videos.length) {
    console.log(`❌ There are no new music sessions`);
  } else {
    console.log(`✅ Found ${videos.length} new music session`);
  }

  filterMusicSessions(videos).forEach(({ snippet }) => {
    console.log(`🔥 Session Name: ${snippet.title}`);

    saveVideoInfoToJson({
      id: snippet.resourceId.videoId,
      title: snippet.title,
      description: snippet.description,
      thumbnails: snippet.thumbnails,
      publishedAt: snippet.publishedAt,
    });
  });
});
