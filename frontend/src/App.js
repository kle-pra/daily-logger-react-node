import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components/navbar';
import Logs from './components/logs';
import Archive from './components/archive';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import Register from './components/register';
import Login from './components/login';
class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route path="/" exact={true} component={Logs} />
            <Route path="/logs" component={Logs} />
            <Route path="/archive" component={Archive} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
          </div >
        </div >
      </Router>
    );
  }
}

export default App;
