const initialState = {

}

export default function(state=initialState, action){
  switch (action.type) {
    case 'SET_PARAMS':
      return { ...state, ...action.data };
    default:
      return state;
  }
}
