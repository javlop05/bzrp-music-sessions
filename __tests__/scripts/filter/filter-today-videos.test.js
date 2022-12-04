const {
  filterTodayVideos,
} = require("../../../scripts/filter/filter-today-videos");

const items = [
  { id: 1, snippet: { publishedAt: "2099-12-16T22:00:12Z" } },
  { id: 2, snippet: { publishedAt: new Date().toISOString() } },
  { id: 3, snippet: { publishedAt: "2022-10-16T22:00:12Z" } },
  { id: 4, snippet: { publishedAt: "2020-11-16T22:00:12Z" } },
  { id: 5, snippet: { publishedAt: new Date().toISOString() } },
  { id: 5, snippet: {} },
];

describe("Filter today videos", () => {
  it("should return only the videos which publishedAt is today", () => {
    const result = filterTodayVideos(items);
    const resultIds = result.map(({ id }) => id);

    expect(resultIds).toEqual([2, 5]);
  });
});
