"use client"

import { useState, useEffect } from "react"
import "../styles/Stock.css"

function Stock() {
  const [lignesStock, setLignesStock] = useState([])
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [ligneEditee, setLigneEditee] = useState(null)
  const [nouvelleDesignation, setNouvelleDesignation] = useState("")
  const [nouvelleQuantite, setNouvelleQuantite] = useState("")
  const [nouveauPrixUnitaire, setNouveauPrixUnitaire] = useState("")
  const [modalOuverte, setModalOuverte] = useState(false)

  // Données initiales pour les boîtes de catégories
  const categoriesStock = [
    { id: 1, nom: "Produits Informatiques", quantite: 45, icone: "💻" },
    { id: 2, nom: "Produits d'Entretien", quantite: 32, icone: "🧹" },
    { id: 3, nom: "Produits de Magasin", quantite: 78, icone: "📦" },
    { id: 4, nom: "Produits de Bureau", quantite: 56, icone: "📝" },
  ]

  // Charger les données initiales
  useEffect(() => {
    // Simulation de données
    const donneesMockees = [
      {
        id: 1,
        designation: "Ordinateur portable",
        stockAvant: { quantite: 10, montant: 5000, cmup: 500 },
        stockActuel: {
          date: new Date().toISOString().split("T")[0],
          quantite: 15,
          prixUnitaire: 550,
          montant: 8250,
        },
      },
      {
        id: 2,
        designation: "Imprimante laser",
        stockAvant: { quantite: 5, montant: 1500, cmup: 300 },
        stockActuel: {
          date: new Date().toISOString().split("T")[0],
          quantite: 8,
          prixUnitaire: 320,
          montant: 2560,
        },
      },
    ]

    setLignesStock(donneesMockees)
  }, [])

  // Filtrer les lignes de stock
  const lignesFiltrees = lignesStock.filter((ligne) =>
    ligne.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Ouvrir le modal pour ajouter une nouvelle ligne
  const ouvrirModalAjout = () => {
    setLigneEditee(null)
    setNouvelleDesignation("")
    setNouvelleQuantite("")
    setNouveauPrixUnitaire("")
    setModalOuverte(true)
  }

  // Ouvrir le modal pour éditer une ligne existante
  const ouvrirModalEdition = (ligne) => {
    setLigneEditee(ligne)
    setNouvelleDesignation(ligne.designation)
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
      setLignesStock(
        lignesStock.map((ligne) =>
          ligne.id === ligneEditee.id
            ? {
                ...ligne,
                designation: nouvelleDesignation,
                stockActuel: {
                  ...ligne.stockActuel,
                  quantite,
                  prixUnitaire,
                  montant,
                },
              }
            : ligne,
        ),
      )
    } else {
      // Ajout d'une nouvelle ligne
      const nouvelleLigne = {
        id: Date.now(),
        designation: nouvelleDesignation,
        stockAvant: { quantite: 0, montant: 0, cmup: 0 },
        stockActuel: {
          date: new Date().toISOString().split("T")[0],
          quantite,
          prixUnitaire,
          montant,
        },
      }

      setLignesStock([...lignesStock, nouvelleLigne])
    }

    fermerModal()
  }

  // Supprimer une ligne
  const supprimerLigne = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette ligne?")) {
      setLignesStock(lignesStock.filter((ligne) => ligne.id !== id))
    }
  }

  // Enregistrer l'inventaire
  const enregistrerInventaire = () => {
    // Simulation d'enregistrement
    const messageElement = document.createElement("div")
    messageElement.className = "alerte-flottante alerte-succes"
    messageElement.innerHTML = `
      <div class="icone-alerte">✅</div>
      <div class="texte-alerte">Inventaire enregistré avec succès!</div>
    `
    document.body.appendChild(messageElement)

    // Supprimer l'alerte après 3 secondes
    setTimeout(() => {
      messageElement.classList.add("disparition")
      setTimeout(() => {
        document.body.removeChild(messageElement)
      }, 300)
    }, 3000)

    // Ici, vous pourriez envoyer les données à une API
  }

  return (
    <div className="page-stock">
      <h1 className="titre-page">Gestion de Stock</h1>

      <div className="categories-stock">
        {categoriesStock.map((categorie) => (
          <div key={categorie.id} className="boite-categorie">
            <div className="icone-categorie">{categorie.icone}</div>
            <h3>{categorie.nom}</h3>
            <p className="quantite-categorie">{categorie.quantite} articles</p>
          </div>
        ))}
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
              Créer
            </button>
          </div>
        </div>

        <div className="tableau-stock">
          <table>
            <thead>
              <tr>
                <th>Désignation</th>
                <th colSpan="3">Stock Avant</th>
                <th colSpan="4">Stock Actuel</th>
                <th>Actions</th>
              </tr>
              <tr>
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
              {lignesFiltrees.map((ligne) => (
                <tr key={ligne.id}>
                  <td>{ligne.designation}</td>
                  <td className="cellule-readonly">{ligne.stockAvant.quantite}</td>
                  <td className="cellule-readonly">{ligne.stockAvant.montant}</td>
                  <td className="cellule-readonly">{ligne.stockAvant.cmup}</td>
                  <td>{ligne.stockActuel.date}</td>
                  <td>{ligne.stockActuel.quantite}</td>
                  <td>{ligne.stockActuel.prixUnitaire}</td>
                  <td>{ligne.stockActuel.montant}</td>
                  <td className="actions-cellule">
                    <button className="bouton-modifier" onClick={() => ouvrirModalEdition(ligne)}>
                      Modifier
                    </button>
                    <button className="bouton-supprimer" onClick={() => supprimerLigne(ligne.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="actions-bas-tableau">
          <button className="bouton-enregistrer" onClick={enregistrerInventaire}>
            Enregistrer {`l'inventaire`}
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
                <button className="bouton-sauvegarder" onClick={sauvegarderLigne}>
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

