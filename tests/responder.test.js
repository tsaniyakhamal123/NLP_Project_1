const { respond } = require("../bot/responder");

describe("Chatbot respond()", () => {
  test("menjawab salam", () => {
    expect(respond("halo")).toMatch(/siap mendengarkan/i);
  });

  test("respon butuh sesuatu", () => {
    expect(respond("saya butuh liburan")).toMatch(/kenapa kamu butuh/i);
  });

  test("respon karena sesuatu", () => {
    expect(respond("karena aku capek")).toMatch(/alasan lain/i);
  });

  test("respon tentang keluarga", () => {
    expect(respond("ibu saya cerewet")).toMatch(/keluargamu/i);
  });

  test("respon fallback", () => {
    expect(respond("asdfghjkl")).toMatch(/ceritakan lebih banyak/i);
  });

  test("respon lokasi Sleman", () => {
    expect(respond("saya tinggal di Sleman")).toMatch(/psikolog di sekitar/i);
  });
});
