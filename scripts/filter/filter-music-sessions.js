const MUSIC_SESSION_TITLE_TEXT = "music session";

const filterMusicSessions = (items) =>
  items.filter(({ snippet }) =>
    snippet.title.toLowerCase().includes(MUSIC_SESSION_TITLE_TEXT)
  );

module.exports = {
  filterMusicSessions,
};
