const spaceImport = require("contentful-import");
import fs from "fs";
import path from "path";

const directoryPath = path.resolve("./");
export async function ctfImport(options) {
  try {
    //  clean up existing log files
    deleteErrorLogs();
    const data = await spaceImport(options);
    return "Data imported successfully";
  } catch (error) {
    throw error;
  }
}

async function deleteErrorLogs() {
  try {
    console.log("dir+++++++++++++++++", directoryPath);

    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Could not list the directory.", err);
        // process.exit(1);
        return;
      }

      files.forEach((file) => {
        if (file.startsWith("contentful-import-error-log")) {
          const filePath = path.join(directoryPath, file);

          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Failed to delete ${file}:`, err);
            } else {
              console.log(`Successfully deleted ${file}`);
            }
          });
        }
      });
    });

    return;
  } catch (err) {
    console.error("Error while deleting files:", err);
  }
}
