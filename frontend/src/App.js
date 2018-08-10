import React, { Component } from 'react';
import './App.css';
import { Navbar } from './components/navbar';
import Logs from './components/logs';
import Footer from './components/footer';
import Archive from './components/archive';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Register from './components/register';
import Login from './components/login';
import { logout, setToken, getUsername, loggedIn } from './services/auth.service';
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null
    }
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  componentWillMount() {
    if (loggedIn()) {
      this.setState({ username: getUsername() })
    } else {
      // this.props.history.push('/login');
    }
  }

  login(username, password) {
    fetch('/api/auth/login', {
      method: 'post', body: JSON.stringify({ username: username, password: password }), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(result => {
        setToken(result.jwt);
        this.setState({ username: getUsername() });
      }).catch(e => {
        console.log(e);
      });
  };

  logout() {
    logout();
    this.setState({ username: null });
  }

  render() {
    return (
      <div>
        <Router>
          <div className="App">
            <Navbar username={this.state.username} logout={this.logout} />
            <div className="container">
              <Route path="/" exact={true} component={Logs} />
              <Route path="/logs" render={(props) => <Logs {...props} username={this.state.username} />} />
              <Route path="/archive"
                render={(props) => <Archive {...props} username={this.state.username} />} />
              <Route path="/register" render={(props) => <Register {...props} username={this.state.username} />} />
              <Route path="/login" render={(props) => <Login {...props} login={this.login} username={this.state.username} />} />
            </div >
          </div >
        </Router>
        <Footer className="mt-5" />
      </div>
    );
  }
}

export default App;
