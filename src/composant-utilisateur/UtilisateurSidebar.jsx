"use client"
import { NavLink, useNavigate } from "react-router-dom"
import { Package, Truck, ClipboardList, User, LogOut } from "lucide-react"
import "../cssUtilisateur/UtilisateurSidebar.css"

function UtilisateurSidebar() {
  const navigate = useNavigate()

  const handleLogout = () => {
    // Ici vous pourriez ajouter la logique de déconnexion
    // Par exemple: localStorage.removeItem('token');
    navigate("/connexion")
  }

  return (
    <aside className="utilisateur-sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-square">CEM</div>
          <h1>Gestion Stock</h1>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <h3 className="nav-title">Mon Espace</h3>
          <ul className="nav-list">
            <li>
              <NavLink to="/utilisateur/stock" className={({ isActive }) => (isActive ? "active" : "")}>
                <Package size={18} />
                <span>Stock Disponible</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/utilisateur/dispatches" className={({ isActive }) => (isActive ? "active" : "")}>
                <Truck size={18} />
                <span>Dispatches Reçus</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/utilisateur/inventaire" className={({ isActive }) => (isActive ? "active" : "")}>
                <ClipboardList size={18} />
                <span>Inventaire</span>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-section">
          <h3 className="nav-title">Mon Compte</h3>
          <ul className="nav-list">
            <li>
              <NavLink to="/utilisateur/profil" className={({ isActive }) => (isActive ? "active" : "")}>
                <User size={18} />
                <span>Mon Profil</span>
              </NavLink>
            </li>
            <li>
              <button className="logout-button" onClick={handleLogout}>
                <LogOut size={18} />
                <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  )
}

export default UtilisateurSidebar

