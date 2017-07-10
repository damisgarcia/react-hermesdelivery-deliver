import { AsyncStorage } from 'react-native';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
// import BackgroundGeolocation from "react-native-background-geolocation";


import axios from "axios";

let moment = require("moment");
require("moment/locale/pt-br");

const onLocation = (location) => {
  // // Save Location on Server
  AsyncStorage.getItem("@HermesDelivery:key", (err, response)=>{
    console.log(moment().format("LTS"));
    console.log(location.latitude, location.longitude);
    // If has user
    if(!response){
      return false
    }

    var baseurl = "http://hermesdelivery.herokuapp.com/api/v1/agents/location/access_key/" + response
    var data = { latitude: location.latitude, longitude: location.longitude }
    axios.post(baseurl, data).then(()=>{
      console.log("Location Save")
    }, (err)=>{
      console.warn("Location not Save: ", err)
    })
  })
}

const onError = (error) => {
  var type = error.type;
  var code = error.code;
  alert(type + " Error: " + code);
}

const onActivityChange = (activityName) => {
  console.log('- Current motion activity: ', activityName);  // eg: 'on_foot', 'still', 'in_vehicle'
}

const onProviderChange = (provider) => {
  console.log('- Location provider changed: ', provider.enabled);
}

const onMotionChange = (location) => {
  console.log('- [js]motionchanged: ', JSON.stringify(location));
}

export default {
  mount: () => {
    BackgroundGeolocation.on('location', onLocation);
    BackgroundGeolocation.on('error', onError);
    // Use as Debuging
    // BackgroundGeolocation.on('motionchange', onMotionChange);
    // BackgroundGeolocation.on('activitychange', onActivityChange);
    // BackgroundGeolocation.on('providerchange', onProviderChange);

    // 2.  #configure the plugin (just once for life-time of app)
    BackgroundGeolocation.configure({
      // Geolocation Config
      desiredAccuracy: 10,
      stationaryRadius: 10,
      distanceFilter: 10,
      timeout: 5,
      foregroundService: false,
    }, function(state) {
      console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);

      if (!state.enabled) {
        BackgroundGeolocation.start(function() {
          console.log("BackgroundGeolocation Start success");
        });
      }
    });
  },

  // You must remove listeners when your component unmounts
  unmount: () => {
    // Remove BackgroundGeolocation listeners
    BackgroundGeolocation.un('location', onLocation);
    BackgroundGeolocation.un('error', onError);
    BackgroundGeolocation.un('motionchange', onMotionChange);
    BackgroundGeolocation.un('activitychange', onActivityChange);
    BackgroundGeolocation.un('providerchange', onProviderChange);
  }
}
