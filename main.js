const jsic = require("./lib/jsic.json");

// 与えられた文字列から bigram を作成
const bigram = function() {
  const result = {};
  Array.from(arguments).join(",").replace(/　/g, "").split(/[,、（）。・，\n「」]/).forEach(a => {
    a = a.trim();
    for (let i = 0; i < a.length - 1; i++) {
      const key = a.substring(i, i + 2);
      if (key.length === 2) result[key] = true;
    }
  });
  return Object.keys(result);
}

class Concept {
  constructor(json) {
    this.id = json["@id"];
    this.json = json;
    this.gram = bigram(json["説明"], json["表記"]);
  }
  setParent(parent) {
    this.parent = parent;
  }
}

const gram = (function() {

  const all = (function() {
    const map = {};
    const list = jsic["@graph"].map(json => {
      const c = new Concept(json);
      map[c.id] = c;
      return c;
    });
    list.forEach(child => {
      if (child.json["上位コード"]) child.setParent(map[child.json["上位コード"]]);
    });
    return list;
  })();

  const gram = {};
  all.forEach(concept => {
    concept.gram.forEach(token => {
      if (gram[token] === undefined) gram[token] = [];
      if (gram[token].indexOf(concept) === -1) gram[token].push(concept);
    });
  });

  return gram;
})();

module.exports = function(description) {

  const result = {};
  bigram(description).filter(token => gram[token] !== undefined).forEach(token => {
    gram[token].forEach(concept => {
      if (result[concept.id] === undefined)
        result[concept.id] = {
          value: concept.json,
          score: 0
        };
      result[concept.id].score++;
    });
  });

  const list = Object.values(result).sort((a, b) => b.score - a.score).slice(0, 10);
  return JSON.parse(JSON.stringify(list));
};
