import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexte/AuthContexte"
import { StockProvider } from "./contexte/StockContexte"
import ProtectionRoute from "./composants/ProtectionRoute"

// Import des pages Admin"
import Dashboard from "./pages/Dashboard"
import Stock from "./pages/Stock"
import Inventaire from "./pages/Inventaire"
import Dispatche from "./pages/Dispatche"
import Immobiliers from "./pages/Immobiliers"
import GestionUtilisateurs from "./pages/GestionUtilisateurs"
import AccueilDashboard from "./pages/AccueilDashboard"
import Connexion from "./pages/Connexion"
import Inscription from "./pages/Inscription"

// Import des pages Utilisateur
import UtilisateurDashboard from "./utilisateur/UtilisateurDashboard"
import UtilisateurLayout from "./utilisateur/UtilisateurLayout"
import UtilisateurStock from "./utilisateur/UtilisateurStock"
import UtilisateurDispatches from "./utilisateur/UtilisateurDispatches"
import UtilisateurInventaire from "./utilisateur/UtilisateurInventaire"
import UtilisateurProfil from "./utilisateur/UtilisateurProfil"


import "./styles/index.css"
import "./styles/animations.css"
import "./styles/Dashboard.css"
import "./styles/SidebarMenu.css"
import "./styles/Header.css"
import "./styles/Stock.css"
import "./styles/Connexion.css"
import "./styles/Inscription.css"
import "./styles/Immobiliers.css"
import "./styles/Inventaire.css"
import "./styles/Dispatche.css"
import "./styles/GestionUtilisateurs.css"
// import "./styles/UtilisateurSidebar.css"
// import "./styles/UtilisateurHeader.css"
// import "./styles/UtilisateurPages.css"
// import "./styles/UtilisateurDashboard.css"
// import "./styles/AdminPages.css"

function App() {
  return (
    <AuthProvider>
      <StockProvider>
        <Router>
          <Routes>
            {/* Routes d'authentification */}
            <Route path="/" element={<Navigate to="/connexion" />} />
            <Route path="/connexion" element={<Connexion />} />
            <Route path="/inscription" element={<Inscription />} />

            {/* Routes Admin */}
            <Route path="/dashboard" element={<Dashboard />}>

            <Route
              path="/dashboard"
              element={
                <ProtectionRoute>
                  <Dashboard />
                </ProtectionRoute>
              }
            ></Route>

            <Route index element={<AccueilDashboard />} />
            <Route path="accueil" element={<AccueilDashboard />} />

              <Route path="AccueilDashboard" element={<AccueilDashboard />} />
              <Route path="stock" element={<Stock />} />
              <Route path="dispatche" element={<Dispatche />} />
              <Route path="inventaire" element={<Inventaire />} />
              <Route path="agence" element={<Dispatche />} />
              <Route path="immobiliers" element={<Immobiliers />} />
              <Route path="gestion-utilisateurs" element={<GestionUtilisateurs />} />

            </Route>

            {/* Routes Utilisateur - version simplifiée */}
            <Route path="utilisateur" element={<UtilisateurDashboard />} />
            
            <Route path="/utilisateur" element={<UtilisateurLayout />}>
              

            <Route
              path="/utilisateur/stock"
              element={
                
                  <UtilisateurStock />
               
              }
            />
            <Route
              path="/utilisateur/dispatches"
              element={
                
                  <UtilisateurDispatches />
              
              }
            />
            <Route
              path="/utilisateur/inventaire"
              element={
                
                  <UtilisateurInventaire />
                
              }
            />
            <Route
              path="/utilisateur/profil"
              element={
                
                  <UtilisateurProfil />
                
              }
            />

             </Route>
          </Routes>
        </Router>
      </StockProvider>
    </AuthProvider>
  )
}

export default App

