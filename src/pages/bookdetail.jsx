import { useParams, Link } from "react-router-dom";
import { books } from "../data/books";
import "./bookdetails.css";

export default function BookDetail() {
  const { id } = useParams();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) return <div className="not-found">Book not found. <Link to="/browse">Go back</Link></div>;

  return (
    <div className="detail-page">
      <Link to="/browse" className="back-link">← Back to Browse</Link>
      <div className="detail-container">
        <div className="detail-cover">
          <img src={book.cover} alt={book.title} />
        </div>
        <div className="detail-info">
          <p className="detail-category">{book.category}</p>
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">by {book.author}</p>
          <p className="detail-description">{book.description}</p>
          <div className="detail-meta">
            <span>📄 {book.pages} pages</span>
            <span>📅 {book.year}</span>
            <span className={book.available ? "avail yes" : "avail no"}>
              {book.available ? "✅ Available" : "❌ Borrowed"}
            </span>
          </div>
          <button className={`borrow-btn ${!book.available ? "disabled" : ""}`} disabled={!book.available}>
            {book.available ? "Borrow This Book" : "Currently Unavailable"}
          </button>
        </div>
      </div>
    </div>
  );
}