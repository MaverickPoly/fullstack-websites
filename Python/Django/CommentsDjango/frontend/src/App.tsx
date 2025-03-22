import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import EditComment from "./pages/EditComment";
import NavBar from "./components/NavBar";
import AboutPage from "./pages/AboutPage";
import CommentDetails from "./pages/CommentDetails";
import ToastsContainer from "./components/ToastsContainer";

const App = () => {
  return (
    <BrowserRouter>
      <main className="min-h-screen bg-neutral-200">
        <NavBar />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/create" element={<CreatePage />} />
            <Route path="/:commentId/" element={<CommentDetails />} />
            <Route path="/:commentId/edit" element={<EditComment />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
        <ToastsContainer />
      </main>
    </BrowserRouter>
  );
};

export default App;
