import * as utils  from "./utils";

export function toLogin() {
  return { type: "LOGIN" }
}

export function onUnAuthorized() {
  return function(dispatch, getState){
    let params = {
      message: "Token de acesso inválido!"
    }
    dispatch(utils.setParams(params))
    dispatch(utils.destroyKey())
    dispatch(toLogin())
  }
}

export function logout() {
  return function(dispatch, getState){
    dispatch(utils.destroyKey())
    dispatch({ type: 'CLEAR_ORDERS'})
    dispatch(toLogin())
  }
}
