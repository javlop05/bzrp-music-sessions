/**
 * This script uses fetch API -> Node 18 is a must
 */
const { youtubeApi } = require("./youtube-api");
const { saveVideoInfoToJson } = require("./save-video-info-to-json");

// const BZRP_ID = "UCmS75G-98QihSusY7NfCZtw";
const UPLOADS_ID = "UUmS75G-98QihSusY7NfCZtw";

const QUERY_PARAMS = {
  maxResults: 50,
  playlistId: UPLOADS_ID,
  part: "snippet",
};

const MUSIC_SESSION_TITLE_TEXT = "music session";
const filterMusicSessions = (items) =>
  items.filter(({ snippet }) =>
    snippet.title.toLowerCase().includes(MUSIC_SESSION_TITLE_TEXT)
  );

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
