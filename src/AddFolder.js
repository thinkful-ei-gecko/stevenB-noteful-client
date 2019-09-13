import React, { Component } from "react";
import ApiContext from "./ApiContext";
import config from "./config";
import cuid from "cuid";

export default class AddFolder extends Component {
  state = {
    name: ''
  }

  static contextType = ApiContext;

  handleAddFolder = (e) => {
    e.preventDefault();
    console.log(this.state.name);

    const newFolder = {
      id: cuid(),
      name: this.state.name
    };
    console.log(newFolder)

    fetch(`${config.API_ENDPOINT}/folders`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(newFolder)
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.addFolder(newFolder);
        this.props.history.push('/');
      })
      .catch(error => {
        console.error({ error });
      });
  };

  render() {
    return (
      <form onSubmit={e => this.handleAddFolder(e)}>
        <div>
          <label htmlFor="folderName">New Folder Name: </label>
          <input type="text" id="folderName" value={this.state.folderName} defaultValue="NewFolder" onChange={e => this.setState({name: e.target.value})} />
          <button type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
