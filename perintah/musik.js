const axios = require("axios");

module.exports = {
  hady: {
    nama: "musik",
    penulis: "Hady Zen'in",
    kuldown: 16,
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
      const { data } = await axios.get(
        `https://fathurweb.qzz.io/api/download/ytplay?query=${encodeURIComponent(
          judul
        )}`
      );

      if (!data.status || !data.result?.mp3?.download_url) {
        return api.sendMessage(
          "Lagu itu tidak ada, coba yang lain.",
          event.threadID,
          event.messageID
        );
      }

      const sifa = await getStream(data.result.mp3.download_url);

      return api.sendMessage(
        {
          body: `Ini lagu yang kamu cari: ${judul}`,
          attachment: sifa
        },
        event.threadID,
        event.messageID
      );

    } catch (err) {
      return api.sendMessage(
        "Terjadi kesalahan: " + err,
        event.threadID,
        event.messageID
      );
    }
  }
};
