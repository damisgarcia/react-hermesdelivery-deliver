import React from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NavigationStyle from '../constants/NavigationStyle';

import bindActions from '../actions/index';

import LoginScreen from '../screens/LoginScreen';

class LoginScreenContainer extends React.Component {
  static navigationOptions = { ...NavigationStyle,  title: "Login" };

  render() {
    return (
      <LoginScreen {...this.props} />
    );
  }
};

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreenContainer);
