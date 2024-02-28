import elements from '../elements.json';

// constants
const initialState = {
  elements: elements.elements,
};

// Filters
const THERE_IS_A_MATCH = 'THERE_IS_A_MATCH';
const THERE_IS_NOT_A_MATCH = 'THERE_IS_A_MATCH';

// actions

export const highlightAction = (string) => (dispatch) => {
  const regex = /ca/;
  const match = regex.test(string);
  if (match) {
    dispatch({
      type: THERE_IS_A_MATCH,
      payload: match,
    });
  } else {
    dispatch({
      type: THERE_IS_NOT_A_MATCH,
      payload: [],
    });
  }
};

// reducers

export default function matcherReducer(state = initialState, { type, payload } = {}) {
  switch (type) {
    case THERE_IS_A_MATCH:
      return { ...state, match: payload };
    case THERE_IS_NOT_A_MATCH:
      return { ...state, match: payload };
    default:
      return state;
  }
}
