import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../contexte/AuthContexte"
import "../styles/Inscription.css"

function Inscription() {
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [agence, setAgence] = useState("")
  const [fonction, setFonction] = useState("")
  const [motDePasse, setMotDePasse] = useState("")
  const [confirmationMotDePasse, setConfirmationMotDePasse] = useState("")

  const [erreur, setErreur] = useState("")

  const { inscription } = useAuth()
  const naviguer = useNavigate()

  const gererSoumission = async (e) => {
    e.preventDefault()

    if (motDePasse !== confirmationMotDePasse) {
      setErreur("Les mots de passe ne correspondent pas")
      return
    }

    setErreur("") // Réinitialiser l'erreur

    // Appel à la fonction d'inscription
    const result = await inscription(nom, email, motDePasse)

    if (result.success) {
      // Redirection vers le dashboard
      naviguer("/dashboard")
    } else {
      setErreur("Échec d'inscription. Veuillez réessayer.")
    }
  }

  return (
    <div className="page-inscription">
      <div className="conteneur-inscription">
        <h1 className="titre-inscription">Inscription</h1>
        {erreur && (
          <div className="alerte alerte-erreur">
            <div className="icone-alerte">⚠️</div>
            <div className="texte-alerte">{erreur}</div>
          </div>
        )}

        <form onSubmit={gererSoumission} className="formulaire-inscription">
          <div className="groupe-champ">
            <label htmlFor="nom">Nom complet</label>
            <input
              id="nom"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
              className="champ-saisie"
            />
          </div>

          <div className="groupe-champ">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="champ-saisie"
            />
          </div>

          <div className="groupe-champ">
            <label htmlFor="agence">Numero {`d'agence`}</label>
            <input
              id="agence"
              type="agence"
              value={agence}
              onChange={(e) => setAgence(e.target.value)}
              required
              className="champ-saisie"
            />
          </div>

          <div className="groupe-champ">
            <label htmlFor="type">Fonction</label>
            <select
              id="fonction"
              value={fonction}
              onChange={(e) => setFonction(e.target.value)}
              required
              className="champ-saisie"
            >
              <option value="">Sélectionnez une fonction</option>
              <option value="admin">Administrateur</option>
              <option value="utilisateur">Utilisateur</option>
            </select>
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
            />
          </div>

          <div className="groupe-champ">
            <label htmlFor="confirmationMotDePasse">Confirmer le mot de passe</label>
            <input
              id="confirmationMotDePasse"
              type="password"
              value={confirmationMotDePasse}
              onChange={(e) => setConfirmationMotDePasse(e.target.value)}
              required
              className="champ-saisie"
            />
          </div>

          <button type="submit" className="bouton-inscription">
            {`S'inscrire`}
          </button>
        </form>

      </div>
    </div>
  )
}

export default Inscription