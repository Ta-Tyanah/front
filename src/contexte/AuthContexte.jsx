"use client"

import { createContext, useState, useContext, useEffect } from "react"

const AuthContexte = createContext()

export const useAuth = () => {
  return useContext(AuthContexte)
}

export const AuthProvider = ({ children }) => {
  const [utilisateurCourant, setUtilisateurCourant] = useState(null)
  const [chargement, setChargement] = useState(true)

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const utilisateur = localStorage.getItem("utilisateur")
    if (utilisateur) {
      setUtilisateurCourant(JSON.parse(utilisateur))
    }
    setChargement(false)
  }, [])

  const connexion = (email, motDePasse) => {
    // Simulation d'une connexion
    const utilisateur = {
      id: 1,
      nom: "Utilisateur Test",
      email: email,
      avatar: "/placeholder.svg?height=100&width=100",
    }

    localStorage.setItem("utilisateur", JSON.stringify(utilisateur))
    setUtilisateurCourant(utilisateur)
    return utilisateur
  }

  const deconnexion = () => {
    localStorage.removeItem("utilisateur")
    setUtilisateurCourant(null)
  }

  const inscription = (nom, email, motDePasse) => {
    // Simulation d'une inscription
    const utilisateur = {
      id: 1,
      nom: nom,
      email: email,
      avatar: "/placeholder.svg?height=100&width=100",
    }

    localStorage.setItem("utilisateur", JSON.stringify(utilisateur))
    setUtilisateurCourant(utilisateur)
    return utilisateur
  }

  const valeur = {
    utilisateurCourant,
    connexion,
    deconnexion,
    inscription,
    chargement,
  }

  return <AuthContexte.Provider value={valeur}>{!chargement && children}</AuthContexte.Provider>
}

