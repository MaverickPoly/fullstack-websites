import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider} from "./context/AuthContext.tsx";
import {TodosProvider} from "./context/TodoContext.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AuthProvider>
            <TodosProvider>
                <App/>
            </TodosProvider>
        </AuthProvider>
    </StrictMode>,
)
