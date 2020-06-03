const fs = require("fs");
const Papa = require("papaparse");

const csv = fs.readFileSync(process.argv[2], "UTF-8");

const data = Papa.parse(csv).data.filter(col => col[0].match(/^[a-zA-Z0-9]+$/));

let prefix = "";
data.forEach(col => {
  if (col[0].match(/^[A-Z]$/)) prefix = col[0];
  else col[0] = prefix + col[0];
});

const graph = data.map(col => {
  return {
    "@id": `http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-${col[0]}`,
    "@type": "コード型",
    "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
    "識別値": col[0],
    "表記": col[1],
    "説明": col[2].replace(/\r\n/g, "\n").trim()
  };
});

graph.forEach(child => {
  graph.forEach(parent => {
    if (child["@id"].indexOf(parent["@id"]) !== 0) return;
    if (child["@id"] === parent["@id"]) return;
    if (child["上位コード"] === undefined) child["上位コード"] = parent["@id"];
    if (child["上位コード"].length < parent["@id"].length) child["上位コード"] = parent["@id"];
  });
});

console.log(JSON.stringify({
  "@context": "https://imi.go.jp/ns/core/context.jsonld",
  "@graph": graph
}, null, 2));
