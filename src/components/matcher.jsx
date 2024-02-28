import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectMatches,
  matcherAll,
  notAMatch,
} from '../redux/matcherSlice';

export default function Matcher() {
  const matches = useSelector(selectMatches);
  console.log('me traje matches', matches);

  const dispatch = useDispatch();
  const [word, setWord] = useState('');
  const [match, setMatch] = useState([]);

  const onHighlighting = () => {
    if (word) {
      dispatch(matcherAll(word));
      setMatch(matches);
    } else {
      dispatch(notAMatch([]));
    }
  };

  return (
    <div>
      <div>
        <span>{word}</span>
        <span>{match}</span>
        <button
          type="button"
          onClick={() => onHighlighting()}
        >
          machear
        </button>
        <input
          aria-label="word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
      </div>
    </div>
  );
}
