import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HighlightedPhrase() {
  const words = useSelector((store) => store.matcherReducer.words);
  const [highlightedWords, sethighlightedWords] = useState();

  /*
    TODO: Improve key assignation. Two equal words generates warnings
    Also add a TagBuilder to decouple this
  */
  const buildHighlighted = (word) => (
    <span className="bg-green text-white p-1 font-bold" key={word}>{word}</span>
  );

  const buildP = (word, key) => (
    <p key={key || word} className="pb-8">{word}</p>
  );

  const highlight = (wordToHighligh = {}) => {
    const { word, match } = wordToHighligh;

    if (match) {
    /*
      It splits the word by the match without removing the delimiter

      TODO: improve REGEX to accept more than one word.
    */
      const regex = new RegExp(`(?:${match})|(?:<=${match})`, 'g');
      const wordAsArray = word.split(regex);
      const wordWithSpan = wordAsArray.map((piece) => {
        if (piece === '') {
          return buildHighlighted(match);
        }
        return piece;
      });
      return buildP(wordWithSpan, word);
    }
    return buildP(word);
  };

  useEffect(() => {
    if (words) {
      const newWords = words.map((word) => highlight(word));
      sethighlightedWords(newWords);
    }
  }, [words]);

  return (
    <div className="w-10/12 text-white text-center text-5xl mx-auto py-12 min-h-64">
      {highlightedWords}
    </div>
  );
}
