"use client"

import { useState } from "react"
import "../styles/Dispatche.css"

function Dispatche() {
  const [departements, setDepartements] = useState([
    { id: 1, nom: "Informatique" },
    { id: 2, nom: "Comptabilité" },
    { id: 3, nom: "Ressources Humaines" },
    { id: 4, nom: "Marketing" },
  ])

  const [produits, setProduits] = useState([
    { id: 1, designation: "Ordinateur portable", quantite: 15 },
    { id: 2, designation: "Imprimante laser", quantite: 8 },
    { id: 3, designation: "Souris sans fil", quantite: 25 },
    { id: 4, designation: "Clavier ergonomique", quantite: 12 },
  ])

  const [dispatches, setDispatches] = useState([
    {
      id: 1,
      produitId: 1,
      departementId: 1,
      quantite: 2,
      date: "2023-03-10",
      status: "Livré",
    },
    {
      id: 2,
      produitId: 3,
      departementId: 2,
      quantite: 5,
      date: "2023-03-12",
      status: "En attente",
    },
  ])

  const [nouveauDispatch, setNouveauDispatch] = useState({
    produitId: "",
    departementId: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [modalOuvert, setModalOuvert] = useState(false)

  const getNomProduit = (produitId) => {
    const produit = produits.find((p) => p.id === produitId)
    return produit ? produit.designation : ""
  }

  const getNomDepartement = (departementId) => {
    const departement = departements.find((d) => d.id === departementId)
    return departement ? departement.nom : ""
  }

  const ouvrirModal = () => {
    setModalOuvert(true)
  }

  const fermerModal = () => {
    setModalOuvert(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNouveauDispatch({
      ...nouveauDispatch,
      [name]: value,
    })
  }

  const ajouterDispatch = () => {
    const nouveauId = dispatches.length > 0 ? Math.max(...dispatches.map((d) => d.id)) + 1 : 1

    const dispatch = {
      id: nouveauId,
      produitId: Number.parseInt(nouveauDispatch.produitId),
      departementId: Number.parseInt(nouveauDispatch.departementId),
      quantite: Number.parseInt(nouveauDispatch.quantite),
      date: nouveauDispatch.date,
      status: "En attente",
    }

    setDispatches([...dispatches, dispatch])

    // Réinitialiser le formulaire
    setNouveauDispatch({
      produitId: "",
      departementId: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })

    fermerModal()
  }

  const changerStatus = (id, nouveauStatus) => {
    setDispatches(
      dispatches.map((dispatch) => (dispatch.id === id ? { ...dispatch, status: nouveauStatus } : dispatch)),
    )
  }

  return (
    <div className="page-dispatche">
      <h1 className="titre-page">Dispatche des Produits</h1>

      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Dispatches</h2>
          <button className="bouton-ajouter" onClick={ouvrirModal}>
            Nouveau Dispatche
          </button>
        </div>

        <div className="tableau-dispatche">
          <table>
            <thead>
              <tr>
                <th>Produit</th>
                <th>Département</th>
                <th>Quantité</th>
                <th>Date</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dispatches.map((dispatch) => (
                <tr key={dispatch.id}>
                  <td>{getNomProduit(dispatch.produitId)}</td>
                  <td>{getNomDepartement(dispatch.departementId)}</td>
                  <td>{dispatch.quantite}</td>
                  <td>{dispatch.date}</td>
                  <td>
                    <span className={`statut-${dispatch.status.toLowerCase().replace(" ", "-")}`}>
                      {dispatch.status}
                    </span>
                  </td>
                  <td className="actions-cellule">
                    {dispatch.status === "En attente" && (
                      <>
                        <button className="bouton-livrer" onClick={() => changerStatus(dispatch.id, "Livré")}>
                          Marquer comme livré
                        </button>
                        <button className="bouton-annuler" onClick={() => changerStatus(dispatch.id, "Annulé")}>
                          Annuler
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>Nouveau Dispatche</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="produitId">Produit</label>
                <select
                  id="produitId"
                  name="produitId"
                  value={nouveauDispatch.produitId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionner un produit</option>
                  {produits.map((produit) => (
                    <option key={produit.id} value={produit.id}>
                      {produit.designation} (Disponible: {produit.quantite})
                    </option>
                  ))}
                </select>
              </div>

              <div className="groupe-champ">
                <label htmlFor="departementId">Département</label>
                <select
                  id="departementId"
                  name="departementId"
                  value={nouveauDispatch.departementId}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Sélectionner un département</option>
                  {departements.map((departement) => (
                    <option key={departement.id} value={departement.id}>
                      {departement.nom}
                    </option>
                  ))}
                </select>
              </div>

              <div className="groupe-champ">
                <label htmlFor="quantite">Quantité</label>
                <input
                  id="quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouveauDispatch.quantite}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={nouveauDispatch.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModal}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={ajouterDispatch}
                  disabled={!nouveauDispatch.produitId || !nouveauDispatch.departementId || !nouveauDispatch.quantite}
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dispatche