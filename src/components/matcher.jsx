import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectMatches,
  emptyWord,
  updateWord,
  ajaThunk,
} from '../redux/matcherSlice';

export default function Matcher() {
  const matches = useSelector(selectMatches);
  const dispatch = useDispatch();

  const [word, setWord] = useState('');

  const onHighlighting = () => {
    dispatch(emptyWord([]));
    if (word) {
      dispatch(ajaThunk(word));
    } else {
      dispatch(emptyWord([]));
    }
  };

  const onWordChange = (value) => {
    if (value) {
      dispatch(updateWord(value));
    } else {
      dispatch(emptyWord([]));
    }
    setWord(value);
  };

  return (
    <div>
      <div>
        <span>{word}</span>
        <br />
        <span>{matches}</span>
        <br />
        <button
          type="button"
          onClick={() => onHighlighting()}
        >
          machear
        </button>
        <input
          aria-label="word"
          value={word}
          onChange={(e) => onWordChange(e.target.value)}
        />
      </div>
    </div>
  );
}
