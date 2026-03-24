import { useParams, useNavigate } from "react-router-dom";
import { subjects } from "../data/books";
import { useLibrary } from "../context/librarycontext";
import "./Browse.css";

const subjectBooks = {
  programming: [
    { id: "p1", title: "Clean Code", author: "Robert C. Martin", year: 2008, pages: 431 },
    { id: "p2", title: "The Pragmatic Programmer", author: "Andrew Hunt", year: 1999, pages: 352 },
    { id: "p3", title: "Code Complete", author: "Steve McConnell", year: 2004, pages: 960 },
    { id: "p4", title: "Head First Java", author: "Kathy Sierra", year: 2005, pages: 688 },
    { id: "p5", title: "Python Crash Course", author: "Eric Matthes", year: 2019, pages: 544 },
    { id: "p6", title: "You Don't Know JS", author: "Kyle Simpson", year: 2015, pages: 278 },
  ],
  dsa: [
    { id: "d1", title: "Introduction to Algorithms", author: "Thomas H. Cormen", year: 2009, pages: 1292 },
    { id: "d2", title: "Data Structures & Algorithms", author: "Michael T. Goodrich", year: 2014, pages: 736 },
    { id: "d3", title: "Grokking Algorithms", author: "Aditya Bhargava", year: 2016, pages: 256 },
    { id: "d4", title: "Algorithm Design", author: "Jon Kleinberg", year: 2005, pages: 838 },
  ],
  webdev: [
    { id: "w1", title: "HTML & CSS", author: "Jon Duckett", year: 2011, pages: 490 },
    { id: "w2", title: "JavaScript: The Good Parts", author: "Douglas Crockford", year: 2008, pages: 176 },
    { id: "w3", title: "Learning React", author: "Alex Banks", year: 2020, pages: 350 },
    { id: "w4", title: "Node.js Design Patterns", author: "Mario Casciaro", year: 2020, pages: 660 },
  ],
  "ai-ml": [
    { id: "a1", title: "Artificial Intelligence", author: "Stuart Russell", year: 2020, pages: 1132 },
    { id: "a2", title: "Deep Learning", author: "Ian Goodfellow", year: 2016, pages: 800 },
    { id: "a3", title: "Hands-On Machine Learning", author: "Aurélien Géron", year: 2019, pages: 856 },
    { id: "a4", title: "Pattern Recognition", author: "Christopher Bishop", year: 2006, pages: 738 },
  ],
  database: [
    { id: "db1", title: "Database System Concepts", author: "Silberschatz", year: 2019, pages: 1376 },
    { id: "db2", title: "Learning SQL", author: "Alan Beaulieu", year: 2020, pages: 340 },
    { id: "db3", title: "MongoDB: The Definitive Guide", author: "Kristina Chodorow", year: 2013, pages: 432 },
  ],
  networking: [
    { id: "n1", title: "Computer Networks", author: "Andrew Tanenbaum", year: 2010, pages: 962 },
    { id: "n2", title: "TCP/IP Illustrated", author: "W. Richard Stevens", year: 1994, pages: 576 },
    { id: "n3", title: "Computer Networking: A Top-Down Approach", author: "Kurose & Ross", year: 2016, pages: 856 },
  ],
  os: [
    { id: "o1", title: "Operating System Concepts", author: "Abraham Silberschatz", year: 2018, pages: 976 },
    { id: "o2", title: "Modern Operating Systems", author: "Andrew Tanenbaum", year: 2014, pages: 1104 },
    { id: "o3", title: "The Linux Command Line", author: "William Shotts", year: 2019, pages: 504 },
  ],
  cybersecurity: [
    { id: "c1", title: "The Web Application Hacker's Handbook", author: "Stuttard & Pinto", year: 2011, pages: 912 },
    { id: "c2", title: "Hacking: The Art of Exploitation", author: "Jon Erickson", year: 2008, pages: 488 },
    { id: "c3", title: "Cybersecurity Essentials", author: "Charles Brooks", year: 2018, pages: 786 },
  ],
  cloud: [
    { id: "cl1", title: "Cloud Native Patterns", author: "Cornelia Davis", year: 2019, pages: 400 },
    { id: "cl2", title: "Docker Deep Dive", author: "Nigel Poulton", year: 2020, pages: 242 },
    { id: "cl3", title: "Kubernetes in Action", author: "Marko Luksa", year: 2017, pages: 624 },
  ],
  mobile: [
    { id: "m1", title: "Android Programming", author: "Bill Phillips", year: 2019, pages: 600 },
    { id: "m2", title: "iOS Programming", author: "Christian Keur", year: 2020, pages: 530 },
    { id: "m3", title: "React Native in Action", author: "Nader Dabit", year: 2019, pages: 392 },
  ],
};

export default function Browse() {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { addBook, readingList } = useLibrary();
  const subjectInfo = subjects.find((s) => s.id === subject);
  const books = subjectBooks[subject] || [];

  const isAdded = (id) => readingList.some((b) => b.id === id);

  return (
    <div className="browse-page">
      <button className="back-btn" onClick={() => navigate("/home")}>← Back to Home</button>

      <div className="browse-header">
        <span className="browse-icon">{subjectInfo?.icon}</span>
        <div>
          <p className="section-label">Technical Subject</p>
          <h1>{subjectInfo?.label}</h1>
          <p className="browse-desc">{subjectInfo?.desc}</p>
        </div>
      </div>

      <div className="browse-grid">
        {books.map((book, i) => (
          <div className="browse-book-card" key={book.id}>
            <div className="browse-book-num">0{i + 1}</div>
            <div className="browse-book-info">
              <h3>{book.title}</h3>
              <p>{book.author} · {book.year} · {book.pages} pages</p>
            </div>
            <button
              className={`borrow-btn ${isAdded(book.id) ? "added" : ""}`}
              onClick={() => {
                addBook({ ...book, category: subjectInfo?.label });
                navigate("/profile");
              }}
              disabled={isAdded(book.id)}
            >
              {isAdded(book.id) ? "✓ Added" : "Start Reading"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}