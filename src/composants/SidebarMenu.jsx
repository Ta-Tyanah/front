"use client"

import { useState, useEffect } from "react"
import { NavLink, useLocation } from "react-router-dom"
import PropTypes from 'prop-types';

function SidebarMenu({ menuMobileOuvert, setMenuMobileOuvert }) {
  const [sousMenuOuvert, setSousMenuOuvert] = useState(true)
  const location = useLocation()

  // Ouvrir automatiquement le sous-menu correspondant à la route active
  useEffect(() => {
    const sousMenus = [
      "/dashboard/stock",
      "/dashboard/inventaire",
      "/dashboard/dispatche",
    ]
    setSousMenuOuvert(sousMenus.some((path) => location.pathname.includes(path)))
  }, [location])

  const basculerSousMenu = () => {
    setSousMenuOuvert((prev) => !prev)
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
            to="/dashboard"
            end
            className={({ isActive }) => (isActive ? "lien-actif" : "")}
            onClick={fermerMenuMobile}
          >
            <span className="icone-menu-item">📊</span> Accueil
          </NavLink>
        </div>

        <div className="groupe-menu">
          <div className="entete-groupe-menu" onClick={basculerSousMenu}>
            <h3 className="titre-menu">Gestion des consommables</h3>
            <span className={`icone-fleche ${sousMenuOuvert ? "ouvert" : ""}`}>▼</span>
          </div>

          <div className={`sous-menu ${sousMenuOuvert ? "ouvert" : ""}`}>
            <NavLink
              to="/dashboard/stock"
              className={({ isActive }) => (isActive ? "lien-actif" : "")}
              onClick={fermerMenuMobile}
            >
              <span className="icone-menu-item">📦</span> Stock
            </NavLink>
            <NavLink
              to="/dashboard/inventaire"
              className={({ isActive }) => (isActive ? "lien-actif" : "")}
              onClick={fermerMenuMobile}
            >
              <span className="icone-menu-item">📋</span> Inventaire
            </NavLink>
            <NavLink
              to="/dashboard/dispatche"
              className={({ isActive }) => (isActive ? "lien-actif" : "")}
              onClick={fermerMenuMobile}
            >
              <span className="icone-menu-item">🚚</span> Dispatche
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
            <span className="icone-menu-item">🏢</span> Immobiliers
          </NavLink>
        </div>
      </nav>
    </aside>
  )
}

// Ajout des PropTypes
SidebarMenu.propTypes = {
  menuMobileOuvert: PropTypes.bool.isRequired,
  setMenuMobileOuvert: PropTypes.func.isRequired,
};

export default SidebarMenu