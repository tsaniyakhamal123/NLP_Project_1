const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const respond = require('./responder');
const { getNearestPsikolog } = require('./services/psikologServices');

const client = new Client({
  authStrategy: new LocalAuth(), // Simpan sesi login
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', (qr) => {
  console.log('🔐 Scan QR berikut untuk login WhatsApp:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot WhatsApp siap digunakan!');
});

client.on('message', async (msg) => {
  const message = msg.body;

  // Cek jika pesan adalah lokasi (shareloc)
  if (msg.type === 'location') {
    const { latitude, longitude } = msg.location;
    const rekomendasi = getNearestPsikolog(latitude, longitude);
    await msg.reply(`📍 Berikut beberapa layanan psikolog terdekat:\n\n${rekomendasi}`);
    return;
  }

  // Cek jika teks mengandung lat/lon manual (opsional)
  const coordRegex = /(-?\d+\.\d+),\s*(-?\d+\.\d+)/;
  const coordMatch = message.match(coordRegex);
  if (coordMatch) {
    const lat = parseFloat(coordMatch[1]);
    const lon = parseFloat(coordMatch[2]);
    const rekomendasi = getNearestPsikolog(lat, lon);
    await msg.reply(`📍 Ini rekomendasi psikolog di dekatmu:\n\n${rekomendasi}`);
    return;
  }

  // Jika teks biasa, pakai responder
  const response = respond(message);
  if (response) {
    await msg.reply(response);
  }
});

client.initialize();
