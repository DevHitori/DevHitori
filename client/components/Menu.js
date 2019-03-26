//client/components/Add.js
import React from 'react'
import {Link, withRouter} from 'react-router-dom'
var querystring = require('querystring');
const Menu = withRouter(({history}) => (
  <div>
      <Link to="/">
          <h1>Home</h1>
      </Link>
      <Link to="/Projects">
        <h1>Projects</h1>
      </Link>
    </div>
))

export default Menu
