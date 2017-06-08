import React from 'react';

import {
  AppRegistry,
  Alert,
  AsyncStorage,
  ActivityIndicator,
  View,
  Platform,
  StatusBar,
  Text
} from 'react-native';

import { Provider } from 'react-redux';

import Store from './constants/Store';
import configureStore from './constants/ConfigureStore';

import AppWithNavigationState from './screens/RootNavigation';

import { StyleProvider, getTheme } from 'native-base';
import Colors from './themes/Colors';
import DefaultTheme from './themes/DefaultTheme';

import Secrets from './constants/Secrets';

Store.instance = configureStore()

import BackgroundGeoLocation from "./services/BackgroundGeoLocation";

export class App extends React.Component {

  state = {
    appIsReady: false,
  };

  componentWillMount() {
    try {
      this._loadAsyncJobs();
      this._getLocationAsync();
      BackgroundGeoLocation.mount()
    } catch (e) {
      console.warn('There was an error caching assets (see: main.js), perhaps due to a ', e);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  // componentWillUnmount() {
  //   try {
  //     BackgroundGeoLocation.unmount()
  //   } catch (e) {
  //     console.warn("Background Geolocation Error: ", e)
  //   }
  // }

  render() {
    if(this.state.appIsReady){
      return (
        <StyleProvider style={getTheme(DefaultTheme)}>
          <Provider store={Store.instance}>
            <View style={styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
              {Platform.OS === 'android' && <StatusBar translucent={true} backgroundColor={Colors.androidStatusBar} barStyle="light-content"/> }
              <View style={styles.content}>
                <AppWithNavigationState/>
              </View>
            </View>
          </Provider>
        </StyleProvider>
      );
    } else{
      return (
        <View style={styles.loadingWrap}>
          <ActivityIndicator
            animating={true}
            style={[styles.centering, {height: 120}]}
            size="large" />
        </View>
      )
    }
  }

  async _loadAsyncJobs() {
    try {
      await AsyncStorage.getItem("@HermesDelivery:key", (err, response)=>{
        Secrets.key = response
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.'
      );
    }
  }

  _getLocationAsync = async () => {
    await navigator.geolocation.getCurrentPosition((location)=>{
      console.log(`${location.coords.latitude}, ${location.coords.longitude}`)
    }, (err)=>{
      console.warning(err)
    }, { enableHighAccuracy: true });
  };
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: Colors.brandPrimary,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.brandPrimary,
    marginTop: 24,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  loadingWrap: {
    flex: 1,
    paddingTop: 64,
    paddingBottom: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
}
