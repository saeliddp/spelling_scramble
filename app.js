const fs = require('fs');
const http = require('http');
const wt = require('./WordTrie.js');
const utils = require('./utils.js');

const fullVocab = fs.readFileSync('./data/dict_full.txt', 'utf-8').split('\n');
const indexTemplate = fs.readFileSync('./index.html').toString();

let prunedVocab = [];
for (let word of fullVocab) {
  if (utils.isLowerAlphabetic(word)) {
    prunedVocab.push(word);
  }
}

const vocabTrie = new wt.WordTrie(prunedVocab);
let wordList = vocabTrie.getPossibleWords(['y', 'e', 's']);

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  let letters = utils.pickLetters(2, 5);
  let wordList = vocabTrie.getPossibleWords(letters);
  let indexFull = indexTemplate.replace('{{all_words}}', wordList.toString());
  indexFull = indexFull.replace('{{letters}}', letters.toString());
  res.write(indexFull);
  return res.end();
});

server.listen(8080, () => {
  console.log('Server running');
});