const reflections = {
  aku: "kamu",
  saya: "kamu",
  kamu: "saya",
  engkau: "saya",
  ku: "mu",
  mu: "ku",
  gw : "lu",
};

function reflect(text) {
  return text
    .split(/\b/)
    .map((word) => {
      const lower = word.toLowerCase();
      return reflections[lower] !== undefined
        ? reflections[lower]
        : word;
    })
    .join("");
}

module.exports = reflect;
