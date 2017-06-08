import { AsyncStorage, ToastAndroid } from 'react-native';

export function setNavigator(nav){
  return {
    type: 'SET_NAV',
  }
}

export function setParams(params) {
  return { type: "SET_PARAMS", data: params }
}

export function getKey(callback){
  return function(dispatch, getState){
    AsyncStorage.getItem("@HermesDelivery:key", (err, response)=>{
      callback(response)
    })
  }
}

export function setKey(access_key){
  return function(dispatch, getState){
    AsyncStorage.setItem("@HermesDelivery:key", access_key)
  }
}

export function destroyKey(){
  return function(dispatch, getState){
    AsyncStorage.removeItem("@HermesDelivery:key")
  }
}

export function showToast(message){
  ToastAndroid.show(message, ToastAndroid.SHORT)
}
