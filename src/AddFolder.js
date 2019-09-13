import React, { Component } from 'react';
import ApiContext from './ApiContext';
import config from './config';

export default class AddFolder extends Component {

    static contextType = ApiContext;

    handleAddFolder = e => {
        e.preventDefault();
        const noteId = this.props.id
    
        fetch(`${config.API_ENDPOINT}/folders`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
        })
          .then(res => {
            if (!res.ok)
              return res.json().then(e => Promise.reject(e))
            return res.json()
          })
          .then(() => {
            this.context.addFolder(noteId)
          })
          .catch(error => {
            console.error({ error })
          })
      }

    render() {
        return (
            <form onSubmit={e => this.handleAddFolder(e.target.value)}>
                <div>
                    <label htmlFor='folderName'>New Folder Name: </label>
                    <input type='text' id='folderName' defaultValue='NewFolder' />
                </div>
            </form>
        )
    }
}