//client/components/Home.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom'
import { Button } from 'react-bootstrap';
import { removeFromStorage, getFromStorage, setInStorage} from '../utils/storage';
import queryString from 'query-string';


export default class Home extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token:null,
      refferal: null,
      discordUser: null
    };


    this.loginWithDiscord = this.loginWithDiscord.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const parsed = queryString.parse(location.search);
    const obj = getFromStorage('sbme');

    if (parsed.referral) {
      setInStorage('sbme_ref',{referralCode: parsed.referral});
    }

    if (obj && obj.token) {
      const { token } = obj;
      fetch('/api/discord/login/check?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {

            axios.get(`/api/discord/user?id=${json.message}`)
              .then(response => {
                this.setState({
                  discordUser: response.data,
                  token: json.message,
                  isLoading: false});
              });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }



  loginWithDiscord(){
    const referral = getFromStorage('sbme_ref');
    fetch(`/api/discord?ref=${refferal.referralCode}`)
    .then(res => res.json())
    .then(json => {
      setInStorage('sbme', {token: json.token});
      window.location.replace(json.redirect);
    });
  }

  logout(){
    removeFromStorage('sbme')
    // window.location.replace("https://slimebots.io");
  }


  render() {

    const {
      isLoading,
      token,
      discordUser
    } = this.state;


    if (isLoading) {
       return (<div><p>Loading...</p></div>);
     }else if (!discordUser) {
       return(
       <div>
       <Button onClick={this.loginWithDiscord} variant="primary" size="lg">Login</Button>
       <Button onClick={this.logout} variant="danger" size="lg">Logout</Button>
       <Link to="/control-panel"> <Button  variant="warning" size="lg">Control Panel</Button> </Link>
       </div>
     )
     }else{

    return(
      <div>
      <Button onClick={this.loginWithDiscord} variant="primary" size="lg">Login</Button>
      <Button onClick={this.logout} variant="danger" size="lg">Logout</Button>
      <Link to="/control-panel"> <Button  variant="warning" size="lg">Control Panel</Button> </Link>
      <div className="card border-dark mb-3" style={{maxHeight: '18rem',maxWidth:'18rem'}}>
        <div className="card-header">State Variables</div>
        <div className="card-body text-dark">
        <ul className="list-group list-group-flush">
          <li className="list-group-item"> <span>isLoading:</span> <span dangerouslySetInnerHTML={{__html: isLoading}}></span></li>
          <li className="list-group-item"> <span>token:</span> <span dangerouslySetInnerHTML={{__html: token}}></span></li>
          <li className="list-group-item"> <span>username:</span> <span dangerouslySetInnerHTML={{__html: discordUser.username}}></span></li>
          <li className="list-group-item"> <span>verified:</span> <span dangerouslySetInnerHTML={{__html: discordUser.verified}}></span></li>
          <li className="list-group-item"> <span>locale:</span> <span dangerouslySetInnerHTML={{__html: discordUser.locale}}></span></li>
          <li className="list-group-item"> <span>premium_type:</span> <span dangerouslySetInnerHTML={{__html: discordUser.premium_type}}></span></li>
          <li className="list-group-item"> <span>mfa_enabled:</span> <span dangerouslySetInnerHTML={{__html: discordUser.mfa_enabled}}></span></li>
          <li className="list-group-item"> <span>id:</span> <span dangerouslySetInnerHTML={{__html: discordUser.id}}></span></li>
          <li className="list-group-item"> <span>flags:</span> <span dangerouslySetInnerHTML={{__html: discordUser.flags}}></span></li>
          <li className="list-group-item"> <span>avatar:</span> <span dangerouslySetInnerHTML={{__html: discordUser.avatar}}></span></li>
          <li className="list-group-item"> <span>discriminator:</span> <span dangerouslySetInnerHTML={{__html: discordUser.discriminator}}></span></li>
          <li className="list-group-item"> <span>email:</span> <span dangerouslySetInnerHTML={{__html: discordUser.email}}></span></li>
        </ul>
        </div>
        </div>
      </div>
    )
}
  }

}
