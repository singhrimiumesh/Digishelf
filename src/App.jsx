import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useLibrary } from "./context/librarycontext";
import Login from "./pages/login";
import Home from "./pages/home";
import Browse from "./pages/browse";
import Profile from "./pages/profile";
import Navbar from "./Components/navbar";
import Footer from "./Components/footer";

function App() {
  const { user, logout } = useLibrary();

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN PAGE */}
        <Route
          path="/"
          element={
            user
              ? <Navigate to="/home" />
              : <Login onLogin={() => {}} />
          }
        />

        {/* HOME PAGE */}
        <Route
          path="/home"
          element={
            user ? (
              <>
                <Navbar onLogout={logout} />
                <Home />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* BROWSE PAGE */}
        <Route
          path="/browse/:subject"
          element={
            user ? (
              <>
                <Navbar onLogout={logout} />
                <Browse />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* PROFILE PAGE */}
        <Route
          path="/profile"
          element={
            user ? (
              <>
                <Navbar onLogout={logout} />
                <Profile />
                <Footer />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* ANY OTHER URL → redirect to home or login */}
        <Route
          path="*"
          element={
            user
              ? <Navigate to="/home" />
              : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;