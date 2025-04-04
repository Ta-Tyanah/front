import { Outlet } from "react-router-dom"
import UtilisateurSidebar from "../composant-utilisateur/UtilisateurSidebar"
import "../cssUtilisateur/UtilisateurLayout.css"

function UtilisateurLayout() {
  return (
    <div className="utilisateur-layout">
      <UtilisateurSidebar />
      <div className="utilisateur-main-content">
        <Outlet />
      </div>
    </div>
  )
}

export default UtilisateurLayout

