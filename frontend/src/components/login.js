import React, { Component } from 'react'
import { setToken, loggedIn } from '../services/auth.service'

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      passowed: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    if (loggedIn())
      this.props.history.replace('/');
  }

  handleUsernameChange(e) {
    this.setState({
      'username': e.target.value
    });
  }

  handlePasswordChange(e) {
    this.setState({
      'password': e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('fds');

    fetch('/api/auth/login', {
      method: 'post', body: JSON.stringify({ username: this.state.username, password: this.state.password }), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(result => {
        setToken(result.jwt);
        this.props.history.replace('/');
      }).catch(e => {
        console.log(e);
      });
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <form onSubmit={this.handleSubmit}>
              <label>Username</label>
              <div className="form-group pass_show">
                <input onChange={this.handleUsernameChange} type="text" className="form-control" />
              </div>
              <label>Password</label>
              <div className="form-group pass_show">
                <input onChange={this.handlePasswordChange} type="password" className="form-control" />
              </div>
              <input type="submit" className="btn btn-success" />
            </form>
          </div>
        </div>
      </div>
    )
  }
}
