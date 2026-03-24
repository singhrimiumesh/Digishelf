import BookCard from "./bookcard";
import "./bookgrid.css";

export default function BookGrid({ books }) {
  if (books.length === 0)
    return <p className="no-results">No books found. Try a different search.</p>;

  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}