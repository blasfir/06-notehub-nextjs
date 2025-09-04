"use client";

import css from "./NoteDetailsClient.module.css"
import type { Note } from '../../types/note';

interface NoteDetailsClientProps {
    note: Note;
}

export default function NoteDetailsClient({ note }: NoteDetailsClientProps) {
    return(
        <div className={css.container}>
	        <div className={css.item}>
	            <div className={css.header}>
                    <h2>{note.title}</h2>
	            </div>
                <p className={css.content}>{note.content}</p>
	            <p className={css.date}>{note.createdAt}</p>
	        </div>
        </div>
    )
}