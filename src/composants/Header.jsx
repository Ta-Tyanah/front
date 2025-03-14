"use client"

import { useState, useEffect } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../contexte/AuthContexte"

function Header() {
  const { utilisateurCourant, deconnexion } = useAuth()
  const [menuProfilOuvert, setMenuProfilOuvert] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const naviguer = useNavigate()

  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrolled])

  const basculerMenuProfil = () => {
    setMenuProfilOuvert(!menuProfilOuvert)
  }

  const gererDeconnexion = () => {
    deconnexion()
    naviguer("/connexion")
  }

  // Fermer le menu si on clique en dehors
  useEffect(() => {
    const fermerMenuSiClicExterieur = (e) => {
      if (menuProfilOuvert && !e.target.closest(".profil-utilisateur")) {
        setMenuProfilOuvert(false)
      }
    }

    document.addEventListener("click", fermerMenuSiClicExterieur)
    return () => {
      document.removeEventListener("click", fermerMenuSiClicExterieur)
    }
  }, [menuProfilOuvert])

  return (
    <header className={`dashboard-entete ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">
        <h1>GestionStock</h1>
      </div>

      <div className="profil-utilisateur">
        <div className="info-utilisateur" onClick={basculerMenuProfil}>
          <img
            src={utilisateurCourant?.avatar || "/placeholder.svg?height=40&width=40"}
            alt="Avatar"
            className="avatar-utilisateur"
          />
          <span className="nom-utilisateur">{utilisateurCourant?.nom || "Utilisateur"}</span>
          <span className="icone-fleche-bas">▼</span>
        </div>

        {menuProfilOuvert && (
          <div className="menu-profil">
            <NavLink to="/dashboard/profil" onClick={() => setMenuProfilOuvert(false)}>
              <span className="icone-menu-item">👤</span> Profil
            </NavLink>
            <NavLink to="/inscription" onClick={() => setMenuProfilOuvert(false)}>
              <span className="icone-menu-item">📝</span> Inscription
            </NavLink>
            <button onClick={gererDeconnexion}>
              <span className="icone-menu-item">🚪</span> Déconnexion
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

