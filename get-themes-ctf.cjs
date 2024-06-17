const fs = require("fs");
const https = require("https");
const http = require("http");
const path = require("path");
const sharp = require("sharp");
const dotenv = require("dotenv");
const axios = require("axios");

dotenv.config({ path: ".env.local" });

const {
  NEXT_PUBLIC_CTF_DELIVERY_TOKEN: CTF_DELIVERY_TOKEN,
  NEXT_PUBLIC_CTF_SPACE_ID: CTF_SPACE_ID,
} = process.env;

if (!CTF_DELIVERY_TOKEN || !CTF_SPACE_ID) {
  throw new Error("Environment variables for Contentful are not set.");
}

const API_URL = `https://graphql.contentful.com/content/v1/spaces/${CTF_SPACE_ID}`;
const TEMP_IMAGE_PATH = path.join(__dirname, "public/temp_image");
const DESTINATION_ICO_PATH = path.join(__dirname, "public/favicon.ico");
const DESTINATION_LOGO_PATH = path.join(__dirname, "public/logo.png");
const THEMES_FILE_PATH = path.join(__dirname, "json/themes.json");

const query = `
  query {
    navigationMenuCollection(limit: 1) {
      total
      items {
        siteName
        siteLogo {
          url
        }
        themes
      }
    }
  }
`;

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (!fs.existsSync(dirname)) {
    fs.mkdirSync(dirname, { recursive: true });
  }
};

const downloadImage = (url, dest) => {
  ensureDirectoryExistence(dest);

  const protocol = url.startsWith("https") ? https : http;
  const file = fs.createWriteStream(dest);

  protocol
    .get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Failed to download image. Status code: ${response.statusCode}`
        );
        return;
      }

      response.pipe(file);
      file.on("finish", () => {
        file.close(() => {
          console.log(`Download complete: ${dest}`);
        });
      });
    })
    .on("error", (err) => {
      fs.unlink(dest, () => {});
      console.error(`Error downloading the file: ${err.message}`);
    });
};

const downloadImageAndMakeIco = async (url, dest) => {
  ensureDirectoryExistence(dest);

  const protocol = url.startsWith("https") ? https : http;

  const file = fs.createWriteStream(TEMP_IMAGE_PATH);
  protocol
    .get(url, (response) => {
      if (response.statusCode !== 200) {
        console.error(
          `Failed to download image. Status code: ${response.statusCode}`
        );
        return;
      }

      response.pipe(file);
      file.on("finish", () => {
        file.close(async () => {
          console.log("Download complete.");

          try {
            await sharp(TEMP_IMAGE_PATH).resize(64, 64).toFile(dest);
            console.log("Conversion to ICO complete.");
            fs.unlink(TEMP_IMAGE_PATH, (err) => {
              if (err)
                console.error("Error removing temporary file:", err.message);
            });
          } catch (err) {
            console.error("Error converting to ICO:", err.message);
          }
        });
      });
    })
    .on("error", (err) => {
      fs.unlink(TEMP_IMAGE_PATH, () => {});
      console.error("Error downloading the file:", err.message);
    });
};

const getDataFromCtf = async () => {
  try {
    const response = await axios.post(
      API_URL,
      { query },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${CTF_DELIVERY_TOKEN}`,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching data from Contentful:", error.message);
    throw error;
  }
};

const saveNavDataToFile = async () => {
  try {
    const data = await getDataFromCtf();
    const items = data?.data?.navigationMenuCollection?.items;

    if (!items || items.length === 0) {
      throw new Error("No data found in Contentful response.");
    }

    console.log("Saving Config from CMS to file");

    const logoUrl = items[0]?.siteLogo?.url;
    if (logoUrl) {
      console.log("Downloading logo...");
      await downloadImageAndMakeIco(`${logoUrl}?fm=png`, DESTINATION_ICO_PATH);
      await downloadImage(`${logoUrl}?fm=png`, DESTINATION_LOGO_PATH);
    }

    const themes = items[0]?.themes;
    if (themes) {
      ensureDirectoryExistence(THEMES_FILE_PATH);

      if (themes?.themes) {
        fs.writeFileSync(
          THEMES_FILE_PATH,
          JSON.stringify(themes, null, 2),
          "utf8"
        );
      } else {
        fs.writeFileSync(
          THEMES_FILE_PATH,
          JSON.stringify({ themes: themes }, null, 2),
          "utf8"
        );
      }

      console.log("Themes saved to file.");
    }
  } catch (error) {
    console.error("Error saving navigation data to file:", error.message);
  }
};

saveNavDataToFile();
