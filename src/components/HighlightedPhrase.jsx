import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function HighlightedPhrase() {
  const words = useSelector((store) => store.matcherReducer.words);
  const [highlightedWords, sethighlightedWords] = useState();

  const buildHighlighted = (word) => (
    <span className="bg-green text-white" key={word}>{word}</span>
  );

  const highlight = (wordToHighligh = {}) => {
    console.log('llego un word: ', wordToHighligh);
    const { word, match } = wordToHighligh;

    /*
      It splits the word by the match without removing the delimiter
    */
    const regex = new RegExp(`(?:${match})|(?:<=${match})`, 'g');
    const wordAsArray = word.split(regex);
    const wordWithSpan = wordAsArray.map((piece) => {
      if (piece === '') {
        return buildHighlighted(match);
      }
      return piece;
    });
    console.log('TERMINAMOS CON ', word, ' Y ES: ', wordWithSpan);
    return wordWithSpan;
  };

  useEffect(() => {
    if (words) {
      console.log('a ver que hay', words);
      const newWords = words.map((word) => highlight(word));
      sethighlightedWords(newWords);
    }
  }, [words]);

  return (
    <div className="w-10/12 text-white text-center text-5xl mx-auto pt-8">
      {highlightedWords}
    </div>
  );
}
