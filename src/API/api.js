const BASE = "http://localhost:5000/api";

const getHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const registerUser = (data) =>
  fetch(`${BASE}/auth/register`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const loginUser = (data) =>
  fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then((r) => r.json());

export const getProfile = () =>
  fetch(`${BASE}/auth/profile`, {
    headers: getHeaders(),
  }).then((r) => r.json());

export const addToReadingList = (book) =>
  fetch(`${BASE}/auth/reading-list/add`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(book),
  }).then((r) => r.json());

export const updateBookProgress = (bookId, progress) =>
  fetch(`${BASE}/auth/reading-list/progress`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify({ bookId, progress }),
  }).then((r) => r.json());

export const removeFromReadingList = (bookId) =>
  fetch(`${BASE}/auth/reading-list/${bookId}`, {
    method: "DELETE",
    headers: getHeaders(),
  }).then((r) => r.json());

export const getBooks = (subject) =>
  fetch(`${BASE}/books${subject ? `?subject=${subject}` : ""}`, {
    headers: getHeaders(),
  }).then((r) => r.json());