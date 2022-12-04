const filterTodayVideos = (items) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return items.filter(({ snippet }) => {
    const publishDate = new Date(snippet.publishedAt);
    publishDate.setHours(0, 0, 0, 0);

    return today.getTime() === publishDate.getTime();
  });
};

module.exports = {
  filterTodayVideos,
};
