const { getRekomendasiPsikolog } = require("./services/psikologServices");

module.exports = [

  // --- KELOMPOK 1: SAFETY NET (PRIORITAS TERTINGGI) ---
  // Aturan ini harus selalu di paling atas untuk menangani situasi darurat terlebih dahulu.
  {
    pattern: /(depresi|bunuh diri|tidak kuat|stress berat)/i,
    conditional: /kuliah.*ugm/i,
    reply:
      "Aku dengar kamu sedang sangat kesulitan. Mungkin kamu bisa menghubungi psikolog di GMC UGM atau fakultasmu. Atau layanan profesional lainnya seperti 119 ext 8. boleh tahu lokasimu dimana?",
    fallbackReply:
      "Aku mendengar kamu sedang sangat kesulitan. Untuk hal sepenting ini, lebih baik kamu menghubungi tenaga profesional. Hubungi psikolog di 119 (ext 8) atau layanan darurat terdekat.",
  },

  // --- KELOMPOK 2: INTENSI LANGSUNG (PERMINTAAN BANTUAN & LOKASI) ---
  {
    pattern: /saya (?:tinggal|berada)?\s*di\s*(.+)/i,
    reply: (match) => {
      const lokasi = match[1].trim().toLowerCase();
      return getRekomendasiPsikolog(lokasi);
    },
  },
  {
    pattern: /(psikolog|konseling|butuh bantuan)/i,
    reply: "Tentu, aku bisa bantu. Boleh bagikan lokasimu saat ini (share location)? Atau ketik nama daerahmu, misalnya: 'saya di Depok Sleman'.",
  },

  // --- KELOMPOK 3: TOPIK PERCAKAPAN SPESIFIK ---
  {
    pattern: /(teman|sahabat|sendiri|kesepian|gapunya teman)/i,
    reply:
      "Memang berat ya kalau merasa sendirian atau sulit percaya sama teman. Boleh ceritakan lebih lanjut apa yang membuatmu merasa seperti itu?",
  },
  {
    pattern: /(insecure|jelek|bodoh|ga berguna)/i,
    reply: "Hei, tidak apa-apa merasa begitu, tapi jangan biarkan pikiran itu mendefinisikanmu ya. Kamu jauh lebih berharga dari apa yang kamu pikirkan. Kita semua punya kelebihan masing-masing.",
  },
  {
    pattern: /(ayah|ibu|orang tua|keluarga)/i,
    reply:
      "Hubungan dengan keluarga bisa jadi rumit sekaligus penting. Bagaimana perasaanmu tentang hal itu?",
  },
  {
    pattern: /(pacar|cowo|cewe|pacarku|pasangan)/i,
    reply:
      "Hubungan percintaan memang penuh dinamika ya. Apa yang sedang kamu rasakan terkait hubunganmu?",
  },
  {
    pattern: /\b(skripsi|kuliah|tugas|kerja|pekerjaan|kantor|capstone)\b/i,
    reply: (match) => {
        const konteks = match[1];
        return `Beban karena ${konteks} memang bisa bikin stres. Apa bagian yang paling memberatkanmu saat ini?`;
    },
  },

  // --- KELOMPOK 4: POLA KALIMAT UMUM (GENERIK) ---
  {
    pattern: /\b(marah|kecewa|sedih|kesal|geram|senang|bahagia)\b/i,
    reply: (match) => {
      const emosi = match[1];
      return `Tidak apa-apa merasa ${emosi}. Semua perasaan itu valid. Apa pemicu utama yang membuatmu merasakan hal itu?`;
    },
  },
  {
    pattern: /(aku|saya) merasa (.+)/i,
    reply: "Terima kasih sudah berbagi perasaanmu. Bisa ceritakan lebih detail kenapa kamu merasa {reflected}?",
  },
  {
    pattern: /(saya|aku) butuh (.+)/i,
    reply: "Kenapa kamu butuh {reflected}?",
  },
  {
    pattern: /karena (.+)/i,
    reply: "Apakah ada alasan lain selain {reflected}?",
  },

  // --- KELOMPOK 5: INTERAKSI DASAR & ALUR PERCAKAPAN ---
  {
    pattern: /(halo|hai|hello|pagi|siang|sore)/i,
    reply: "Halo! Aku di sini untuk mendengarkan. Apa yang sedang kamu rasakan?",
  },
  {
    pattern: /(terima kasih|makasih|thanks)/i,
    reply: "Sama-sama! Aku senang bisa menemanimu. Jaga diri ya.",
  },
  {
    pattern: /(udah|gaada|itu aja)/i,
    reply: "Oke, terima kasih sudah berbagi cerita denganku. Kalau nanti butuh teman bicara lagi, aku di sini ya. Apakah kamu butuh info konseling?",
  },
  {
    pattern: /iya/i,
    reply: "Baik. Boleh ceritakan lebih lanjut?",
  },
  {
    pattern: /(ngga|tidak|bukan)/i,
    reply: 'Baiklah, terima kasih sudah percaya untuk cerita ya. Semoga bebanmu sedikit lebih ringan. Jaga diri baik-baik!'
  },

  // --- KELOMPOK 6: FALLBACK (PILIHAN TERAKHIR) ---
  {
    pattern: /^.*\?$/i, // Untuk semua jenis pertanyaan
    reply:
      "Itu pertanyaan yang bagus untuk direnungkan. Menurutmu sendiri, apa jawaban yang paling terasa benar untukmu saat ini?",
  },
  {
    pattern: /.*/i, // Fallback (paling akhir)
    reply: "Aku mendengarkan. Bisa ceritakan lebih banyak?",
  },
  
];