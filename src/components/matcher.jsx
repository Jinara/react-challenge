import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectMatches,
  emptyWord,
  updateWord,
  highlightThunk,
} from '../redux/matcherSlice';

export default function Matcher() {
  const matches = useSelector(selectMatches);
  const dispatch = useDispatch();

  const [words, setWords] = useState('');

  const onHighlighting = () => {
    dispatch(emptyWord([]));
    if (words) {
      dispatch(highlightThunk(words));
    } else {
      dispatch(emptyWord([]));
    }
  };

  // const onWordChange = (value) => {
  //   if (value) {
  //     dispatch(updateWord(value));
  //   } else {
  //     dispatch(emptyWord([]));
  //   }
  //   setWord(value);
  // };

  return (
    <form onSubmit={onHighlighting}>
      <div className="background-color: cian">
        <span>
          Words:
          {words}
        </span>
        <br />
        <span>{matches}</span>
        <br />
        {children}
        <button
          type="button"
          onClick={() => onHighlighting()}
        >
          machear
        </button>
      </div>
    </form>
  );
}

