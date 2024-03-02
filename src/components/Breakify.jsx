import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectMatches,
  emptyWord,
  updateWord,
  ajaThunk,
} from '../redux/matcherSlice';

export default function Breakify() {
  const matches = useSelector(selectMatches);
  const dispatch = useDispatch();
  const aMatch = useSelector((state) => {
    if (state.matcherReducer.aMatch) {
      return 'Siii';
    }
    return 'Ño :(';
  });

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
    console.log('holi');
    dispatch(emptyWord([]));
    if (phrase) {
      dispatch(ajaThunk(phrase));
    } else {
      dispatch(emptyWord([]));
    }
  };

  useEffect(() => {
    onPhraseChange(`${firstName} ${lastName}`);
  }, [firstName, lastName]);

  return (
    <div className="background-color: cian">
      <span>
        Words:
        {' '}
        {phrase}
        <br />
        firstName:
        {' '}
        {firstName}
        <br />
        lastName:
        {' '}
        {lastName}
        <br />
        Matches:
        {matches}
        There was a match?:
        {' '}
        {aMatch}
      </span>
      <br />

      <div>
        First Name:

        <input
          type="text"
          name="firstName"
          aria-label="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        Last Name:

        <input
          type="text"
          name="LastName"
          aria-label="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      <button type="button" onClick={() => onHighlighting()}>
        Breakify
      </button>
    </div>
  );
}
