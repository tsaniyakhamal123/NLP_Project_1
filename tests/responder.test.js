// tests/responder.test.js

const responders = require('../bot/responder'); // Sesuaikan path ke rules
const { getRekomendasiPsikolog } = require('../bot/services/psikologServices');

// Helper untuk cari balasan
function respond(input) {
  for (const r of responders) {
    const match = input.match(r.pattern);
    if (match) {
      if (typeof r.reply === "function") {
        return r.reply(match);
      }
      return r.reply.replace("{reflected}", match[1] || "");
    }
  }
  return null;
}

// Mocking service
jest.mock('../bot/services/psikologServices', () => ({
  getRekomendasiPsikolog: jest.fn(),
}));

describe('Pengujian Fungsional Bot Responder', () => {

  // Test Case 1: Respons Sapaan Dasar
  test('Kasus 1: Harus memberikan sapaan untuk input "hai"', () => {
    const input = 'hai';
    const expectedOutput = 'Halo! Aku siap mendengarkan ceritamu';
    expect(respond(input)).toBe(expectedOutput);
  });

  // Test Case 2: Respons dengan Refleksi Perasaan
  test('Kasus 2: Harus merefleksikan perasaan pengguna', () => {
    const input = 'aku merasa kesal';
    const expectedSubstring = 'Tidak apa-apa merasa kesal. Bisakah kamu bercerita lebih detail penyebab kekesalanmu?';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 3: Respons Kontekstual Topik Tertentu (Skripsi)
  test('Kasus 3: Harus memberikan respons spesifik untuk topik "skripsi"', () => {
    const input = 'aku pusing sama skripsi';
    const expectedSubstring = 'ngga kok skripsi, itu bukan lah segalanya dan tidak menentukan kesuksesan, apa kamu mau cerita lagi?';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 4: Respons yang Memanggil Fungsi (Rekomendasi Lokasi)
  test('Kasus 4: Harus memanggil fungsi rekomendasi psikolog saat input lokasi cocok', () => {
    const input = 'Saya tinggal di Sleman';
    const mockResponse = 'Berikut rekomendasi di Sleman: [Hasil dari mock]';
    
    getRekomendasiPsikolog.mockReturnValue(mockResponse);

    const actualResponse = respond(input);

    expect(actualResponse).toBe(mockResponse);
    expect(getRekomendasiPsikolog).toHaveBeenCalledWith('sleman');
  });

  // Test Case 5: Respons Safety Net (Kondisi Krisis Umum)
  test('Kasus 5: Harus memberikan respons darurat umum untuk kata kunci krisis', () => {
    const input = 'aku stress berat rasanya';
    const expectedSubstring = 'menghubungi tenaga profesional';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 6: Respons Safety Net (Kondisi Krisis Spesifik UGM)
  test('Kasus 6: Harus memberikan respons darurat spesifik UGM jika kondisi terpenuhi', () => {
    const input = 'aku tidak kuat kuliah di ugm';
    const expectedSubstring = 'GMC UGM';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 7: Respons Default (Fallback)
  test('Kasus 7: Harus memberikan respons fallback jika tidak ada aturan yang cocok', () => {
    const input = 'aku bosan';
    const expectedOutput = 'Aku mendengarkan. Bisa ceritakan lebih banyak?';
    expect(respond(input)).toBe(expectedOutput);
  });

});
