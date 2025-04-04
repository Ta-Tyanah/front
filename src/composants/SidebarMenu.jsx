"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Building,
  Building2,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react"

function SidebarMenu({ menuMobileOuvert, setMenuMobileOuvert }) {
  const [sousMenuOuvert, setSousMenuOuvert] = useState(true)
  const [sousMenuUtilisateursOuvert, setSousMenuUtilisateursOuvert] = useState(false)
  const location = useLocation()

  // Ouvrir automatiquement le sous-menu correspondant à la route active
  useEffect(() => {
    if (
      location.pathname.includes("/dashboard/stock") ||
      location.pathname.includes("/dashboard/inventaire") ||
      location.pathname.includes("/dashboard/agence")
    ) {
      setSousMenuOuvert(true)
    }

    if (location.pathname.includes("/dashboard/gestion-utilisateurs")) {
      setSousMenuUtilisateursOuvert(true)
    }
  }, [location])

  const basculerSousMenu = () => {
    setSousMenuOuvert(!sousMenuOuvert)
  }

  const basculerSousMenuUtilisateurs = () => {
    setSousMenuUtilisateursOuvert(!sousMenuUtilisateursOuvert)
  }

  const fermerMenuMobile = () => {
    if (setMenuMobileOuvert) {
      setMenuMobileOuvert(false)
    }
  }

  return (
    <aside className={`dashboard-sidebar ${menuMobileOuvert ? "ouvert" : ""}`}>
      <nav className="dashboard-navigation">
        <div className="groupe-menu">
          <h3 className="titre-menu">Tableau de bord</h3>
          <NavLink
            to="/dashboard/AccueilDashboard"
            end
            className={({ isActive }) => (isActive ? "lien-actif" : "")}
            onClick={fermerMenuMobile}
          >
            <span className="icone-menu-item">
              <LayoutDashboard size={18} />
            </span>
            <span className="texte-menu-item">Accueil</span>
          </NavLink>
        </div>

        <div className="groupe-menu">
          <div className="entete-groupe-menu" onClick={basculerSousMenu}>
            <h3 className="titre-menu">Gestion des consommables</h3>
            <span className={`icone-fleche ${sousMenuOuvert ? "ouvert" : ""}`}>
              {sousMenuOuvert ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>

          <div className={`sous-menu ${sousMenuOuvert ? "ouvert" : ""}`}>
            <NavLink
              to="/dashboard/stock"
              className={({ isActive }) => (isActive ? "lien-actif" : "")}
              onClick={fermerMenuMobile}
            >
              <span className="icone-menu-item">
                <Package size={18} />
              </span>
              <span className="texte-menu-item">Stock</span>
            </NavLink>
            <NavLink
              to="/dashboard/inventaire"
              className={({ isActive }) => (isActive ? "lien-actif" : "")}
              onClick={fermerMenuMobile}
            >
              <span className="icone-menu-item">
                <ClipboardList size={18} />
              </span>
              <span className="texte-menu-item">Inventaire</span>
            </NavLink>
            <NavLink
              to="/dashboard/dispatche"
              className={({ isActive }) => (isActive ? "lien-actif" : "")}
              onClick={fermerMenuMobile}
            >
              <span className="icone-menu-item">
                <Building size={18} />
              </span>
              <span className="texte-menu-item">Dispatche</span>
            </NavLink>
          </div>
        </div>

        <div className="groupe-menu">
          <h3 className="titre-menu">Gestion des immobiliers</h3>
          <NavLink
            to="/dashboard/immobiliers"
            className={({ isActive }) => (isActive ? "lien-actif" : "")}
            onClick={fermerMenuMobile}
          >
            <span className="icone-menu-item">
              <Building2 size={18} />
            </span>
            <span className="texte-menu-item">Immobiliers</span>
          </NavLink>
        </div>

        <div className="groupe-menu">
          <h3 className="titre-menu">Gestion des utilisateurs</h3>
          <NavLink
            to="/dashboard/gestion-utilisateurs"
            className={({ isActive }) => (isActive ? "lien-actif" : "")}
            onClick={fermerMenuMobile}
          >
            <span className="icone-menu-item">
              <Users size={18} />
            </span>
            <span className="texte-menu-item">Utilisateurs</span>
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

export default SidebarMenu

