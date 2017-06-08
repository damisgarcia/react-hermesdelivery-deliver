import React from 'react';

import {
  BackAndroid,
  Text
} from 'react-native';

import {
  Button,
} from 'native-base';

import { connect } from 'react-redux';
import NavigationStyle from '../constants/NavigationStyle';

import bindActions from '../actions/index';

import HomeScreen from '../screens/HomeScreen';

class HomeScreenContainer extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    console.log(navigation, screenProps)
    return {
    ...NavigationStyle,
    title: "Pedidos",
    headerLeft: null,
    headerRight:  (
      <Button onPress={ _=> navigation.state.params.actions.logout() }>
        <Text style={ styles.textBtn }>Sair</Text>
      </Button>
    )
  }
}

  handleBackPress = () => {
    return true
  }

  componentDidMount(){
    this.props.navigation.setParams({ actions: this.props.actions });
    BackAndroid.addEventListener('hardwareBackPress', this.handleBackPress);
  }

  componentWillUnmount(){
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  render() {
    return (
      <HomeScreen {...this.props} />
    );
  }

  _renderRight() {
    return(
      <Button onPress={ _=> this.props.actions.logout() }>
        <Text>Sair</Text>
      </Button>
    )
  }
};

const styles = {
  textBtn: {
    color: 'white'
  }
}


function mapStateToProps(state) {
  return {
    state: state
  }
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActions(dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreenContainer);
