class WordTrieNode {
  isWord;
  children;
  constructor() {
    this.isWord = false;
    this.children = {};
  }
}

class WordTrie {
  root;
  constructor(words) {
    this.root = new WordTrieNode();
    for (let i = 0; i < words.length; i++) {
      this.addWord(words[i], 0, this.root);
    }
  }

  addWord(word, ix, currNode) {
    if (ix == word.length) {
      // want to prevent adding the empty string as a word
      if (ix > 0) {
        currNode.isWord = true;
      }
    } else {
      if (!(word[ix] in currNode.children)) {
        currNode.children[word[ix]] = new WordTrieNode();
      }
      this.addWord(word, ix + 1, currNode.children[word[ix]]);
    }
  }

  contains(word) {
    let wtNode = this.navigateTo(word, 0, this.root);
    if (wtNode == null) {
      return false;
    } else {
      return wtNode.isWord;
    }
  }

  navigateTo(word, ix, currNode) {
    if (ix == word.length) {
      return currNode;
    } else {
      if (!(word[ix] in currNode.children)) {
        return null;
      } else {
        return this.navigateTo(word, ix + 1, currNode.children[word[ix]]);
      }
    }
  }

  getPossibleWords(characters) {
    let allWords = [];
    this.getPossWords(characters, allWords, this.root, "");
    return allWords;
  }

  getPossWords(characters, allWords, currNode, currWord) {
    if (currNode.isWord) {
      allWords.push(currWord);
    }

    for (let i = 0; i < characters.length; i++) {
      if (characters[i] in currNode.children) {
        this.getPossWords(characters, allWords, currNode.children[characters[i]], currWord + characters[i]);
      }
    }
  }
}

exports.WordTrie = WordTrie;