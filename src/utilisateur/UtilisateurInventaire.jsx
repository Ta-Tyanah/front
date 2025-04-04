"use client"

import { useState } from "react"
import { Search, ArrowUp, ArrowDown } from "lucide-react"
import "../cssUtilisateur/UtilisateurPages.css"

function UtilisateurInventaire() {
  const [modalOuvert, setModalOuvert] = useState(false)
  const [typeOperation, setTypeOperation] = useState("entree")
  const [formData, setFormData] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
    motif: "",
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
    // Simulation d'ajout - à implémenter par l'utilisateur
    alert(`Fonctionnalité à implémenter: ${typeOperation === "entree" ? "Entrée" : "Sortie"} de stock`)
    setModalOuvert(false)
  }

  return (
    <div className="utilisateur-page">
      <div className="page-header">
        <h1>Inventaire</h1>
        <div className="header-actions">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Rechercher dans l'inventaire..." className="search-input" />
          </div>
          <div className="button-group">
            <button
              className="btn-success"
              onClick={() => {
                setTypeOperation("entree")
                setModalOuvert(true)
              }}
            >
              <ArrowDown size={20} />
              <span>Entrée</span>
            </button>
            <button
              className="btn-warning"
              onClick={() => {
                setTypeOperation("sortie")
                setModalOuvert(true)
              }}
            >
              <ArrowUp size={20} />
              <span>Sortie</span>
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="tabs">
          <button className="tab active">Toutes les opérations</button>
          <button className="tab">Entrées</button>
          <button className="tab">Sorties</button>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Désignation</th>
                <th>Quantité</th>
                <th>Date</th>
                <th>Motif</th>
              </tr>
            </thead>
            <tbody>
              <tr className="empty-row">
                <td colSpan="5">
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>Aucune opération d'inventaire</h3>
                    <p>Les entrées et sorties de stock apparaîtront ici</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {modalOuvert && (
        <div className="modal-overlay" onClick={() => setModalOuvert(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{typeOperation === "entree" ? "Entrée de stock" : "Sortie de stock"}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="designation">Désignation</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="quantite">Quantité</label>
                <input
                  type="number"
                  id="quantite"
                  name="quantite"
                  value={formData.quantite}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <label htmlFor="motif">Motif</label>
                <textarea
                  id="motif"
                  name="motif"
                  value={formData.motif}
                  onChange={handleInputChange}
                  rows={3}
                  required
                ></textarea>
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setModalOuvert(false)}>
                  Annuler
                </button>
                <button type="submit" className={typeOperation === "entree" ? "btn-success" : "btn-warning"}>
                  {typeOperation === "entree" ? "Enregistrer l'entrée" : "Enregistrer la sortie"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UtilisateurInventaire

