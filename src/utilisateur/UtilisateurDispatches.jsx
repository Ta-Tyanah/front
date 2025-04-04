"use client"

import { useState } from "react"
import { Search, Filter } from "lucide-react"
import "../cssUtilisateur/UtilisateurPages.css"

function UtilisateurDispatches() {
  const [filtreDate, setFiltreDate] = useState("")

  return (
    <div className="utilisateur-page">
      <div className="page-header">
        <h1>Dispatches Reçus</h1>
        <div className="header-actions">
          <div className="search-container">
            <Search size={20} className="search-icon" />
            <input type="text" placeholder="Rechercher un dispatche..." className="search-input" />
          </div>
          <div className="filter-container">
            <Filter size={20} className="filter-icon" />
            <input
              type="date"
              value={filtreDate}
              onChange={(e) => setFiltreDate(e.target.value)}
              className="date-filter"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Quantité totale</th>
                <th>Quantité reçue</th>
                <th>Date de réception</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              <tr className="empty-row">
                <td colSpan="5">
                  <div className="empty-state">
                    <div className="empty-icon">🚚</div>
                    <h3>Aucun dispatche reçu</h3>
                    <p>Les dispatches que vous recevrez apparaîtront ici</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UtilisateurDispatches

