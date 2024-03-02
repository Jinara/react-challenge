import React from 'react';
import { useSelector } from 'react-redux';

export default function HighlightedPhrase() {
  const phrase = useSelector((store) => store.matcherReducer.word);
  const matches = useSelector((store) => store.matcherReducer.matches);

  const highlight = () => (
    <p>
      {phrase}
      <br />
      Matches:
      {matches}
    </p>
  );

  return (
    <div>
      {highlight()}
    </div>
  );
}
