import { useState } from "react";
import { useLibrary } from "../context/librarycontext";
import "./Profile.css";

export default function Profile() {
  const { user, readingList, updateProgress, removeBook } = useLibrary();
  const [editing, setEditing] = useState(null);
  const [pagesInput, setPagesInput] = useState("");
  const [inputError, setInputError] = useState("");

  const currentlyReading = readingList.filter((b) => b.status === "reading");
  const completed = readingList.filter((b) => b.status === "completed");

  const pagesRead = readingList.reduce(
    (sum, b) => sum + Math.floor(((b.progress || 0) / 100) * (b.pages || 0)), 0
  );

  const startEdit = (book) => {
    setEditing(book.id);
    const currentPages = Math.floor((book.progress / 100) * book.pages);
    setPagesInput(String(currentPages));
    setInputError("");
  };

  const saveProgress = (book) => {
    const pages = parseInt(pagesInput);
    if (isNaN(pages) || pages < 0) {
      setInputError("Enter a valid page number.");
      return;
    }
    if (pages > book.pages) {
      setInputError(`Max pages is ${book.pages}.`);
      return;
    }
    const percent = Math.round((pages / book.pages) * 100);
    updateProgress(book.id, percent);
    setEditing(null);
    setInputError("");
  };

  return (
    <div className="profile-page">

      {/* ── USER CARD ── */}
      <div className="profile-hero">
        <div className="profile-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <div className="profile-info">
          <h1>{user?.name}</h1>
          <p className="profile-email">📧 {user?.email}</p>
          <p className="profile-joined">📅 Member since {user?.joinDate}</p>
        </div>
        <div className="profile-summary-stats">
          <div className="pstat">
            <strong>{readingList.length}</strong>
            <span>Total Books</span>
          </div>
          <div className="pstat-div" />
          <div className="pstat">
            <strong>{currentlyReading.length}</strong>
            <span>Reading</span>
          </div>
          <div className="pstat-div" />
          <div className="pstat">
            <strong>{completed.length}</strong>
            <span>Completed</span>
          </div>
          <div className="pstat-div" />
          <div className="pstat">
            <strong>{pagesRead.toLocaleString()}</strong>
            <span>Pages Read</span>
          </div>
        </div>
      </div>

      {/* ── CURRENTLY READING ── */}
      <section className="profile-section">
        <h2 className="profile-section-title">
          <span>📖</span> Currently Reading
          <em>{currentlyReading.length} books</em>
        </h2>

        {currentlyReading.length === 0 ? (
          <div className="empty-state">
            No books in progress yet.{" "}
            <a href="/home">Browse subjects</a> to start reading!
          </div>
        ) : (
          <div className="reading-list">
            {currentlyReading.map((book) => {
              const pagesReadForBook = Math.floor((book.progress / 100) * book.pages);
              const pagesLeft = book.pages - pagesReadForBook;

              return (
                <div className="reading-card" key={book.id}>

                  {/* Top row */}
                  <div className="reading-card-top">
                    <div className="reading-card-info">
                      <span className="reading-cat">{book.category}</span>
                      <h3>{book.title}</h3>
                      <p>{book.author} · {book.pages} pages total</p>
                      <p className="reading-date">Started: {book.startDate}</p>
                    </div>
                    <div className="progress-circle">
                      <svg viewBox="0 0 36 36">
                        <path
                          className="circle-bg"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831
                             a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="circle-fill"
                          strokeDasharray={`${book.progress}, 100`}
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831
                             a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span>{book.progress}%</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="progress-bar-wrap">
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${book.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Pages info row */}
                  <div className="pages-info-row">
                    <span className="pages-chip read">
                      ✅ {pagesReadForBook} pages read
                    </span>
                    <span className="pages-chip left">
                      📄 {pagesLeft} pages left
                    </span>
                    <span className="pages-chip total">
                      📚 {book.pages} total
                    </span>
                  </div>

                  {/* Edit mode */}
                  {editing === book.id ? (
                    <div className="edit-progress">
                      <div className="edit-input-wrap">
                        <label>Pages read so far</label>
                        <div className="edit-input-row">
                          <input
                            type="number"
                            min="0"
                            max={book.pages}
                            value={pagesInput}
                            onChange={(e) => {
                              setPagesInput(e.target.value);
                              setInputError("");
                            }}
                            placeholder={`0 – ${book.pages}`}
                          />
                          <span className="edit-total">/ {book.pages}</span>
                        </div>
                        {inputError && (
                          <p className="input-error">⚠ {inputError}</p>
                        )}
                        {pagesInput && !isNaN(parseInt(pagesInput)) && (
                          <p className="input-preview">
                            = {Math.round((parseInt(pagesInput) / book.pages) * 100)}% complete
                          </p>
                        )}
                      </div>
                      <div className="edit-actions">
                        <button className="save-btn" onClick={() => saveProgress(book)}>
                          Save Progress
                        </button>
                        <button className="cancel-btn" onClick={() => setEditing(null)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="card-actions">
                      <button className="update-btn" onClick={() => startEdit(book)}>
                        ✏ Update Pages Read
                      </button>
                      <button className="remove-btn" onClick={() => removeBook(book.id)}>
                        Remove
                      </button>
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── COMPLETED BOOKS ── */}
      <section className="profile-section">
        <h2 className="profile-section-title">
          <span>✅</span> Completed Books
          <em>{completed.length} books</em>
        </h2>

        {completed.length === 0 ? (
          <div className="empty-state">
            No completed books yet. Keep reading! 💪
          </div>
        ) : (
          <div className="completed-list">
            {completed.map((book, i) => (
              <div className="completed-card" key={book.id}>
                <div className="completed-num">0{i + 1}</div>
                <div className="completed-info">
                  <h3>{book.title}</h3>
                  <p>{book.author} · {book.pages} pages</p>
                </div>
                <div className="completed-badge">✓ Done</div>
                <button
                  className="remove-btn"
                  onClick={() => removeBook(book.id)}
                >✕</button>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}