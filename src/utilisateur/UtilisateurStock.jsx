"use client"

import { useState } from "react"
import { Plus, Search } from "lucide-react"
import "../cssUtilisateur/UtilisateurPages.css"

function UtilisateurStock() {
  const [modalOuvert, setModalOuvert] = useState(false)
  const [formData, setFormData] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
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
    alert("Fonctionnalité à implémenter: Ajouter un article au stock")
    setModalOuvert(false)
  }

  return (
    <div className="utilisateur-page">
      <div className="page-header">
        <h1>Stock Disponible</h1>
        <div className="header-actions">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Rechercher un article..." className="search-input" />
          </div>
          <button className="btn-primary" onClick={() => setModalOuvert(true)}>
            <Plus size={20} />
            <span>Ajouter</span>
          </button>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Quantité</th>
                <th>Date d'entrée</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              <tr className="empty-row">
                <td colSpan="4">
                  <div className="empty-state">
                    <div className="empty-icon">📦</div>
                    <h3>Aucun article en stock</h3>
                    <p>Ajoutez des articles pour les voir apparaître ici</p>
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
            <h2>Ajouter un article</h2>
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
                <label htmlFor="date">Date d'entrée</label>
                <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </div>
              <div className="form-actions">
                <button type="button" className="btn-secondary" onClick={() => setModalOuvert(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn-primary">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UtilisateurStock

