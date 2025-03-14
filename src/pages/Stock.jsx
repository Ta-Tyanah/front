"use client"

import { useState, useEffect } from "react"
import { useStock } from "../contexte/StockContexte"
import "../styles/Stock.css"
import { Computer, Brush, Package, FileText, Plus, Edit, Trash, Save } from "lucide-react"

function Stock() {
  const {
    lignesStock,
    categoriesStock,
    ajouterLigneStock,
    mettreAJourLigneStock,
    supprimerLigneStock,
    enregistrerInventaire,
  } = useStock()

  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [ligneEditee, setLigneEditee] = useState(null)
  const [nouvelleDesignation, setNouvelleDesignation] = useState("")
  const [nouvelleCategorie, setNouvelleCategorie] = useState("")
  const [nouvelleQuantite, setNouvelleQuantite] = useState("")
  const [nouveauPrixUnitaire, setNouveauPrixUnitaire] = useState("")
  const [modalOuverte, setModalOuverte] = useState(false)

  // Obtenir l'icône correspondant à la catégorie
  const getIconeCategorie = (nomCategorie) => {
    const categorie = categoriesStock.find((cat) => cat.nom === nomCategorie)
    if (!categorie) return <Package size={24} />

    switch (categorie.icone) {
      case "Computer":
        return <Computer size={24} />
      case "Brush":
        return <Brush size={24} />
      case "Package":
        return <Package size={24} />
      case "FileText":
        return <FileText size={24} />
      default:
        return <Package size={24} />
    }
  }

  // Filtrer les lignes de stock
  const lignesFiltrees = lignesStock.filter((ligne) =>
    ligne.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Ouvrir le modal pour ajouter une nouvelle ligne
  const ouvrirModalAjout = () => {
    setLigneEditee(null)
    setNouvelleDesignation("")
    setNouvelleCategorie(categoriesStock.length > 0 ? categoriesStock[0].nom : "")
    setNouvelleQuantite("")
    setNouveauPrixUnitaire("")
    setModalOuverte(true)
  }

  // Ouvrir le modal pour éditer une ligne existante
  const ouvrirModalEdition = (ligne) => {
    setLigneEditee(ligne)
    setNouvelleDesignation(ligne.designation)
    setNouvelleCategorie(ligne.categorie)
    setNouvelleQuantite(ligne.stockActuel.quantite.toString())
    setNouveauPrixUnitaire(ligne.stockActuel.prixUnitaire.toString())
    setModalOuverte(true)
  }

  // Fermer le modal
  const fermerModal = () => {
    setModalOuverte(false)
  }

  // Sauvegarder les modifications
  const sauvegarderLigne = () => {
    const quantite = Number.parseInt(nouvelleQuantite, 10)
    const prixUnitaire = Number.parseFloat(nouveauPrixUnitaire)
    const montant = quantite * prixUnitaire

    if (ligneEditee) {
      // Mise à jour d'une ligne existante
      const ligneModifiee = {
        ...ligneEditee,
        designation: nouvelleDesignation,
        categorie: nouvelleCategorie,
        stockActuel: {
          ...ligneEditee.stockActuel,
          quantite,
          prixUnitaire,
          montant,
        },
      }

      mettreAJourLigneStock(ligneEditee.id, ligneModifiee)

      // Afficher un message de succès
      afficherMessage("Article modifié avec succès!", "succes")
    } else {
      // Ajout d'une nouvelle ligne
      const nouvelleLigne = {
        id: Date.now(),
        designation: nouvelleDesignation,
        categorie: nouvelleCategorie,
        stockAvant: { quantite: 0, montant: 0, cmup: 0 },
        stockActuel: {
          date: new Date().toISOString().split("T")[0],
          quantite,
          prixUnitaire,
          montant,
        },
      }

      ajouterLigneStock(nouvelleLigne)

      // Afficher un message de succès
      afficherMessage("Article ajouté avec succès!", "succes")
    }

    fermerModal()
  }

  // Fonction pour afficher un message
  const afficherMessage = (texte, type) => {
    const messageElement = document.createElement("div")
    messageElement.className = `alerte-flottante alerte-${type}`
    messageElement.innerHTML = `
      <div class="icone-alerte"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg></div>
      <div class="texte-alerte">${texte}</div>
    `
    document.body.appendChild(messageElement)

    // Supprimer l'alerte après 3 secondes
    setTimeout(() => {
      messageElement.classList.add("disparition")
      setTimeout(() => {
        document.body.removeChild(messageElement)
      }, 300)
    }, 3000)
  }

  // Supprimer une ligne
  const supprimerLigne = (id) => {
    // Créer l'alerte de confirmation
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cet article ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `
    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer la ligne
      supprimerLigneStock(id)

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Article supprimé avec succès!", "succes")
      }, 300)
    })
  }

  // Enregistrer l'inventaire
  const handleEnregistrerInventaire = () => {
    if (lignesStock.length === 0) {
      afficherMessage("Aucun article à enregistrer dans l'inventaire.", "erreur")
      return
    }

    // Appel à la fonction du contexte
    const nouvelInventaire = enregistrerInventaire()

    // Afficher un message de succès
    afficherMessage(`Inventaire enregistré avec succès! ${nouvelInventaire.length} articles ajoutés.`, "succes")
  }

  // Ajouter un script pour détecter si le tableau nécessite un défilement
  useEffect(() => {
    const checkTableScroll = () => {
      const tableContainer = document.querySelector(".tableau-stock")
      if (tableContainer) {
        if (tableContainer.scrollWidth > tableContainer.clientWidth) {
          tableContainer.classList.add("scrollable")
        } else {
          tableContainer.classList.remove("scrollable")
        }
      }
    }

    // Vérifier au chargement et lors du redimensionnement
    checkTableScroll()
    window.addEventListener("resize", checkTableScroll)

    return () => {
      window.removeEventListener("resize", checkTableScroll)
    }
  }, [lignesStock])

  return (
    <div className="page-stock">
      <h1 className="titre-page">Gestion de Stock</h1>

      <div className="categories-stock">
        {categoriesStock.length > 0 ? (
          categoriesStock.map((categorie) => (
            <div key={categorie.id} className="boite-categorie">
              <div className="icone-categorie">{getIconeCategorie(categorie.nom)}</div>
              <h3>{categorie.nom}</h3>
              <p className="quantite-categorie">{categorie.quantite} articles</p>
            </div>
          ))
        ) : (
          <div className="no-categories">
            Aucune catégorie disponible. Ajoutez des articles pour créer des catégories.
          </div>
        )}
      </div>

      <div className="section-gestion-stock">
        <div className="entete-section">
          <h2>Gestion du Stock</h2>
          <div className="actions-stock">
            <div className="filtre-stock">
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreDesignation}
                onChange={(e) => setFiltreDesignation(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <button className="bouton-ajouter" onClick={ouvrirModalAjout}>
              <Plus size={16} /> Créer
            </button>
          </div>
        </div>

        <div className="tableau-stock-wrapper">
          <div className="tableau-stock">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>Catégorie</th>
                  <th colSpan="3">Stock Avant</th>
                  <th colSpan="4">Stock Actuel</th>
                  <th>Actions</th>
                </tr>
                <tr>
                  <th></th>
                  <th></th>
                  <th>Quantité</th>
                  <th>Montant</th>
                  <th>CMUP</th>
                  <th>Date</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Montant</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {lignesFiltrees.length > 0 ? (
                  lignesFiltrees.map((ligne) => (
                    <tr key={ligne.id}>
                      <td>{ligne.designation}</td>
                      <td>
                        <div className="categorie-cell">
                          <span className="categorie-icon">{getIconeCategorie(ligne.categorie)}</span>
                          <span>{ligne.categorie}</span>
                        </div>
                      </td>
                      <td className="cellule-readonly">{ligne.stockAvant.quantite}</td>
                      <td className="cellule-readonly">{ligne.stockAvant.montant}</td>
                      <td className="cellule-readonly">{ligne.stockAvant.cmup}</td>
                      <td>{ligne.stockActuel.date}</td>
                      <td>{ligne.stockActuel.quantite}</td>
                      <td>{ligne.stockActuel.prixUnitaire}</td>
                      <td>{ligne.stockActuel.montant}</td>
                      <td className="actions-cellule">
                        <button className="bouton-modifier" onClick={() => ouvrirModalEdition(ligne)}>
                          <Edit size={14} /> Modifier
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerLigne(ligne.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="10" className="no-data">
                      Aucun article en stock. Utilisez le bouton "Créer" pour ajouter des articles.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="actions-bas-tableau">
          <button
            className="bouton-enregistrer"
            onClick={handleEnregistrerInventaire}
            disabled={lignesStock.length === 0}
          >
            <Save size={16} /> Enregistrer l{`'`}inventaire
          </button>
        </div>
      </div>

      {modalOuverte && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{ligneEditee ? "Modifier" : "Ajouter"} un article</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="designation">Désignation</label>
                <input
                  id="designation"
                  type="text"
                  value={nouvelleDesignation}
                  onChange={(e) => setNouvelleDesignation(e.target.value)}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="categorie">Catégorie</label>
                {categoriesStock.length > 0 ? (
                  <select
                    id="categorie"
                    value={nouvelleCategorie}
                    onChange={(e) => setNouvelleCategorie(e.target.value)}
                    required
                  >
                    <option value="">Sélectionner une catégorie</option>
                    {categoriesStock.map((cat) => (
                      <option key={cat.id} value={cat.nom}>
                        {cat.nom}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    id="categorie"
                    type="text"
                    value={nouvelleCategorie}
                    onChange={(e) => setNouvelleCategorie(e.target.value)}
                    placeholder="Entrez une nouvelle catégorie"
                    required
                  />
                )}
              </div>

              <div className="groupe-champ">
                <label htmlFor="quantite">Quantité</label>
                <input
                  id="quantite"
                  type="number"
                  value={nouvelleQuantite}
                  onChange={(e) => setNouvelleQuantite(e.target.value)}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="prixUnitaire">Prix Unitaire</label>
                <input
                  id="prixUnitaire"
                  type="number"
                  step="0.01"
                  value={nouveauPrixUnitaire}
                  onChange={(e) => setNouveauPrixUnitaire(e.target.value)}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModal}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderLigne}
                  disabled={!nouvelleDesignation || !nouvelleCategorie || !nouvelleQuantite || !nouveauPrixUnitaire}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Stock

