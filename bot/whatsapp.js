require("dotenv").config();
const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const respond = require("./responder");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  console.log("Scan QR ini untuk login:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("Bot WhatsApp siap digunakan!");
});

client.on("message", async (message) => {
  const reply = respond(message.body);
  message.reply(reply);
});

client.on('message', async (msg) => {
  if (msg.type === 'location') {
    const { latitude, longitude } = msg.location;
    const response = getNearestPsikolog(latitude, longitude);
    await msg.reply(`Berikut psikolog terdekat:\n\n${response}`);
    return;
  }
});


client.initialize();
