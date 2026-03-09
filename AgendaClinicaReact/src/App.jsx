import './App.css'

/*import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthContext"
import { ProtectedRoute } from "./routes/ProtectedRoute"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import Medico from "./pages/Medico"*/

function App() {
  return (
      <div className='container'>
        <header className="header">
          <h1>Agenda Clinica RoweApps</h1>
        </header>
        <main className="main">
          <aside className="sidebar">
            <nav>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#citas">Citas</a></li>
                <li><a href="#pacientes">Pacientes</a></li>
                <li><a href="#medicos">Medicos</a></li>
              </ul>
            </nav>
          </aside>
          <section className="content">
            <article>
              <p>Bienvenido a la Agenda Clinica RoweApps</p>
            </article>
          </section>

        </main>
        <footer className="footer">
          <nav>
            <a href="https://www.linkedin.com/in/Roweshil/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href="https://github.com/Roweshil" target="_blank" rel="noreferrer">GitHub ↗</a>
          </nav>
        </footer>
      </div>
      
    
    /*<AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/medico"
            element={
              <ProtectedRoute role="medico">
                <Medico />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>*/
  )
}

export default App
