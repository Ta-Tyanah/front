import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Connexion from "./pages/Connexion"
import Inscription from "./pages/Inscription"
import Dashboard from "./pages/Dashboard"
import Stock from "./pages/Stock"
import Inventaire from "./pages/Inventaire"
import Dispatche from "./pages/Dispatche"
import Immobiliers from "./pages/Immobiliers"
import GestionUtilisateurs from "./pages/GestionUtilisateurs"
import AccueilDashboard from "./pages/AccueilDashboard"
import { AuthProvider } from "./contexte/AuthContexte"
import { StockProvider } from "./contexte/StockContexte"

function App() {
  return (
    <AuthProvider>
       <StockProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/connexion" />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/inscription" element={<Inscription />} />
          <Route path="/AccueilDashboard" element={<AccueilDashboard />} /> 
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<Stock />} />
            <Route path="stock" element={<Stock />} />
            <Route path="inventaire" element={<Inventaire />} />
            <Route path="dispatche" element={<Dispatche />} />
            <Route path="immobiliers" element={<Immobiliers />} />
            <Route path="gestion-utilisateurs" element={<GestionUtilisateurs />} />
          </Route>
        </Routes>
      </Router>
      </StockProvider>
    </AuthProvider>
   
  )
}

export default App
