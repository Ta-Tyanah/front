"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexte/AuthContexte"
import "../styles/Profil.css"
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Shield,
  Clock,
  Activity,
  LogIn,
  Settings,
  Bell,
  Phone,
  Moon,
  Globe,
} from "lucide-react"

function Profil() {
  const { utilisateurCourant } = useAuth()
  const [activeTab, setActiveTab] = useState("informations")
  const [loading, setLoading] = useState(true)
  const [statsVisible, setStatsVisible] = useState(false)

  const [formData, setFormData] = useState({
    nom: utilisateurCourant.nom,
    email: utilisateurCourant.email,
    telephone: "+33 6 12 34 56 78",
    adresse: "123 Rue de Paris, 75001 Paris",
    poste: "Gestionnaire de Stock",
    dateInscription: "01/01/2023",
    motDePasseActuel: "",
    nouveauMotDePasse: "",
    confirmationMotDePasse: "",
  })

  const [message, setMessage] = useState({ type: "", texte: "" })

  // Données fictives pour les statistiques
  const statistiques = {
    connexions: 42,
    derniereConnexion: "Aujourd'hui à 09:15",
    actionsRecentes: 156,
    tauxActivite: 78,
  }

  // Données fictives pour l'historique de connexion
  const historiqueConnexions = [
    { date: "Aujourd'hui, 09:15", appareil: "Chrome sur Windows", adresseIP: "192.168.1.1", statut: "Réussie" },
    { date: "Hier, 18:30", appareil: "Application Mobile", adresseIP: "192.168.1.1", statut: "Réussie" },
    { date: "22/03/2023, 14:22", appareil: "Firefox sur MacOS", adresseIP: "192.168.0.5", statut: "Réussie" },
    { date: "20/03/2023, 08:45", appareil: "Chrome sur Windows", adresseIP: "192.168.1.1", statut: "Réussie" },
  ]

  // Données fictives pour les préférences
  const [preferences, setPreferences] = useState({
    notifications: true,
    modeNuit: false,
    langagePrefere: "Français",
    formatDate: "DD/MM/YYYY",
  })

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)

    // Animation pour les statistiques
    const statsTimer = setTimeout(() => {
      setStatsVisible(true)
    }, 1200)

    return () => {
      clearTimeout(timer)
      clearTimeout(statsTimer)
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handlePreferenceChange = (e) => {
    const { name, type } = e.target
    const value = type === "checkbox" ? e.target.checked : e.target.value

    setPreferences({
      ...preferences,
      [name]: value,
    })
  }

  const mettreAJourProfil = (e) => {
    e.preventDefault()

    // Animation de chargement
    setLoading(true)

    // Simulation de mise à jour
    setTimeout(() => {
      setLoading(false)
      setMessage({
        type: "succes",
        texte: "Profil mis à jour avec succès!",
      })

      // Réinitialiser le message après 3 secondes
      setTimeout(() => {
        setMessage({ type: "", texte: "" })
      }, 3000)
    }, 1000)
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

    // Animation de chargement
    setLoading(true)

    // Simulation de changement de mot de passe
    setTimeout(() => {
      setLoading(false)
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

      // Réinitialiser le message après 3 secondes
      setTimeout(() => {
        setMessage({ type: "", texte: "" })
      }, 3000)
    }, 1000)
  }

  if (loading) {
    return (
      <div className="page-profil">
        <div className="profil-loader-container">
          <div className="profil-loader"></div>
          <p>Chargement du profil...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="page-profil animation-profil">
      <div className="chemin-navigation">
        <span>Dashboard</span> <span className="separateur">/</span>{" "}
        <span className="page-actuelle">Profil Utilisateur</span>
      </div>

      <h1 className="titre-page">Profil Utilisateur</h1>

      {message.texte && (
        <div className={`alerte alerte-${message.type}`}>
          <div className="icone-alerte">{message.type === "succes" ? "✅" : "⚠️"}</div>
          <div className="texte-alerte">{message.texte}</div>
        </div>
      )}

      <div className="conteneur-profil">
        <div className="section-avatar">
          <div className="avatar-wrapper">
            <img
              src={utilisateurCourant.avatar || "/placeholder.svg?height=150&width=150"}
              alt="Avatar"
              className="avatar-profil"
            />
            <div className="statut-utilisateur online">En ligne</div>
          </div>
          <h2 className="nom-utilisateur-profil">{utilisateurCourant.nom}</h2>
          <p className="poste-utilisateur">{formData.poste}</p>
          <div className="boutons-avatar">
            <button className="bouton-changer-avatar">Changer l'avatar</button>
            <button className="bouton-supprimer-avatar">Supprimer</button>
          </div>

          <div className={`statistiques-utilisateur ${statsVisible ? "visible" : ""}`}>
            <div className="stat-item">
              <div className="stat-icon">
                <Activity size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{statistiques.tauxActivite}%</span>
                <span className="stat-label">Activité</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <LogIn size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{statistiques.connexions}</span>
                <span className="stat-label">Connexions</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Clock size={18} />
              </div>
              <div className="stat-info">
                <span className="stat-value">{statistiques.derniereConnexion}</span>
                <span className="stat-label">Dernière connexion</span>
              </div>
            </div>
          </div>
        </div>

        <div className="section-details">
          <div className="onglets-profil">
            <button
              className={`onglet ${activeTab === "informations" ? "actif" : ""}`}
              onClick={() => setActiveTab("informations")}
            >
              <User size={16} /> Informations
            </button>
            <button
              className={`onglet ${activeTab === "securite" ? "actif" : ""}`}
              onClick={() => setActiveTab("securite")}
            >
              <Shield size={16} /> Sécurité
            </button>
            <button
              className={`onglet ${activeTab === "historique" ? "actif" : ""}`}
              onClick={() => setActiveTab("historique")}
            >
              <Clock size={16} /> Historique
            </button>
            <button
              className={`onglet ${activeTab === "preferences" ? "actif" : ""}`}
              onClick={() => setActiveTab("preferences")}
            >
              <Settings size={16} /> Préférences
            </button>
          </div>

          {activeTab === "informations" && (
            <div className="contenu-onglet informations-tab">
              <h2>Informations personnelles</h2>

              <form onSubmit={mettreAJourProfil} className="formulaire-profil">
                <div className="grille-champs">
                  <div className="groupe-champ">
                    <label htmlFor="nom">
                      <User size={16} /> Nom complet
                    </label>
                    <input id="nom" name="nom" type="text" value={formData.nom} onChange={handleInputChange} required />
                  </div>

                  <div className="groupe-champ">
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

                  <div className="groupe-champ">
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

                  <div className="groupe-champ">
                    <label htmlFor="adresse">
                      <MapPin size={16} /> Adresse
                    </label>
                    <input
                      id="adresse"
                      name="adresse"
                      type="text"
                      value={formData.adresse}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="groupe-champ">
                    <label htmlFor="poste">
                      <Briefcase size={16} /> Poste
                    </label>
                    <input id="poste" name="poste" type="text" value={formData.poste} onChange={handleInputChange} />
                  </div>

                  <div className="groupe-champ">
                    <label htmlFor="dateInscription">
                      <Calendar size={16} /> Date d'inscription
                    </label>
                    <input
                      id="dateInscription"
                      name="dateInscription"
                      type="text"
                      value={formData.dateInscription}
                      readOnly
                      className="champ-readonly"
                    />
                  </div>
                </div>

                <button type="submit" className="bouton-sauvegarder">
                  Mettre à jour le profil
                </button>
              </form>
            </div>
          )}

          {activeTab === "securite" && (
            <div className="contenu-onglet securite-tab">
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

                <div className="force-mot-de-passe">
                  <div className="titre-force">Force du mot de passe</div>
                  <div className="indicateur-force">
                    <div className={`barre ${formData.nouveauMotDePasse.length > 0 ? "niveau-1" : ""}`}></div>
                    <div className={`barre ${formData.nouveauMotDePasse.length >= 6 ? "niveau-2" : ""}`}></div>
                    <div
                      className={`barre ${formData.nouveauMotDePasse.length >= 8 && /[A-Z]/.test(formData.nouveauMotDePasse) ? "niveau-3" : ""}`}
                    ></div>
                    <div
                      className={`barre ${formData.nouveauMotDePasse.length >= 10 && /[A-Z]/.test(formData.nouveauMotDePasse) && /[0-9]/.test(formData.nouveauMotDePasse) ? "niveau-4" : ""}`}
                    ></div>
                  </div>
                  <div className="conseils-mot-de-passe">
                    <p>Pour un mot de passe fort:</p>
                    <ul>
                      <li className={formData.nouveauMotDePasse.length >= 8 ? "valide" : ""}>Au moins 8 caractères</li>
                      <li className={/[A-Z]/.test(formData.nouveauMotDePasse) ? "valide" : ""}>
                        Au moins une majuscule
                      </li>
                      <li className={/[0-9]/.test(formData.nouveauMotDePasse) ? "valide" : ""}>Au moins un chiffre</li>
                      <li className={/[^A-Za-z0-9]/.test(formData.nouveauMotDePasse) ? "valide" : ""}>
                        Au moins un caractère spécial
                      </li>
                    </ul>
                  </div>
                </div>

                <button type="submit" className="bouton-changer-mdp">
                  Changer le mot de passe
                </button>
              </form>

              <div className="options-securite">
                <h3>Options de sécurité supplémentaires</h3>

                <div className="option-securite">
                  <div className="option-info">
                    <h4>Authentification à deux facteurs</h4>
                    <p>Ajoutez une couche de sécurité supplémentaire à votre compte</p>
                  </div>
                  <button className="bouton-option">Activer</button>
                </div>

                <div className="option-securite">
                  <div className="option-info">
                    <h4>Appareils connectés</h4>
                    <p>Gérez les appareils connectés à votre compte</p>
                  </div>
                  <button className="bouton-option">Gérer</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "historique" && (
            <div className="contenu-onglet historique-tab">
              <h2>Historique de connexion</h2>

              <div className="tableau-historique">
                <table>
                  <thead>
                    <tr>
                      <th>Date et heure</th>
                      <th>Appareil</th>
                      <th>Adresse IP</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historiqueConnexions.map((connexion, index) => (
                      <tr key={index} className="item-historique">
                        <td>{connexion.date}</td>
                        <td>{connexion.appareil}</td>
                        <td>{connexion.adresseIP}</td>
                        <td>
                          <span className={`statut-connexion ${connexion.statut.toLowerCase()}`}>
                            {connexion.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="actions-historique">
                <button className="bouton-secondaire">Voir plus</button>
                <button className="bouton-tertiaire">Exporter l'historique</button>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="contenu-onglet preferences-tab">
              <h2>Préférences</h2>

              <div className="section-preferences">
                <h3>Notifications</h3>

                <div className="preference-item">
                  <div className="preference-info">
                    <Bell size={18} />
                    <div>
                      <h4>Notifications par email</h4>
                      <p>Recevoir des notifications par email</p>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={preferences.notifications}
                      onChange={handlePreferenceChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <Moon size={18} />
                    <div>
                      <h4>Mode sombre</h4>
                      <p>Activer le thème sombre</p>
                    </div>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      name="modeNuit"
                      checked={preferences.modeNuit}
                      onChange={handlePreferenceChange}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>

                <h3>Paramètres régionaux</h3>

                <div className="preference-item">
                  <div className="preference-info">
                    <Globe size={18} />
                    <div>
                      <h4>Langue</h4>
                      <p>Choisir la langue de l'interface</p>
                    </div>
                  </div>
                  <select
                    name="langagePrefere"
                    value={preferences.langagePrefere}
                    onChange={handlePreferenceChange}
                    className="select-preference"
                  >
                    <option value="Français">Français</option>
                    <option value="English">English</option>
                    <option value="Español">Español</option>
                    <option value="Deutsch">Deutsch</option>
                  </select>
                </div>

                <div className="preference-item">
                  <div className="preference-info">
                    <Calendar size={18} />
                    <div>
                      <h4>Format de date</h4>
                      <p>Choisir le format d'affichage des dates</p>
                    </div>
                  </div>
                  <select
                    name="formatDate"
                    value={preferences.formatDate}
                    onChange={handlePreferenceChange}
                    className="select-preference"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <button className="bouton-sauvegarder mt-20">Enregistrer les préférences</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profil

