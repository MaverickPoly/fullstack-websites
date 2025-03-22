import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./util/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import NavBar from "./components/NavBar";
import Profile from "./pages/Profile";
import NoteDetails from "./pages/NoteDetails";

function App() {
  return (
    <main className="min-h-screen w-full bg-neutral-900 text-white">
      <div className="max-w-4xl mx-auto pt-3">
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Notes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateNote />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/note/:noteId"
              element={
                <ProtectedRoute>
                  <NoteDetails />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </main>
  );
}

export default App;
