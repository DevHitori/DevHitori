//client/routes.js
import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom';
import App from './components/app';
import Lwd from './components/LWD';

class Routes extends Component {

 render() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/login' component={Lwd} />
      </Switch>
    </div>
    )
  }
}
export default Routes;
