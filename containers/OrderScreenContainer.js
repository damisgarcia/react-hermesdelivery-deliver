import React from 'react';

import { connect } from 'react-redux';
import NavigationStyle from '../constants/NavigationStyle';

import bindActions from '../actions/index';

import OrderScreen from '../screens/OrderScreen';

class OrderScreenContainer extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    ...NavigationStyle,
    title: `${navigation.state.params.order.address.street} - ${navigation.state.params.order.address.number}`,
  })

  render() {
    return (
      <OrderScreen {...this.props} { ...this.navigation } />
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderScreenContainer);
