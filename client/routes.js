//client/routes.js
import React, {Component} from 'react'
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Projects from './components/Projects';

class Routes extends Component {

 render() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/Projects' component={Projects} />
      </Switch>
    </div>
    )
  }
}
export default Routes;
