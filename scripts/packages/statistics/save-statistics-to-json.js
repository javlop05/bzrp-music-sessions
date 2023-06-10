const fs = require("fs");
const { STATISTICS_FOLDER_PATH } = require("../../constants/paths");

const saveStatisticsToJson = (id, data) => {
  const fileName = `${id}.json`;
  let { time, ...todayStatistics } = data;

  fs.readFile(`${STATISTICS_FOLDER_PATH}/${fileName}`, (err, history) => {
    const statisticsHistory = !err ? JSON.parse(history) : {};

    statisticsHistory[time] = todayStatistics;

    fs.writeFile(
      `${STATISTICS_FOLDER_PATH}/${fileName}`,
      JSON.stringify(statisticsHistory, null, 2),
      (err) => {
        if (!err) console.log(`New report added to ${id}.`);
      }
    );
  });
};

module.exports = saveStatisticsToJson;
