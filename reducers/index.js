import { combineReducers } from 'redux';

import nav from './nav';
import orders from './orders';
import params from './params';

export default combineReducers({orders, nav, params});
