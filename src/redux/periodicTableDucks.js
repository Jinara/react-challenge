import elements from '../elements.json';

// constants
const initialState = {
  elements: [],
  error: {},
};

// Filters
const GET_ELEMENTS_SUCCESSFULLY = 'GET_ELEMENTS_SUCCESSFULLY';

// actions

export const getElementsAction = () => (dispatch) => {
  dispatch({
    type: GET_ELEMENTS_SUCCESSFULLY,
    payload: elements.elements,
  });
};

// redurcers
export default function periodicTableReducer(state = initialState, { type, payload } = {}) {
  console.log('ejecutando reducer periodic table', state, type, payload);
  switch (type) {
    case GET_ELEMENTS_SUCCESSFULLY:
      return { ...state, elements: payload };
    default:
      return state;
  }
}
