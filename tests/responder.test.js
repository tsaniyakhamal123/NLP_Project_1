// tests/responder.test.js

const respond = require('../bot/responder'); // Sesuaikan path jika perlu

// mocking /psikologServices
jest.mock('../bot/services/psikologServices', () => ({
  getRekomendasiPsikolog: jest.fn(),
}));
const { getRekomendasiPsikolog } = require('../bot/services/psikologServices');

describe('Pengujian Fungsional Bot Responder', () => {

  // Test Case 1: Respons Sapaan Dasar
  test('Kasus 1: Harus memberikan sapaan untuk input "hai"', () => {
    const input = 'hai';
    const expectedOutput = 'Halo! Aku di sini untuk mendengarkan ceritamu. Apa yang sedang kamu rasakan?';
    expect(respond(input)).toBe(expectedOutput);
  });

  // Test Case 2: Respons dengan Refleksi Kata Ganti
  test('Kasus 2: Harus merefleksikan perasaan pengguna', () => {
    const input = 'aku merasa lelah';
    const expectedSubstring = 'kamu merasa lelah';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 3: Respons Kontekstual Topik Tertentu (Skripsi)
  test('Kasus 3: Harus memberikan respons spesifik untuk topik "skripsi"', () => {
    const input = 'aku pusing sama skripsi';
    const expectedSubstring = 'Beban karena skripsi';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 4: Respons yang Memanggil Fungsi (Rekomendasi Lokasi)
  test('Kasus 4: Harus memanggil fungsi rekomendasi psikolog saat input lokasi cocok', () => {
    const input = 'Saya berada di Sleman';
    const mockResponse = 'Berikut rekomendasi di Sleman: [Hasil dari mock]';
    
    getRekomendasiPsikolog.mockReturnValue(mockResponse);

    const actualResponse = respond(input);

    // Cek apakah fungsi `respond` mengembalikan output dari fungsi mock kita
    expect(actualResponse).toBe(mockResponse);
    expect(getRekomendasiPsikolog).toHaveBeenCalledWith('sleman');
  });

  // Test Case 5: Respons Safety Net (Kondisi Krisis Umum)
  test('Kasus 5: Harus memberikan respons darurat umum untuk kata kunci krisis', () => {
    const input = 'aku stress berat rasanya';
    const expectedSubstring = 'menghubungi tenaga profesional';
    expect(respond(input)).toContain(expectedSubstring);
  });

  // Test Case 6: Respons Safety Net (Kondisi Krisis Spesifik)
  test('Kasus 6: Harus memberikan respons darurat spesifik UGM jika kondisi terpenuhi', () => {
    const input = 'aku tidak kuat kuliah di ugm';
    const expectedSubstring = 'GMC UGM';
    expect(respond(input)).toContain(expectedSubstring);
  });
  
  // Test Case 7 (Bonus): Respons Default (Fallback)
  test('Kasus 7: Harus memberikan respons default jika tidak ada aturan yang cocok', () => {
    const input = 'aku bosan';
    const expectedOutput = 'Aku mengerti. Bisa ceritakan lebih banyak?';
    expect(respond(input)).toBe(expectedOutput);
  });

});