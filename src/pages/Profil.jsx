"use client"

import { useState } from "react"
import { useAuth } from "../contexte/AuthContexte"
import "../styles/Profil.css"

function Profil() {
  const { utilisateurCourant } = useAuth()

  const [formData, setFormData] = useState({
    nom: utilisateurCourant.nom,
    email: utilisateurCourant.email,
    motDePasseActuel: "",
    nouveauMotDePasse: "",
    confirmationMotDePasse: "",
  })

  const [message, setMessage] = useState({ type: "", texte: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const mettreAJourProfil = (e) => {
    e.preventDefault()

    // Simulation de mise à jour
    setMessage({
      type: "succes",
      texte: "Profil mis à jour avec succès!",
    })

    // Réinitialiser les champs de mot de passe
    setFormData({
      ...formData,
      motDePasseActuel: "",
      nouveauMotDePasse: "",
      confirmationMotDePasse: "",
    })
  }

  const changerMotDePasse = (e) => {
    e.preventDefault()

    if (formData.nouveauMotDePasse !== formData.confirmationMotDePasse) {
      setMessage({
        type: "erreur",
        texte: "Les mots de passe ne correspondent pas.",
      })
      return
    }

    // Simulation de changement de mot de passe
    setMessage({
      type: "succes",
      texte: "Mot de passe changé avec succès!",
    })

    // Réinitialiser les champs de mot de passe
    setFormData({
      ...formData,
      motDePasseActuel: "",
      nouveauMotDePasse: "",
      confirmationMotDePasse: "",
    })
  }

  return (
    <div className="page-profil">
      <h1 className="titre-page">Profil Utilisateur</h1>

      {message.texte && (
        <div className={`alerte alerte-${message.type}`}>
          <div className="icone-alerte">{message.type === "succes" ? "✅" : "⚠️"}</div>
          <div className="texte-alerte">{message.texte}</div>
        </div>
      )}

      <div className="conteneur-profil">
        <div className="section-avatar">
          <img src={utilisateurCourant.avatar || "/placeholder.svg"} alt="Avatar" className="avatar-profil" />
          <button className="bouton-changer-avatar">Changer {`l'avatar`}</button>
        </div>

        <div className="section-informations">
          <h2>Informations personnelles</h2>

          <form onSubmit={mettreAJourProfil} className="formulaire-profil">
            <div className="groupe-champ">
              <label htmlFor="nom">Nom complet</label>
              <input id="nom" name="nom" type="text" value={formData.nom} onChange={handleInputChange} required />
            </div>

            <div className="groupe-champ">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="bouton-sauvegarder">
              Mettre à jour le profil
            </button>
          </form>
        </div>

        <div className="section-securite">
          <h2>Sécurité</h2>

          <form onSubmit={changerMotDePasse} className="formulaire-securite">
            <div className="groupe-champ">
              <label htmlFor="motDePasseActuel">Mot de passe actuel</label>
              <input
                id="motDePasseActuel"
                name="motDePasseActuel"
                type="password"
                value={formData.motDePasseActuel}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="groupe-champ">
              <label htmlFor="nouveauMotDePasse">Nouveau mot de passe</label>
              <input
                id="nouveauMotDePasse"
                name="nouveauMotDePasse"
                type="password"
                value={formData.nouveauMotDePasse}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="groupe-champ">
              <label htmlFor="confirmationMotDePasse">Confirmer le mot de passe</label>
              <input
                id="confirmationMotDePasse"
                name="confirmationMotDePasse"
                type="password"
                value={formData.confirmationMotDePasse}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="bouton-changer-mdp">
              Changer le mot de passe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Profil

