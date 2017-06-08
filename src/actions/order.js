import axios from 'axios';

import * as login  from "./login";
import * as utils  from "./utils";

export function setOrders(data){
  return {
    type: 'SET_ORDERS',
    data: data
  }
}

export function fetchOrders() {
  return function(dispatch, getState){
    dispatch(
      utils.getKey( (access_key)=> {
        let uri = 'http://hermesdelivery.herokuapp.com/api/v1/agents/orders/access_key/' + access_key

        // Enable Loading
        dispatch( toogleRefresingOrders() )

        axios.get(uri)
          .then( (response) => {
            dispatch( toogleRefresingOrders() )
            dispatch( setOrders(response.data) )
          }).catch( (err) => {
            dispatch( toogleRefresingOrders() )
            dispatch( login.onUnAuthorized() )
          })
      })
    )
  }
}

export function clearOrders() {
  return function(dispatch, getState){
    let emptyArray = []
    dispatch( setOrders(emptyArray) )
  }
}

export function toogleRefresingOrders() {
  return {
    type: "TOOGLE_REFRESHING",
  }
}
