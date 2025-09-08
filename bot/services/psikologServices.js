const psikologs = require("../../data/psikolog-jogja.json");

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => deg * Math.PI / 180;
  const R = 6371; // km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getNearestPsikolog(lat, lon, count = 3) {
  const sorted = psikologs
    .map((p) => ({
      ...p,
      jarak: haversineDistance(lat, lon, p.latitude, p.longitude),
    }))
    .sort((a, b) => a.jarak - b.jarak)
    .slice(0, count);

  return sorted
    .map(
      (p) =>
        `- ${p.nama} (${p.lokasi})\n  Kontak: ${p.kontak} (~${p.jarak.toFixed(
          1
        )} km)`
    )
    .join("\n");
}

function getRekomendasiPsikolog(lokasiText) {
  const lokasiLower = lokasiText.toLowerCase();

  const matching = psikologs.filter((p) =>
    p.lokasi.toLowerCase().includes(lokasiLower)
  );

  if (matching.length === 0) {
    return `Maaf, aku belum menemukan psikolog di daerah "${lokasiText}". Coba kirimkan lokasimu lebih spesifik (contoh: Sleman, Sekip, Bulaksumur).`;
  }

  return (
    `Berikut beberapa layanan psikolog di sekitar ${lokasiText}:\n\n` +
    matching
      .map(
        (p) => `- ${p.nama} (${p.lokasi})\n  Kontak: ${p.kontak}`
      )
      .join("\n")
  );
}

module.exports = {
  getNearestPsikolog,
  getRekomendasiPsikolog,
};
