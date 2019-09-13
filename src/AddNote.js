import React, { Component } from 'react';
import config from './config';
import ApiContext from './ApiContext';
import cuid from 'cuid';

export default class AddNote extends Component {

    state = {
        name: '',
        content: '',
        folderId: '',
        modified: ''
    }

    static contextType = ApiContext;

    handleAddNote = (e) => {
        e.preventDefault();
        console.log(this.state.name);

        const newNote = {
            id: cuid(),
            name: this.state.name,
            modified: this.state.modified,
            content: this.state.content,
            folderId: this.state.folderId
        };
        console.log(newNote)

        fetch(`${config.API_ENDPOINT}/notes`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(newNote)
        })
            .then(res => {
                if (!res.ok) return res.json().then(e => Promise.reject(e));
                return res.json();
            })
            .then(() => {
                this.context.addNote(newNote);
                this.props.history.push('/');
            })
            .catch(error => {
                console.error({ error });
            });
    };

    validateNoteName = () => {
        let note = this.state.name;

        if (!note) {
            return 'Note name is required'
        } else {
            return null
        }
    }

    validateContent = () => {
        let note = this.state.content;

        if (!note) {
            return 'Note content is required'
        } else {
            return null
        }
    }

    validateFolder = () => {
        let folder = this.state.folderId;

        if (!folder) {
            return 'Note content is required'
        } else {
            return null
        }
    }
 
    render() {
        const { folders } = this.context;

        return (
            <form onSubmit={e => this.handleAddNote(e)}>
                <div>
                    <label htmlFor='noteName'>New Note Name: </label>
                    <input type='text' id='noteName' value={this.state.name} onChange={ e => this.setState({name: e.target.value})} />
                    {this.validateNoteName && <p>{this.validateNoteName()}</p>}
                </div>
                <div>
                    <label htmlFor='noteContent'>Content: </label>
                    <input type='text' id='noteName' value={this.state.content} onChange={ e => this.setState({content: e.target.value})} />
                    {this.validateContent && <p>{this.validateContent()}</p>}
                </div>
                <div>
                    <select name='Choose folder...' value={this.state.folderId} onChange={ e => this.setState({folderId: e.target.value})}>
                        <option key="default" value={null}>Select folder</option>
                        {folders.map((folder) => <option key={folder.id} value={folder.id}>{folder.name}</option>)}
                    </select>
                    {this.validateFolder && <p>{this.validateFolder()}</p>}
                </div>
                <div>
                    <button disabled={this.validateNoteName() || this.validateContent() || this.validateFolder()} type='submit' onClick={ e => this.setState({modified: new Date().toLocaleString()})}>Submit</button>
                </div>
            </form>
        );
    }
}