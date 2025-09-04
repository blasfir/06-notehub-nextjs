"use client";

import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from "../../lib/api";
import Link from 'next/link';


interface NoteListProps {
    notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: deleteNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notes"], exact: false });
        },
    });

    
  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <Link href={`/notes/${note.id}`} className={css.vdbutton}>View details</Link>
            <button className={css.button} onClick={() => deleteMutation.mutate(note.id)} disabled={deleteMutation.status === 'pending'}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

