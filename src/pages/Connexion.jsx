"use client"

import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexte/AuthContexte"
import "../styles/Connexion.css"

function Connexion() {
  const [email, setEmail] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [erreur, setErreur] = useState("")
  const [succes, setSucces] = useState("")
  const [chargement, setChargement] = useState(false)
  const { connexion } = useAuth()
  const naviguer = useNavigate()

  const gererSoumission = async (e) => {
    e.preventDefault()
    setChargement(true)
    setErreur("")
    setSucces("")

    // Appel à la fonction connexion
    const result = await connexion(email, motDePasse)

    if (result.success) {
      setSucces("Connexion réussie!")
      naviguer("/dashboard")
    } else {
      setErreur("Échec de connexion. Veuillez vérifier vos identifiants.")
    }

    setChargement(false)
  }

  return (
    <div className="page-connexion">
      <div className="conteneur-connexion">
        <h1 className="titre-connexion">Connexion</h1>

        {erreur && (
          <div className="alerte alerte-erreur">
            <div className="icone-alerte">⚠️</div>
            <div className="texte-alerte">{erreur}</div>
          </div>
        )}

        {succes && (
          <div className="alerte alerte-succes">
            <div className="icone-alerte">✅</div>
            <div className="texte-alerte">{succes}</div>
          </div>
        )}

        <form onSubmit={gererSoumission} className="formulaire-connexion">
          <div className="groupe-champ">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="champ-saisie"
              disabled={chargement}
            />
          </div>

          <div className="groupe-champ">
            <label htmlFor="motDePasse">Mot de passe</label>
            <input
              id="motDePasse"
              type="password"
              value={motDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              required
              className="champ-saisie"
              disabled={chargement}
            />
          </div>

          <button type="submit" className={`bouton-connexion ${chargement ? "chargement" : ""}`} disabled={chargement}>
            {chargement ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Connexion