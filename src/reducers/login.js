const initialState = {
  key: null,
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'SET_KEY':
      return { ...state, key: action.data };
    case 'ON_KEY_FAILED':
      return { ...state, key: null }
    default:
      return state;
  }
}
