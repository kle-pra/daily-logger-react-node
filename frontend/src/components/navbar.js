import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link to="/">Daily Logger</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              {this.props.username ? <li className="nav-item">
                <Link className="nav-link" to="/archive">Archive</Link>
              </li> : null}
            </ul>
            <ul className="navbar-nav ml-auto">
              {!this.props.username ? <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li> : null}
              {this.props.username ? <li onClick={this.props.logout} className="nav-item">
                <a onClick={this.logout} className="nav-link" >Logout {"(" + this.props.username + ")"}</a>
              </li> : null}
              {!this.props.username ? <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
              </li> : null}
            </ul>

          </div>

        </div>
      </nav>
    );
  }

}

export default Navbar
