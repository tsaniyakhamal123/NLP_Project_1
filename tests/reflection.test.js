// tests/reflection.test.js

const reflect = require('../bot/reflection'); 

describe('Pengujian Fungsi Refleksi Kata Ganti', () => {
  
  test('Harus mengubah "aku" menjadi "kamu"', () => {
    expect(reflect('aku')).toBe('kamu');
  });

  test('Harus mengubah "kamu" menjadi "saya"', () => {
    expect(reflect('kamu')).toBe('saya');
  });

  test('Harus merefleksikan seluruh kalimat', () => {
    const input = 'aku pikir kamu benar';
    const expectedOutput = 'kamu pikir saya benar';
    expect(reflect(input)).toBe(expectedOutput);
  });

  test('Tidak boleh mengubah kata lain', () => {
    const input = 'dia pergi ke sana';
    expect(reflect(input)).toBe(input);
  });

});