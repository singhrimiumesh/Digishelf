import { createContext, useContext, useState } from "react";
import {
  registerUser,
  loginUser,
  addToReadingList,
  updateBookProgress,
  removeFromReadingList,
} from "../API/api";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const [user, setUser]             = useState(null);
  const [readingList, setReadingList] = useState([]);
  const [authError, setAuthError]   = useState("");

  // ── REGISTER ──
  const register = async (formData) => {
    setAuthError("");
    const data = await registerUser(formData);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser({ name: data.name, email: data.email });
      setReadingList(data.readingList || []);
      return true;
    } else {
      setAuthError(data.message || "Registration failed");
      return false;
    }
  };

  // ── LOGIN ──
  const login = async (formData) => {
    setAuthError("");
    const data = await loginUser(formData);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setUser({ name: data.name, email: data.email });
      setReadingList(data.readingList || []);
      return true;
    } else {
      setAuthError(data.message || "Login failed");
      return false;
    }
  };

  // ── LOGOUT ──
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setReadingList([]);
  };

  // ── ADD BOOK ──
  const addBook = async (book) => {
    const updated = await addToReadingList(book);
    if (Array.isArray(updated)) setReadingList(updated);
  };

  // ── UPDATE PROGRESS ──
  const updateProgress = async (bookId, progress) => {
    const updated = await updateBookProgress(bookId, progress);
    if (Array.isArray(updated)) setReadingList(updated);
  };

  // ── REMOVE BOOK ──
  const removeBook = async (bookId) => {
    const updated = await removeFromReadingList(bookId);
    if (Array.isArray(updated)) setReadingList(updated);
  };

  return (
    <LibraryContext.Provider
      value={{
        user, login, register, logout,
        readingList, addBook, updateProgress, removeBook,
        authError,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  return useContext(LibraryContext);
}