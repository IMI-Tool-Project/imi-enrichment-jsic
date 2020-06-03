const jsic = require("../main");
const expect = require('chai').expect;
const fs = require("fs");
const spec = __dirname + "/../spec";

describe('imi-enrichment-jsic', function() {

  describe("spec", function() {
    fs.readdirSync(spec).filter(file => file.match(/json$/)).forEach(file => {
      describe(file, function() {
        const json = JSON.parse(fs.readFileSync(`${spec}/${file}`, "UTF-8"))
        json.forEach(a => {
          it(a.name, function() {
            expect(jsic(a.input)).deep.equal(a.output);
          });
        });
      });
    });
  });

  describe('response structure', function() {
    const x = jsic(`
インターネットとは、インターネット・プロトコル・スイートを使用し、
複数のコンピュータネットワークを相互接続した、
グローバルなネットワーク（地球規模の情報通信網）のことである。
`);

    it('ルート要素は配列であること', function() {
      expect(x).to.be.an('array');
    });

    it('ルート要素の配列は長さ 10 であること', function() {
      expect(x).to.have.lengthOf(10);
    });

    it('ルート要素の配列の配下は score と value だけを持つ JSON Object であること', function() {
      x.forEach(e => {
        expect(e).to.be.an('object');
        expect(Object.keys(e)).to.have.members(["score", "value"]);
      });
    });

    it('score プロパティの値は 0以上の整数であること', function() {
      x.map(e => e.score).forEach(score => {
        expect(score).to.be.at.least(0);
      });
    });

    it('value プロパティの値は JSON Object で表現されるコード型のインスタンスであること', function() {
      x.map(e => e.value).forEach(value => {
        expect(value).to.be.an('object');
        expect(value).to.have.property('@type', 'コード型');
        expect(value).to.have.property('識別値');
      });
    });

    it('ルート要素の配列は score の降順でソートされていること', function() {
      for (let i = 1; i < x.length; i++) {
        expect(x[i - 1].score >= x[i].score).to.be.true;
      }
    });


  });

});
