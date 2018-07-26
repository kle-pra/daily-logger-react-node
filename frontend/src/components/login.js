import React, { Component } from 'react'

export default class Login extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-4">

            <label>Current Password</label>
            <div className="form-group pass_show">
              <input type="password" value="faisalkhan@123" className="form-control" placeholder="Current Password" />
            </div>
            <label>New Password</label>
            <div className="form-group pass_show">
              <input type="password" value="faisal.khan@123" className="form-control" placeholder="New Password" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
