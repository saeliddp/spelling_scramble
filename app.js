const fs = require('fs');
const http = require('http');
const wt = require('./WordTrie.js');
const utils = require('./utils.js');

const re = /\s+/;
const fullVocab = fs.readFileSync('./data/dict_nltk.txt', 'utf-8').split(re);
const indexTemplate = fs.readFileSync('./index.html').toString();

const minLength = 4;
let prunedVocab = utils.pruneVocab(fullVocab, minLength);
const vocabTrie = new wt.WordTrie(prunedVocab);

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html'});

  let letters = utils.pickLetters(2, 5);
  let wordList = vocabTrie.getPossibleWords(letters);
  let letterSelection = utils.selectPrimaryLetter(wordList);
  let indexFull = indexTemplate.replace('{{all_words}}', utils.arrayToString(letterSelection['wordList']));
  indexFull = indexFull.replace('{{letters}}', utils.arrayToString(letters));
  indexFull = indexFull.replace('{{primary}}', letterSelection['primaryLetter']);
  indexFull = indexFull.replace('{{minLength}}', minLength);
  res.write(indexFull);
  return res.end();
});

server.listen(8080, () => {
  console.log('Server running');
});