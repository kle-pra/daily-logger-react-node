import React, { Component } from 'react'

export default class AddLog extends Component {

  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { title: "" };
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const log = { title: this.state.title }
    this.props.addLog(log);
    this.setState({
      title: ""
    });
  }

  render() {
    return (
      <div className="mt-4">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" name="title" value={this.state.title} onChange={this.handleTitleChange} placeholder="Enter new log" />
          </div>
        </form>
      </div>
    )
  }
}
