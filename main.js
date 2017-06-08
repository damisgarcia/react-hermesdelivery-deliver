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

import Store from './src/constants/Store';
import configureStore from './src/constants/ConfigureStore';

import AppWithNavigationState from './src/screens/RootNavigation';

import { StyleProvider, getTheme } from 'native-base';
import Colors from './src/themes/Colors';
import DefaultTheme from './src/themes/DefaultTheme';

import Secrets from './src/constants/Secrets';

import BackgroundGeoLocation from "./src/services/BackgroundGeoLocation";

export class App extends React.Component {

  state = {
    appIsReady: false,
  };

  componentWillMount() {
    try {
      BackgroundGeoLocation.mount();
      this._loadAsyncJobs( ()=> {
        this.setState({ appIsReady: true });
      });
    } catch (e) {
      console.warn('Error on load AsyncJobs ', e);
    }
  }


  render() {
    if(this.state.appIsReady){
      Store.instance = configureStore()
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

  async _loadAsyncJobs(onComplete) {
    await AsyncStorage.getItem("@HermesDelivery:key", (err, response) => {
      Secrets.key = response
    });
    // on complete All Tasks
    onComplete()
  }
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
