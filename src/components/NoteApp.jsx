import React from 'react';
import NoteList from './NoteList';
import { getInitialData } from '../utils';
import NoteInput from './NoteInput';

class NoteApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: getInitialData(),
            searchQuery: ''

        }
        this.onAddNoteHandler = this.onAddNoteHandler.bind(this);
        this.onDeleteHandler = this.onDeleteHandler.bind(this);
        this.onArchiveHandler = this.onArchiveHandler.bind(this);
        this.onSearchHandler = this.onSearchHandler.bind(this);

    }
    onDeleteHandler(id) {
        const notes = this.state.notes.filter(note => note.id !== id);
        this.setState({ notes });
    }
    onAddNoteHandler({ title, body }) {
        this.setState((prevState) => {
            return {
                notes: [
                    ...prevState.notes,
                    {
                        id: +new Date(),
                        createdAt: new Date().toISOString(),
                        title,
                        body,
                        archived: false
                    }
                ]
            }
        });
    }
    onArchiveHandler(id){
        this.setState((prevState) => ({
            notes: prevState.notes.map((note) =>
            note.id === id ? {...note, archived: !note.archived} : note)
        }));
    }
    onSearchHandler(event){
        this.setState({ searchQuery: event.target.value })
    }

    render () {
        const { notes, searchQuery } = this.state;
        
        const filteredNotes = notes.filter((note) => 
            note.title.toLowerCase().includes(searchQuery.toLowerCase()));
        
        const activeNotes = filteredNotes.filter(note => !note.archived);
        const archivedNotes = filteredNotes.filter(note => note.archived);
        
        return (
            <div className='note-app'>
                <header className='notes-app__header'>
                    <h1>Notes</h1>
                    <div className='note-search'>
                        <input type="text" placeholder='Cari catatan...' onChange={this.onSearchHandler}/>
                    </div>
                </header>
                <main className='note-app__body'>
                    <div className='note-input'>
                        <h2>Buat Catatan</h2>
                        <NoteInput addNote={this.onAddNoteHandler} />
                    </div>

                    <h2>Catatan Aktif</h2>
                    {activeNotes.length > 0 ? (
                        <NoteList
                        notes={activeNotes} 
                        onDelete={this.onDeleteHandler} 
                        onArchive={this.onArchiveHandler} />
                    ) : (
                        <div className='note-list__empty-message'>Tidak ada catatan.</div>
                    )}
                    <h2>Arsip</h2>
                    {archivedNotes.length > 0 ? (
                        <NoteList
                        notes={archivedNotes}
                        onDelete={this.onDeleteHandler}
                        onArchive={this.onArchiveHandler} />
                    ) : (
                        <div className='note-list__empty-message'>Tidak ada catatan.</div>
                    )}
                </main>
            </div>
        );
    }
}

export default NoteApp;