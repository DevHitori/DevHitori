//client/components/App.js
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add'
import Menu from './Menu';
export default class Lwd extends React.Component {
constructor() {
    super();
  this.state = {selectedMonth:'Jan', selectedYear: 2016, data: []};
    this.getData = this.getData.bind(this);
  }
componentDidMount() {
    this.getData(this, '2016');
  }
  componentWillReceiveProps(nextProps) {
    this.getData(this, '2016');
  }
getData(ev, year){
    axios.get('/getAll?month=All&year='+year)
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedYear: parseInt(year)})
      });
  }
render() {
    return (
      <div>
      <Menu/>
      <h1>Page 2 </h1>
      </div>
    );
  }
}
