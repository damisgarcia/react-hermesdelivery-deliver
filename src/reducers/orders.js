const initialState = {
  data: [],
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, data: action.data }
    case 'CLEAR_ORDERS':
      return { ...state, data: [] }
    default:
      return state;
  }
}
