import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <main className="min-h-screen bg-neutral text-black bg-neutral-50 dark:bg-neutral-900 dark:text-white">
      <div className=" max-w-5xl mx-auto pt-3">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </div>
    </main>
  );
};

export default App;
