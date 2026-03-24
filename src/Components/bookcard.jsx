import { Link } from "react-router-dom";
import "./BookCard.css";

export default function BookCard({ book }) {
  return (
    <Link to={`/book/${book.id}`} className="book-card">
      <div className="book-cover">
        <img src={book.cover} alt={book.title} />
        <span className={`availability ${book.available ? "yes" : "no"}`}>
          {book.available ? "Available" : "Borrowed"}
        </span>
      </div>
      <div className="book-info">
        <p className="book-category">{book.category}</p>
        <h3 className="book-title">{book.title}</h3>
        <p className="book-author">{book.author}</p>
      </div>
    </Link>
  );
}