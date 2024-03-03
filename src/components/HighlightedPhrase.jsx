import React from 'react';
// import { useSelector } from 'react-redux';

export default function HighlightedPhrase() {
  // const phrase = useSelector((store) => store.matcherReducer.word);
  // const matches = useSelector((store) => store.matcherReducer.matches);
  const wordsToHighlight = [
    { word: 'Nathaly', match: 'Na' },
    { word: 'Breaking', match: 'Br' },
  ];

  const buildHighlighted = (word) => (
    <span className="textItem" key={word}>{word}</span>
  );

  const highlight = (wordToHighligh) => {
    const { word, match } = wordToHighligh;
    const regex = new RegExp(`(?:${match})|(?:<=${match})`, 'g');
    const holi = word.split(regex);

    const wii = holi.map((r) => {
      if (r === '') {
        return buildHighlighted(match);
      }
      return r;
    });
    console.log('TERMINAMOS CON ', word, ' Y ES: ', wii);
    return wii;
  };

  const aja = () => wordsToHighlight.forEach((word) => highlight(word));

  return (
    <div>
      My words
      <br />
      {aja()}
      <br />
      <br />
      {highlight(wordsToHighlight[0])}
      {highlight(wordsToHighlight[1])}
    </div>
  );
}
