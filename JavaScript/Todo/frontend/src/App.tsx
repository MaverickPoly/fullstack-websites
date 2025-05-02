import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavBar from "./components/NavBar.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/Login.tsx";
import RegisterPage from "./pages/Register.tsx";
import AllTodosPage from "./pages/AllTodos.tsx";
import ProtectedRoute from "./lib/ProtectedRoute.tsx";
import CreateTodoPage from "./pages/CreateTodo.tsx";
import ProfilePage from "./pages/Profile.tsx";

export default function App() {
    return <div className="bg-stone-900 text-neutral-200">
        <BrowserRouter>
            <NavBar/>

            <main className="min-h-screen w-full max-w-6xl mx-auto">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    {/*Auth*/}
                    <Route path="/auth/login" element={<LoginPage/>}/>
                    <Route path="/auth/register" element={<RegisterPage/>}/>
                    {/* Todos */}
                    <Route path="/todos" element={
                        <ProtectedRoute>
                            <AllTodosPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/todo/create" element={
                        <ProtectedRoute>
                            <CreateTodoPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </main>
        </BrowserRouter>
    </div>

}