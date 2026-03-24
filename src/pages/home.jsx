import { useNavigate } from "react-router-dom";
import { featuredBooks, subjects } from "../data/books";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">

      {/* ── ABOUT SECTION ── */}
      <section className="about-section">
        <div className="about-bg-text">DigiShelf</div>
        <div className="about-content">
          <div className="about-left">
            <p className="section-label">About The Library</p>
            <h2 className="about-title">A Digital Archive Built<br />for <span>Engineers & Thinkers</span></h2>
            <p className="about-desc">
              DigiShelf Digital Library is a curated collection of over 12,000 technical books,
              research papers, and learning resources. From foundational computer science to
              cutting-edge AI — every resource is organized, searchable, and accessible 24/7.
            </p>
            <p className="about-desc">
              Whether you're a student cracking your first algorithm or a senior engineer
              exploring distributed systems — Lexicon has the knowledge you need, when you need it.
            </p>
            <div className="about-features">
              <div className="feature-item"><span>✦</span> 12,000+ curated books</div>
              <div className="feature-item"><span>✦</span> 50+ technical subjects</div>
              <div className="feature-item"><span>✦</span> Free access, always</div>
              <div className="feature-item"><span>✦</span> New titles every week</div>
            </div>
          </div>
          <div className="about-right">
            <div className="about-card-stack">
              <div className="acard acard1">📘 12,450<span>Total Books</span></div>
              <div className="acard acard2">🧑‍🎓 3,200+<span>Active Readers</span></div>
              <div className="acard acard3">📂 50+<span>Subjects</span></div>
              <div className="acard acard4">⭐ 4.8<span>Avg Rating</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BOOKS ── */}
      <section className="books-section">
        <div className="section-header">
          <p className="section-label">Handpicked For You</p>
          <h2 className="section-title">Featured Books</h2>
        </div>
        <div className="books-grid">
          {featuredBooks.map((book) => (
            <div className="book-card" key={book.id}>
              <div className="book-cover">
                <img src={book.cover} alt={book.title} />
                <div className="book-overlay">
                  <button className="read-btn">Read Now</button>
                </div>
              </div>
              <div className="book-meta">
                <span className="book-cat">{book.category}</span>
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <div className="book-rating">
                  {"★".repeat(Math.floor(book.rating))}
                  <span> {book.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── TECHNICAL SUBJECTS ── */}
      <section className="subjects-section">
        <div className="section-header">
          <p className="section-label">Explore By Topic</p>
          <h2 className="section-title">Technical Subjects</h2>
        </div>
        <div className="subjects-grid">
          {subjects.map((sub) => (
            <div
              className="subject-card"
              key={sub.id}
              onClick={() => navigate(`/browse/${sub.id}`)}
            >
              <div className="sub-icon">{sub.icon}</div>
              <div className="sub-info">
                <h3>{sub.label}</h3>
                <p>{sub.desc}</p>
              </div>
              <div className="sub-count">{sub.count} books</div>
              <div className="sub-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}