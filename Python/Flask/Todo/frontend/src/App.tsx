import {BrowserRouter, Route, Routes} from "react-router-dom";
import Navbar from "./components/Navbar.tsx";
import HomePage from "./pages/HomePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProtectedRoute from "./util/ProtectedRoute.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import CreateTodoPage from "./pages/CreateTodoPage.tsx";
import TodosPage from "./pages/TodosPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import {AllUsersPage} from "./pages/AllUsersPage.tsx";

export default function App() {
    return <div className="">
        <BrowserRouter>

            <main className="">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/pricing" element={<PricingPage/>}/>
                    <Route path="/users/all" element={<AllUsersPage/>}/>

                    {/* Auth Pages */}
                    <Route path="/auth/login" element={<LoginPage/>}/>
                    <Route path="/auth/register" element={<RegisterPage/>}/>

                    {/* Todo Pages */}
                    <Route path="/profile" element={
                        <ProtectedRoute>
                            <ProfilePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/todo/create" element={
                        <ProtectedRoute>
                            <CreateTodoPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path="/todos" element={
                        <ProtectedRoute>
                            <TodosPage/>
                        </ProtectedRoute>
                    }/>
                </Routes>
            </main>

            <Navbar/>
        </BrowserRouter>
    </div>
}