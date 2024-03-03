/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  emptyWords,
  updateWords,
  highlightFirstMatch,
} from '../redux/matcherSlice';
import HighlightedPhrase from './HighlightedPhrase';

export default function Breakify() {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const onHighlighting = () => {
    dispatch(emptyWords());
    if (firstName && lastName) {
      dispatch(highlightFirstMatch(firstName));
      dispatch(highlightFirstMatch(lastName));
    } else {
      dispatch(emptyWords());
    }
  };

  useEffect(() => {
    if (firstName && lastName) {
      const newWords = [
        { word: firstName }, { word: lastName },
      ];
      dispatch(updateWords(newWords));
    } else {
      dispatch(emptyWords());
    }
  }, [firstName, lastName]);

  return (
    <div className="flex justify-center p-6 mx-auto text-white">
      <div className="bg-black w-1/3">

        <HighlightedPhrase className="" />

        <div>
          <label className="text-white">
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
    </div>
  );
}
