import React from 'react';
import NoteItemBody from './NoteItemBody';
import NoteItemAction from './NoteItemAction';

function NoteItem({ title, createdAt, body, id, onDelete, onArchive, isArchived }) {
    return (
        <div className='note-item'>
            <NoteItemBody title={title} createdAt={createdAt} body={body}/>
            <NoteItemAction id={id} onDelete={onDelete} onArchive={onArchive} isArchived={isArchived} />
        </div>
        
    );
}

export default NoteItem;