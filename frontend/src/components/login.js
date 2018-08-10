import React, { Component } from 'react'
import { loggedIn } from '../services/auth.service'
import { Redirect, Link } from 'react-router-dom'

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
    this.props.login(this.state.username, this.state.password);
  }

  render() {
    if (this.props.username) {
      return (
        <Redirect to="/" />
      );
    }

    return (
      <div className="container">
        <h4 className="mt-3">Login</h4>
        <p>Please login to star using this app or <b>register</b> <Link to="/register">here</Link>
        </p>
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
