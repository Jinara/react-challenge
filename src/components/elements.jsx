import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { highlightAction } from '../redux/matcherDucks';

function Elements() {
  const dispatch = useDispatch();
  const elements = useSelector((store) => store.matchReducers.elements);
  const match = useSelector((store) => store.matchReducers.match);
  console.log('elements: ', elements);
  console.log('mathc: ', match);

  return (
    <div>
      Elements
      <input name="firstName" />
      <button type="button" onClick={() => dispatch(highlightAction('carla'))}>Get</button>

      <ul>
        {
          elements.map((item) => (
            <li key={item.symbol}>{item.symbol}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default Elements;
