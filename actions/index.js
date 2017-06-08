import { bindActionCreators } from 'redux';

import * as login  from "./login";
import * as orders from "./order";
import * as utils  from "./utils";

export default function(dispatch){
  return bindActionCreators(Object.assign({}, login, orders, utils), dispatch)
}
