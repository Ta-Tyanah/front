"use client"
import { useAuth } from "../contexte/AuthContexte"

// Simplifier le composant de protection pour permettre l'accès temporairement
function ProtectionUtilisateur({ children }) {
  const { utilisateurCourant } = useAuth()

  // Créer un utilisateur temporaire si aucun n'existe
  if (!utilisateurCourant) {
    // Créer un utilisateur temporaire
    const utilisateurTemp = {
      id: 999,
      nom: "Utilisateur Temporaire",
      email: "temp@example.com",
      role: "utilisateur",
      type: "agence",
      agenceId: 1,
    }

    // Stocker dans localStorage pour les prochaines visites
    localStorage.setItem("utilisateur", JSON.stringify(utilisateurTemp))

    // Retourner directement les enfants au lieu de rediriger
    return children
  }

  return children
}

export default ProtectionUtilisateur

