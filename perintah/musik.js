const axios = require("axios");
const fs = require('fs');
module.exports = {
  hady: {
    nama: "musik",
    penulis: "Hady Zen'in",
    kuldown: 20,
    peran: 0,
    tutor: "<judul>"
  },

  Ayanokoji: async function ({ api, event, args, getStream }) {
    if (!args[0]) {
      return api.sendMessage(
        "Berikan saya judul lagunya.",
        event.threadID,
        event.messageID
      );
    }

    const judul = args.join(" ");
    try {
      api.setMessageReaction('🎶', event.messageID);
      const { data } = await axios.get(
        `https://fathurweb.qzz.io/api/download/ytplay?query=${encodeURIComponent(
          judul
        )}`
      );

      if (!data || data.length == 0 || !data.status || !data.result?.mp3?.download_url) {
        return api.sendMessage(
          "Lagu itu tidak ada, coba yang lain.",
          event.threadID,
          event.messageID
        );
        api.setMessageReaction('❎️', event.messageID);
      }
      const hady = data.result.mp3;
      const sifa = await getStream(hady.download_url, "musik.mp3");

      return api.sendMessage(
        {
          body: `Judul:${hady.title}\nDownload: ${hady.download_url}`,
          attachment: fs.createReadStream(sifa)
        },
        event.threadID,
        event.messageID
      );
      api.setMessageReaction('✅️', event.messageID);

    } catch (err) {
      return api.sendMessage(
        "Terjadi kesalahan: " + err,
        event.threadID,
        event.messageID
      );
    }
  }
};
