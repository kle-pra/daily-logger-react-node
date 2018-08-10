import React, { Component } from 'react'
import AddLog from './add-log';
import { loggedIn, getToken } from '../services/auth.service';

export default class Logs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: []
    }
    this.getLogs = this.getLogs.bind(this);
    this.addLog = this.addLog.bind(this);
    this.deleteLog = this.deleteLog.bind(this);
  }

  componentWillUpdate() {
    if (!loggedIn())
      this.props.history.replace('/login');
  }

  componentWillMount() {
    if (!loggedIn())
      this.props.history.replace('/login');
  }

  componentDidMount() {
    this.getLogs();
  }

  getLogs() {
    const jwt = getToken();
    fetch('api/logs?date=' + new Date().toDateString(), {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer ' + jwt
      })
    })
      .then(response => response.json())
      .then(logsJson => {
        this.setState({
          logs: logsJson
        })
      }).catch(e => {
        console.log(e);
      });
  }

  addLog(log) {
    const jwt = getToken();
    fetch('api/logs', {
      method: 'post', body: JSON.stringify(log), headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + jwt
      },
    }).then(response => response.json())
      .then(log => {
        const logs = this.state.logs;
        logs.push(log);

        this.setState({
          logs: logs
        })
      }).catch(e => {
        console.log(e);
      });
  }

  deleteLog(id) {
    const jwt = getToken();
    fetch('api/logs/' + id, {
      method: 'delete',
      headers: {
        'Authorization': 'Bearer ' + jwt
      },
    }).then(response => response)
      .then(() => {
        const logs = this.state.logs.filter(log => log._id !== id);
        this.setState({
          logs: logs
        })
      }).catch(e => {
        console.log(e);
      });
  }

  render() {
    let logs = (<ul className="list-group">
      {this.state.logs.map((log, i) => {
        return (
          <li key={i} className="list-group-item">{log.title}
            <button onClick={
              () => this.deleteLog(log._id)
            } className="float-right btn btn-danger btn-sm">X</button>
          </li>
        )
      }
      )}</ul>);

    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <AddLog addLog={this.addLog} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {logs}
          </div>
        </div>
      </div>
    )
  }
}