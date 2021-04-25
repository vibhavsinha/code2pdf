#!/usr/bin/env node
const path = require('path');
const puppeteer = require('puppeteer');
const readline = require('readline');

const {
  newFileName,
  extractExtension,
  makeHtml,
  validExtensions,
} = require('./utils');

const pageStyles = `body {font-family: sans-serif}`;

const rl = readline.createInterface({
  input: process.stdin,
});

let outputFile = newFileName();
if (process.argv[2]) {
  outputFile = process.argv[2];
}

const waitForAll = [];
rl.on('line', function (l) {
  console.error('file: ', l);
  if (!validExtensions.includes(extractExtension(l))) return;
  waitForAll.push(makeHtml(l));
});

rl.on('close', async () => {
  const content = (await Promise.all(waitForAll)).join('\n');
  const browser = await puppeteer.launch({headless: outputFile !== 'preview'});
  const page = await browser.newPage();
  await page.setContent(content);
  const prismPath = path.dirname(require.resolve('prismjs'));
  await page.addStyleTag({path: path.join(prismPath, 'themes/prism.css')});
  await page.addStyleTag({content: pageStyles});
  await page.addStyleTag({
    path: path.join(prismPath, 'plugins/line-numbers/prism-line-numbers.css'),
  });
  if (outputFile === 'preview') return;
  await page.pdf({path: outputFile, format: 'a4', scale: 0.5});
  await browser.close();
});
