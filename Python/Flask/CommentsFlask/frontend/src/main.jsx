import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <main className='bg-neutral-950 min-h-screen w-screen text-white'>
        <App />
      </main>
  </StrictMode>
)
