const vowels = ['a', 'e', 'i', 'o', 'u'];
const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z'];
let lowAlphSet = new Set();
for (let ch of vowels) {
  lowAlphSet.add(ch);
}
for (let ch of consonants) {
  lowAlphSet.add(ch);
}

function isLowerAlphabetic(word) {
  for (let i = 0; i < word.length; i++) {
    if (!lowAlphSet.has(word[i])) {
      return false;
    }
  }
  return true;
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}

function pickLetters(numVowels, numConsonants) {
  shuffleArray(vowels);
  shuffleArray(consonants);
  output = [];
  for (let i = 0; i < numVowels; i++) {
    output.push(vowels[i]);
  }
  for (let i = 0; i < numConsonants; i++) {
    output.push(consonants[i]);
  }
  return output;
}

function arrayToString(arr) {
  output = "[";
  for (let elem of arr) {
    output += '"' + elem + '",'
  }
  output = output.substring(0, output.length - 1) + "]";
  return output;
}

function selectPrimaryLetter(arr) {
  lists = {};
  let maxCount = 0;
  let maxLetter = '-';
  for (let word of arr) {
    for (let i = 0; i < word.length; i++) {
      if (!(word[i] in lists)) {
        lists[word[i]] = [word];
      } else {
        let currList = lists[word[i]];
        if (currList[currList.length - 1] !== word) {
          currList.push(word);
          if (currList.length > maxCount) {
            maxCount = currList.length;
            maxLetter = word[i];
          }
        }
      }
    }
  }
  return {'primaryLetter': maxLetter, 'wordList': lists[maxLetter]};
}

function pruneVocab(wordList, minLength) {
  let prunedVocab = [];
  for (let word of wordList) {
    if (isLowerAlphabetic(word) && word.length >= minLength) {
      prunedVocab.push(word);
    }
  }
  return prunedVocab;
}

exports.isLowerAlphabetic = isLowerAlphabetic;
exports.pickLetters = pickLetters;
exports.arrayToString = arrayToString;
exports.selectPrimaryLetter = selectPrimaryLetter;
exports.pruneVocab = pruneVocab;