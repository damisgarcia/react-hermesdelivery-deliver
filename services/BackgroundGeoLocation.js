import BackgroundGeolocation from "react-native-background-geolocation";

let moment = require("moment");
require("moment/locale/pt-br");

const onLocation = (location) => {
  console.log(location.coords.latitude, location.coords.longitude);
  console.log(moment().format("LTS"));
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
      stationaryRadius: 25,
      distanceFilter: 10,
      timeout: 1,
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
