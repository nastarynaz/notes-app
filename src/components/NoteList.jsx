import React from 'react';
import NoteItem from './NoteItem';
import { showFormattedDate } from '../utils';

function NoteList({ notes, onDelete, onArchive }) {
    return (
        <div className='notes-list'>
            {
                notes.map((note) => (
                    <NoteItem
                    key={note.id}
                    id={note.id}
                    onDelete ={onDelete}
                    onArchive={onArchive}
                    isArchived={note.archived}
                    {...note} />
                ))
            }
        </div>
    );
}

export default NoteList;