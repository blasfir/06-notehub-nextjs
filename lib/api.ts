import axios from "axios";
import type { Note, NewNote } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface NOTEHUBResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  page: number = 1,
  perPage: number = 12,
  search: string = ""
): Promise<NOTEHUBResponse> => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
    params: {
      page,
      perPage, 
      ...(search ? { search } : {}),
    },
  };

  const response = await axios.get<NOTEHUBResponse>(BASE_URL, config);
  return response.data;
};


export const createNote = async (note: NewNote): Promise<Note> => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.post<Note>(BASE_URL, note, config);
  return response.data;
};

export interface dN {
  note: Note;
}

export const deleteNote = async (id: string): Promise<Note> => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.delete<dN>(`${BASE_URL}/${id}`, config);
  return response.data.note;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const config = {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };
  const response = await axios.get<Note>(`${BASE_URL}/${id}`, config);
  return response.data;
};

