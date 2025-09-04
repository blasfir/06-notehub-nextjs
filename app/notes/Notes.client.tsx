"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import SearchBox from "../../components/SearchBox/SearchBox";
import Modal from "../../components/Modal/Modal";
import NoteForm from "../../components/NoteForm/NoteForm";
import css from "./page.module.css";
import { useDebounce } from "use-debounce";
import { fetchNotes } from "../../lib/api";
import type { NOTEHUBResponse } from "../../lib/api";
import type { Note } from "../../types/note";

export default function Notes() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery<NOTEHUBResponse>({
    queryKey: ["notes", page, debouncedSearch],
    queryFn: () => fetchNotes(page, 12, debouncedSearch),
    placeholderData: (prevData) => prevData,
  });

  useEffect(() => {
    if (data?.totalPages !== undefined) {
      setPageCount(data.totalPages);
    }
  }, [data]);

  const notes: Note[] = data?.notes || [];

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSearchChange = (newSearch: string) => {
    setPage(1);
    setSearch(newSearch);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />
        {pageCount > 1 && (
          <Pagination
            currentPage={page}
            onPageChange={setPage}
            pageCount={pageCount}
          />
        )}
        <button className={css.button} onClick={openModal} type="button">
          Create note +
        </button>
      </header>

      {isLoading && <strong>Loading...</strong>}
      {notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onSuccess={closeModal} onCancel={closeModal} />
        </Modal>
      )}
    </div>
  );
}

