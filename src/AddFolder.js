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

  validateFolderName = () => {
    let folderName = this.state.name;

    if (!folderName) {
        return 'Folder name is required'
    } else {
        return null
    }
}

  render() {
    return (
      <form onSubmit={e => this.handleAddFolder(e)}>
        <div>
          <label htmlFor="folderName">New Folder Name: </label>
          <input type="text" id="folderName" value={this.state.name} defaultValue="NewFolder" onChange={e => this.setState({name: e.target.value})} />
          {this.validateFolderName && <p>{this.validateFolderName()}</p>}
          <button disabled={this.validateFolderName} type="submit">Submit</button>
        </div>
      </form>
    );
  }
}
