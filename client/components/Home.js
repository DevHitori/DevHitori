//client/components/Home.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Link, withRouter} from 'react-router-dom'
import { Button, ProgressBar  } from 'react-bootstrap';
import { removeFromStorage, getFromStorage, setInStorage} from '../utils/storage';
import queryString from 'query-string';


export default class Home extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      visits: null,
      unique_visits: null
    };

  }

  async componentDidMount() {
    const obj = getFromStorage('dvhtr_vsts');
    var unique = false;
    if (obj && obj.visited){unique=false}else{
      setInStorage('dvhtr_vsts', {visited: true});
      unique=true;
    }

    axios.get(`/api/visits?unique=${unique}`)
      .then(response => {
        this.setState({
          visits: response.data.visits,
          unique_visits: response.data.unique_visits,
          isLoading: false});
      })
      .catch(error => {
        this.setState({
          visits: -1,
          unique_visits: -1,
          isLoading: false});
        console.log(error)
      });

  }




  render() {

    const {
      visits,
      unique_visits,
      isLoading
    } = this.state;


    if (isLoading) {
       return (<div><p>Loading...</p></div>);
     }else{
       return(
       <div>
       <ProgressBar className="loadingBar"  striped animated now={87} label={`87%`}/>;
       <div className="visits"><h1><i class="fas fa-eye"></i> {visits}</h1></div>
       </div>
     )

  }

}

}
