const rules = require("./rules");
const reflect = require("./reflection");

function respond(input) {
  input = input.trim();

  for (const rule of rules) {
    const match = input.match(rule.pattern);
    if (match) {
      if (rule.conditional) {
        if (rule.conditional.test(input)) {
          return rule.reply;
        } else if (rule.fallbackReply) {
          return rule.fallbackReply;
        }
      }

      if (typeof rule.reply === "function") {
        return rule.reply(match);
      }

      if (typeof rule.reply === "string" && rule.reply.includes("{reflected}")) {
        const reflected = reflect(match[2] || match[1] || "");
        return rule.reply.replace("{reflected}", reflected);
      }

      return rule.reply;
    }
  }

  return "Aku mendengarkan. Bisa ceritakan lebih banyak?";
}

module.exports = respond;
