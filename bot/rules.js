const { match } = require("assert");
const { getRekomendasiPsikolog } = require("./services/psikologServices");

module.exports = [
  {
    pattern: /(halo|hai|hello)/i,
    reply: "Halo! Aku siap mendengarkan ceritamu.",
  },
  {
    pattern: /(saya|aku) butuh (.+)/i,
    reply: "Kenapa kamu butuh {reflected}?",
  },
  {
    pattern: /karena (.+)/i,
    reply: "Apakah ada alasan lain selain {reflected}?",
  },
  {
    pattern: /(depresi|bunuh diri|tidak kuat|stress berat)/i,
    conditional: /kuliah.*ugm/i,
    reply:
      "Aku dengar kamu sedang sangat kesulitan. Mungkin kamu bisa menghubungi psikolog di GMC UGM atau fakultasmu. Atau layanan profesional lainnya seperti 119 ext 8. boleh tahu lokasimu dimana?",
    fallbackReply:
      "Aku mendengar kamu sedang sangat kesulitan. Untuk hal sepenting ini, lebih baik kamu menghubungi tenaga profesional. Hubungi psikolog di 119 (ext 8) atau layanan darurat terdekat.",
  },
  {
    pattern: /(terima kasih|makasih|thanks)/i,
    reply: "Sama-sama! Semoga kamu merasa lebih baik.",
  },
  {
    pattern: /(aku|saya) merasa (.+)/i,
    reply: "Sejak kapan kamu merasa {reflected}? Bisa ceritakan lebih detail?",
  },
  {
    pattern: /(ayah|ibu|orang tua|keluarga)/i,
    reply:
      "Hubungan dengan keluargamu penting sekali. Bagaimana perasaanmu tentang hal itu?",
  },
  {
    pattern: /(pacar|cowo|cewe|pacarku)/i,
    reply:
      "Hubungan dengan pacar penting sekali. Bagaimana perasaanmu tentang hal itu?",
  },
  {
    pattern: /(sekolah|kuliah|tugas|kerja|pekerjaan)/i,
    reply:
      "Sepertinya kegiatanmu cukup menekan. Apa yang paling berat dari {reflected}?",
  },
  {
    pattern: /(teman|sahabat|sendiri|kesepian)/i,
    reply:
      "Perasaan tentang hubungan sosial bisa sangat kuat. Menurutmu, apa yang paling kamu butuhkan dari teman sekarang?",
  },
  {
    pattern: /^.*\?$/i,
    reply:
      "Pertanyaan yang bagus. Menurutmu, bagaimana jika kita pecah masalah ini jadi langkah kecil dulu?",
  },
  {
    pattern: /saya (tinggal|berada|di) (.+)/i,
    reply: (match) => {
      const lokasi = match[2].toLowerCase();
      return getRekomendasiPsikolog(lokasi);
    },
  },
  {
    pattern: /(psikolog|konseling|butuh bantuan|iya)/i,
    reply: () => {
      return `Kalau kamu butuh bantuan, boleh bagikan lokasimu saat ini? Nanti aku bantu cari psikolog terdekat 😊`;
    },
  }, 
  {
    pattern: /(udah|gaada|itu aja)/i,
    reply: () => {
      return `okey makasih udah cerita apakah kamu butuh konseling?`;
    },
  }, 
  {
    pattern: /(insecure|jelek|bodoh)/i,
    reply: () => {
      return `nggak kok kamu ga seburuk itu, kita ga harus jadi orang yang sempurna di hidup ini`;
    },
  }, 
  {
    pattern: /(ngga|tidak)/i,
    reply: () => {
        return 'oke makasih ya udah mau cerita semoga ini dapat meringankan bebanmu, kapan2 ceruta lagi yaa '
    }
  },
  {
  pattern: /\b(skripsi|capstone|project)\w*\b/i,
  reply: (match) => {
    const tugas = match[1]; // hasil dari grup pertama dalam regex
    return `ngga kok ${tugas}, itu bukan lah segalanya dan tidak menentukan kesuksesan, apa kamu mau cerita lagi?`;
  },
  },
  {
  pattern: /\b(marah|kecewa|sedih|kesal|geram)\b/i,
  reply: (match) => {
    const emosi = match[1];
    return `Tidak apa-apa merasa ${emosi}. Bisakah kamu bercerita lebih detail penyebab ke${emosi}anmu?`;
},
},

  {
    pattern: /.*/i,
    reply: "Aku mengerti. Bisa ceritakan lebih banyak?",
  },
  
];
