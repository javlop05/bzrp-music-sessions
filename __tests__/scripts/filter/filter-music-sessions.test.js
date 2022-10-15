const {
  filterMusicSessions,
} = require("../../../scripts/filter/filter-music-sessions");

const items = [
  { id: 1, snippet: { title: "some video" } },
  { id: 2, snippet: { title: "mu sessio" } },
  { id: 3, snippet: { title: "music session" } },
  { id: 4, snippet: { title: "music  session" } },
  { id: 5, snippet: { title: "MUSiC sEssIon" } },
  { id: 6, snippet: { title: "music" } },
  { id: 7, snippet: { title: "session" } },
];

describe("Filter music sessions", () => {
  it("should return only the elements containing in title 'music session'", () => {
    const result = filterMusicSessions(items);
    const resultIds = result.map(({ id }) => id);

    expect(resultIds).toEqual([3, 5]);
  });
});
