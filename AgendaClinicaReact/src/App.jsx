import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./auth/AuthContext"
import { ProtectedRoute } from "./routes/ProtectedRoute"

import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Admin from "./pages/Admin"
import Medico from "./pages/Medico"

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  )
}

export default App
