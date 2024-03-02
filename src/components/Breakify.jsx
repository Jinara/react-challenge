/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emptyWord,
  updateWord,
  highlightThunk,
} from '../redux/matcherSlice';
import HighlightedPhrase from './HighlightedPhrase';

export default function Breakify() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phrase, setPhrase] = useState('');

  const onPhraseChange = (value) => {
    if (value) {
      dispatch(updateWord(value));
    } else {
      dispatch(emptyWord([]));
    }
    setPhrase(value);
  };

  const onHighlighting = () => {
    dispatch(emptyWord([]));
    if (phrase) {
      dispatch(highlightThunk(phrase));
    } else {
      dispatch(emptyWord([]));
    }
  };

  useEffect(() => {
    onPhraseChange(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return (
    <div className="">
      <HighlightedPhrase />

      <div>
        <label>
          First Name:

          <input
            type="text"
            name="firstName"
            aria-label="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:

          <input
            type="text"
            name="LastName"
            aria-label="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>

      <button type="button" onClick={() => onHighlighting()}>
        Breakify
      </button>
    </div>
  );
}
