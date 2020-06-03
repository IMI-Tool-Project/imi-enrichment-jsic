# imi-enrichment-jsic

与えられた自由文 (string) に対して、所与のコードリストから適切なコードを推薦します。
コードには `説明` が付与されているものとします。
この実装ではコードリストとして日本標準産業分類を整備・使用します。

**codelist.json**

```codelist.json
{
  "@context": "https://imi.go.jp/ns/core/context.jsonld",
  "@graph": [
    {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-A",
      "@type": "コード型",
      "識別値": "A",
      "表記": "農業，林業",
      "説明": "..."
    },
    {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-A01",
      "@type": "コード型",
      "識別値": "A01",
      "表記": "農業",
      "説明": "...",
      "上位コード" : "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-A"
    },
    {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-A010",
      "@type": "コード型",
      "識別値": "A010",
      "表記": "管理，補助的経済活動を行う事業所（01農業）",
      "説明": "...",
      "上位コード" : "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-A01"
    },...
  ]
}
```

注) コードリストは [e-Stat 日本標準産業分類](https://www.e-stat.go.jp/classifications/terms/10) でダウンロードできる CSV データを加工して作成します。コードの `@id` には統計 LOD で整備されている URI を付与しています。

**input.txt**

```input.txt
インターネットとは、インターネット・プロトコル・スイートを使用し、
複数のコンピュータネットワークを相互接続した、
グローバルなネットワーク（地球規模の情報通信網）のことである。
```

注) この例文は [Wikipedia:インターネット](https://ja.wikipedia.org/wiki/%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8D%E3%83%83%E3%83%88) の概要文をコピーしたものです。

**output.json**

```output.json
[
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "G",
      "表記": "情報通信業",
      "説明": "..."
    },
    "score": 16
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-E",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "E",
      "表記": "製造業",
      "説明": "..."
    },
    "score": 14
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-A",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "A",
      "表記": "農業，林業",
      "説明": "..."
    },
    "score": 13
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G4011",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "G4011",
      "表記": "ポータルサイト・サーバ運営業",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G401"
    },
    "score": 11
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G40",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "G40",
      "表記": "インターネット附随サービス業",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G"
    },
    "score": 10
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G4012",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "G4012",
      "表記": "アプリケーション・サービス・コンテンツ・プロバイダ",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G401"
    },
    "score": 10
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-E2842",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "E2842",
      "表記": "電子回路実装基板製造業",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-E284"
    },
    "score": 10
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-L7311",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "L7311",
      "表記": "広告業",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-L731"
    },
    "score": 10
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-B",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "B",
      "表記": "漁業",
      "説明": "...",
    },
    "score": 9
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-E3031",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "E3031",
      "表記": "電子計算機製造業（パーソナルコンピュータを除く）",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-E303"
    },
    "score": 9
  }
]
```

- 与えられた文字列に対して output.json を生成します
- output.json のルートは配列、配下に `value` と `score` を持つ JSON Object を最大10件保持します
- `value` には codelist.json に含まれる コード型のコピーが保持されます
- `score` には評価値が保持されます (大きいほど評価が高い)
- JSON Object は `score` の値が大きい順にソートされているものとします
- 与えられた文字列に対して推薦できるコードが存在しない場合には空の配列が返ります


# 利用者向け情報

以下の手順はパッケージアーカイブ `imi-enrichment-jsic-1.0.0.tgz` を用いて実行します。

## インストール

以下の手順でインストールします。

```
$ npm install imi-enrichment-jsic-1.0.0.tgz
```

## コマンドラインインターフェイス

`imi-enrichment-jsic-1.0.0.tgz` にはコマンドラインインターフェイスが同梱されており、
通常はインストールすると `imi-enrichment-jsic` コマンドが使用できるようになります。

コマンドラインインターフェイスのファイルの実体は `bin/cli.js` です。

```
$ npm install imi-enrichment-jsic-1.0.0.tgz

# ヘルプの表示
$ imi-enrichment-jsic -h

# テキストファイルからの推薦
$ imi-enrichment-jsic input.txt > output.json

# 標準入力のテキストからの推薦
$ cat input.json | imi-enrichment-jsic > output.json

# 文字列からの推薦
$ imi-enrichment-jsic -s インターネットサービスプロバイダ > output.json

```

または `npx` を使って以下のようにインストールせずに実行することも可能です。

```
$ npx imi-enrichment-jsic-1.0.0.tgz -s インターネットサービスプロバイダ
```

## Web API

`imi-enrichment-jsic-1.0.0.tgz` には Web API を提供するサーバプログラムが同梱されています。

### サーバの起動方法

`bin/server.js` がサーバの実体です。
以下のように `bin/server.js` を実行することで起動できます。

```
$ npm install imi-enrichment-jsic-1.0.0.tgz
$ node node_modules/imi-enrichment-jsic/bin/server.js
Usage: node server.js [port number]

$ node node_modules/imi-enrichment-jsic/bin/server.js 8080
imi-enrichment-jsic-server is running on port 8080
```

なお、実行時にはポート番号の指定が必要です。指定しなかった場合にはエラーが表示されて終了します。
サーバを停止するには `Ctrl-C` を入力してください。

### 利用方法

WebAPI は POST されたテキストを入力として JSON を返します。

```
$ curl -X POST -H 'Content-Type: text/plain' -d 'インターネットサービスプロバイダ' localhost:8080
[
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G4012",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "G4012",
      "表記": "アプリケーション・サービス・コンテンツ・プロバイダ",
      "説明": "...",
      "上位コード": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G401"
    },
    "score": 13
  },
  {
    "value": {
      "@id": "http://data.e-stat.go.jp/lod/ontology/crossDomain/code/industryClassification2013-G",
      "@type": "コード型",
      "コード種別": "http://data.e-stat.go.jp/lod/data/ontology/crossDomain/code/IndustryClassification2013ConceptScheme",
      "識別値": "G",
      "表記": "情報通信業",
      "説明": "..."
    },
    "score": 10
  },
  ...
]
```

- WebAPI の URL に GET メソッドでアクセスした場合には HTML ページが表示され、WebAPI の動作を確認することができます
- POST,GET 以外のメソッドでアクセスした場合には `405 Method Not Allowed` エラーが返されます
- POST Body を入力テキストとして扱い、推薦結果のコード群からなる JSON を返します

## API (Node.js)

モジュール `imi-enrichment-jsic` は以下のような API の関数を提供します。

```
module.exports = function(input) {..}
```

- 入力 (input) : 入力テキストとする String
- 出力 : 推薦結果の JSON ※ 推薦は同期で行うため Promise でないことに注意

```
const jsic = require('imi-enrichment-jsic');
console.log(jsic("インターネットサービスプロバイダ"));
```

# 開発者向け情報

以下の手順はソースコードアーカイブ `imi-enrichment-jsic-1.0.0.src.tgz` を用いて実行します。

## 環境構築

以下の手順で環境を構築します。

```
$ mkdir imi-enrichment-jsic
$ cd imi-enrichment-jsic
$ tar xvzf /tmp/imi-enrichment-jsic-1.0.0.src.tgz
$ npm install
```

## テスト

以下の手順でテストを実行します

```
$ cd imi-enrichment-jsic
$ npm test
```


## ブラウザビルド(参考情報)

以下の手順を実行するとブラウザで動作する Javascript `dist/imi-enrichment-jsic.js` が生成されます。

```
$ cd imi-enrichment-jsic
$ npm run browser
$ ls dist
imi-enrichment-jsic.js
```

以下のように HTML で読み込むと、グローバルスコープに `IMIEnrichmentJSIC` 関数が登録されます。

```
<script src="imi-enrichment-jsic.js"></script>
<script>
console.log(IMIEnrichmentJSIC("インターネットサービスプロバイダ"));
</script>
```

この `IMIEnrichmentJSIC` に String を渡すことで、変換結果を取得できます。
