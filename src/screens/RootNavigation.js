import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import {
  StackNavigator,
  addNavigationHelpers,
} from 'react-navigation';

import LoginScreenContainer from '../containers/LoginScreenContainer';
import HomeScreenContainer from '../containers/HomeScreenContainer';
import OrderScreenContainer from '../containers/OrderScreenContainer';

export const RootNavigation = StackNavigator({
  Login: { screen: LoginScreenContainer },
  Home:  { screen: HomeScreenContainer },
  Order: { screen: OrderScreenContainer },
});


const AppWithNavigationState = ({ dispatch, nav }) => (
  <RootNavigation navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);
