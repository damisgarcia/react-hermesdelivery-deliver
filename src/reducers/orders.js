const initialState = {
  data: [],
  lorem: "Lorem ipsum dolor sit amet",
  isRefreshing: false
}

export default function(state=initialState, action){
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, data: action.data }
    case 'TOOGLE_REFRESHING':
      return { ...state, isRefreshing: !state.isRefreshing }
    case 'CLEAR_ORDERS':
      return { ...state, data: [] }
    default:
      return state;
  }
}
