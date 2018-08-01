import React, { Component } from 'react'

export default class Archive extends Component {

  constructor(props) {
    super(props);

    this.state = {
      logs: []
    }
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleDateChange(e) {
    fetch('api/logs?date=' + e.target.value)
      .then(response => response.json())
      .then(logsJson => {
        this.setState({
          logs: logsJson
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
          </li>
        )
      }
      )}</ul>);

    return (
      <div>
        <p>Search archive for a date</p>
        <div className="row" >
          <div className="col-md-5 mb-3" >
            <input onChange={this.handleDateChange} className="form-control" type="date" />
          </div>
        </div>
        {logs}
      </div>
    )
  }
}
