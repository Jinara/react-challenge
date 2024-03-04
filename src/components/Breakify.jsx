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

  /*
    TODO: move styling to other component
   */
  const inputStyling = 'text-black';
  const labelStyling = 'text-white w-min px-2';
  const buttonStyling = 'mx-auto bg-green w-full p-1 mt-8 rounded';

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

    return () => {
      dispatch(emptyWords());
    };
  }, [firstName, lastName]);

  return (
    <div className="flex justify-center p-4 mx-auto text-white">
      <div className="bg-black w-min">
        <div className="px-8 py-16">
          <HighlightedPhrase />

          <div className="w-max">
            <div className="flex justify-around">
              <label className={labelStyling}>
                First Name:

                <input
                  type="text"
                  name="firstName"
                  aria-label="firstName"
                  value={firstName}
                  className={inputStyling}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>

              <label className={labelStyling}>
                Last Name:

                <input
                  type="text"
                  name="lastName"
                  aria-label="lastName"
                  value={lastName}
                  className={inputStyling}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>

            <button className={buttonStyling} type="button" onClick={() => onHighlighting()}>
              Breakify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
