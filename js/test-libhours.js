const axios = require("axios");
const cheerio = require("cheerio");

async function getLibraryHours() {
  try {
    const response = await axios.get("https://wlv.libcal.com/hours");
    const html = response.data;

    const $ = cheerio.load(html);
    const libraries = {};

    $(".s-lc-hm-day").each((i, dayElem) => {
      const dayNum = $(dayElem).find(".s-lc-hm-day-l").text().trim();
      if (!dayNum) return;

      $(dayElem).find(".s-lc-hm-loc").each((j, libElem) => {
        const libName = $(libElem).find(".loc_name").text().trim();

        const timeText = $(libElem).find(".s-lc-time").text().trim();
        const closedText = $(libElem).find(".s-lc-closed").text().trim();

        if (!libraries[libName]) libraries[libName] = {};

        const dateStr = `2026-03-${dayNum.padStart(2, "0")}`;

        let open = null, close = null, isOpen = false;

        if (timeText) {
          const parts = timeText.split("–").map(t => t.trim());
          open = parts[0];
          close = parts[1];
          isOpen = true;
        } else if (closedText) {
          isOpen = false;
        }

        libraries[libName][dateStr] = { open, close, isOpen };
      });
    });

    console.log(JSON.stringify(libraries, null, 2));
    return libraries;

  } catch (error) {
    console.error("Error fetching library hours:", error);
  }
}

getLibraryHours();