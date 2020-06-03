#!/usr/bin/env node

const fs = require('fs');
const commandLineArgs = require('command-line-args');
const commandLineUsage = require('command-line-usage');
const enrichment = require("../main");

const optionDefinitions = [{
  name: 'help',
  alias: 'h',
  type: Boolean,
  description: 'このヘルプを表示します'
}, {
  name: 'file',
  alias: 'f',
  type: String,
  defaultOption: true,
  typeLabel: '{underline file}',
  description: '自由文を収録したテキストファイル'
}, {
  name: 'string',
  alias: 's',
  type: String,
  typeLabel: '{underline string}',
  description: '自由文の文字列',
}, {
  name: 'indent',
  alias: 'i',
  type: Number,
  typeLabel: '{underline number}',
  description: '出力する JSON のインデント (default 2)',
  defaultValue: 2
}];

const options = commandLineArgs(optionDefinitions);

if (options.help) {
  const usage = commandLineUsage([{
    header: 'imi-enrichment-jsic',
    content: '与えられた自由文に対して日本標準産業分類の候補を推薦します'
  }, {
    header: 'オプション',
    optionList: optionDefinitions
  }, {
    header: '実行例',
    content: [{
        desc: 'ヘルプの表示',
        example: '$ imi-enrichment-jsic -h'
      },
      {
        desc: '文字列からの候補の推薦',
        example: '$ imi-enrichment-jsic -s 医療機器'
      },
      {
        desc: 'ファイルからの候補の推薦',
        example: '$ imi-enrichment-jsic input.txt'
      },
      {
        desc: '標準入力からの候補の推薦',
        example: '$ cat input.txt | imi-enrichment-jsic'
      }
    ]
  }]);
  console.log(usage)
} else if (options.string) {
  console.log(JSON.stringify(enrichment(options.string), null, options.indent));
} else if (options.file) {
  const input = fs.readFileSync(options.file, "UTF-8");
  console.log(JSON.stringify(enrichment(input), null, options.indent));
} else {
  let buffer = "";
  process.stdin.setEncoding('utf-8');
  process.stdin.on('data', chunk => {
    buffer += chunk;
  }).on('end', () => {
    console.log(JSON.stringify(enrichment(buffer), null, options.indent));
  });
}
