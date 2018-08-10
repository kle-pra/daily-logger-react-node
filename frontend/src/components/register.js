import React, { Component } from 'react'

export default class Register extends Component {
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

    fetch('/api/auth/register', {
      method: 'post', body: JSON.stringify({ username: this.state.username, password: this.state.password }), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(result => {
        console.log(result);
      }).catch(e => {
        console.log(e);
      });
  }

  render() {
    return (
      <div className="container">
        <h4 className="mt-3">Registration</h4>
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
