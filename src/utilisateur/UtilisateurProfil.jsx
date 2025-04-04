"\"use client"

import { useState } from "react"
import { User, Mail, Phone, MapPin, Save } from "lucide-react"
import "../cssUtilisateur/UtilisateurPages.css"

function UtilisateurProfil() {
  const [formData, setFormData] = useState({
    nom: "Utilisateur Test",
    email: "utilisateur@example.com",
    telephone: "",
    adresse: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulation de sauvegarde du profil
    alert("Profil sauvegardé avec succès!")
  }

  return (
    <div className="utilisateur-page">
      <div className="page-header">
        <h1>Mon Profil</h1>
      </div>

      <div className="profil-utilisateur-contenu">
        <div className="profil-carte">
          <div className="profil-avatar">
            <div className="avatar-initiales">{formData.nom.charAt(0).toUpperCase()}</div>
          </div>
          <h2 className="profil-nom">{formData.nom}</h2>
          <p className="profil-email">{formData.email}</p>
        </div>

        <div className="profil-formulaire-section">
          <h2>Informations personnelles</h2>
          <form onSubmit={handleSubmit} className="profil-formulaire">
            <div className="form-group">
              <label htmlFor="nom">
                <User size={16} /> Nom complet
              </label>
              <input id="nom" name="nom" type="text" value={formData.nom} onChange={handleInputChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} /> Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="telephone">
                <Phone size={16} /> Téléphone
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                value={formData.telephone}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="adresse">
                <MapPin size={16} /> Adresse
              </label>
              <input id="adresse" name="adresse" type="text" value={formData.adresse} onChange={handleInputChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                <Save size={16} /> Sauvegarder
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UtilisateurProfil

