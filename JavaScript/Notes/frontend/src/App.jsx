import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Notes from "./pages/Notes";
import Create from "./pages/Create";
import ProtectedRoute from "./utils/ProtectedRoute";
import NoteDetails from "./pages/NoteDetails";
import ToastContainer from "./components/ToastContainer";

const App = () => {
  return (
    <main className="bg-neutral-200 min-h-screen w-full">
      <BrowserRouter>
        <Navbar />
        <div className="max-w-4xl w-full mx-auto">
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Notes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
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
                  <Create />
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
        </div>
        <ToastContainer />
      </BrowserRouter>
    </main>
  );
};

export default App;
