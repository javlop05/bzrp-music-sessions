const fs = require("fs");
const { VIDEOS_FOLDER_PATH } = require("../../constants/paths");

const saveVideoInfoToJson = (data) => {
  const { id, title } = data;
  const fileName = `${id}.json`;

  fs.writeFile(
    `${VIDEOS_FOLDER_PATH}/${fileName}`,
    JSON.stringify(data, null, 2),
    { flag: "wx" },
    (err) => {
      if (!err) console.log(`${title} created as ${fileName}`);
    }
  );
};

module.exports = saveVideoInfoToJson;
