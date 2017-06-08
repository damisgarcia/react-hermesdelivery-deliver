import { NavigationActions } from 'react-navigation';

import Secrets from "../constants/Secrets";
import { RootNavigation } from "../screens/RootNavigation";

const initialState = () =>{
  if(Secrets.key){
    let HomeAction = RootNavigation.router.getActionForPathAndParams('Home')
    return RootNavigation.router.getStateForAction(HomeAction);
  } else{
    let LoginAction  = RootNavigation.router.getActionForPathAndParams('Login')
    return RootNavigation.router.getStateForAction(LoginAction);
  }
}

export default function(state = initialState(), action){
  let nextState;
  switch (action.type) {
    case 'LOGIN':
      nextState = RootNavigation.router.getStateForAction( NavigationActions.back({key: 'Init'}) );
      break;
    case 'LOGOUT':
      nextState = RootNavigation.router.getStateForAction(
        NavigationActions.back({ routeName: 'Login', params: { message: "Logout with success!" } }),
        state
      );
      return { ...state, nextState }
      break;
    default:
      nextState = RootNavigation.router.getStateForAction(action, state);
      break;
  }

  return nextState || state;
}
