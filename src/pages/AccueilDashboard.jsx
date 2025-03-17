"use client"

import { useOutletContext } from "react-router-dom"
import "../styles/Dashboard.css"
import { useState, useEffect } from "react"

function AccueilDashboard() {
  const statistiques = useOutletContext() || {
    totalProduits: 0,
    totalCategories: 0,
    totalDispatches: 0,
    totalImmobiliers: 0,
  }

  // État pour les activités récentes
  const [activitesRecentes, setActivitesRecentes] = useState([])

  // Charger les activités récentes depuis localStorage
  useEffect(() => {
    try {
      const activitesSauvegardees = localStorage.getItem("activitesRecentes")
      if (activitesSauvegardees) {
        setActivitesRecentes(JSON.parse(activitesSauvegardees))
      }
    } catch (error) {
      console.error("Erreur lors du chargement des activités récentes :", error)
    }
  }, [])

  return (
    <div className="accueil-dashboard">
      <h1 className="titre-page">Tableau de bord</h1>

      <div className="cartes-statistiques">
        <div className="carte-stat produits">
          <div className="icone-stat produits">📦</div>
          <div className="details-stat">
            <div className="valeur-stat">{statistiques.totalProduits}</div>
            <div className="libelle-stat">Produits en stock</div>
          </div>
        </div>

        <div className="carte-stat categories">
          <div className="icone-stat categories">🏷️</div>
          <div className="details-stat">
            <div className="valeur-stat">{statistiques.totalCategories}</div>
            <div className="libelle-stat">Catégories</div>
          </div>
        </div>

        <div className="carte-stat dispatches">
          <div className="icone-stat dispatches">🚚</div>
          <div className="details-stat">
            <div className="valeur-stat">{statistiques.totalDispatches}</div>
            <div className="libelle-stat">Dispatches</div>
          </div>
        </div>

        <div className="carte-stat immobiliers">
          <div className="icone-stat immobiliers">🏢</div>
          <div className="details-stat">
            <div className="valeur-stat">{statistiques.totalImmobiliers}</div>
            <div className="libelle-stat">Immobiliers</div>
          </div>
        </div>
      </div>

      <div className="conteneur-graphiques">
        <div className="graphique">
          <h3>Évolution du stock</h3>
          <div className="placeholder-graphique">
            <div
              style={{
                height: "250px",
                background: "linear-gradient(to right, #e3f2fd, #bbdefb, #90caf9)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#1976d2",
                fontWeight: "bold",
              }}
            >
              Graphique d'évolution du stock
            </div>
          </div>
        </div>

        <div className="graphique">
          <h3>Répartition par catégorie</h3>
          <div className="placeholder-graphique">
            <div
              style={{
                height: "250px",
                background: "linear-gradient(to right, #e8f5e9, #c8e6c9, #a5d6a7)",
                borderRadius: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#388e3c",
                fontWeight: "bold",
              }}
            >
              Graphique de répartition
            </div>
          </div>
        </div>
      </div>

      <div className="section-dashboard">
        <h2>
          <span className="icone-titre">📋</span> Activités récentes
        </h2>

        <div className="tableau-container">
          <table className="tableau-recents">
            <thead>
              <tr>
                <th>Type</th>
                <th>Description</th>
                <th>Date</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {activitesRecentes.length > 0 ? (
                activitesRecentes.map((activite, index) => (
                  <tr key={activite.id || index}>
                    <td>{activite.type}</td>
                    <td>{activite.description}</td>
                    <td>{activite.date}</td>
                    <td>
                      <span className={`statut-badge statut-${activite.statut.toLowerCase().replace(" ", "-")}`}>
                        {activite.statut}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    Aucune activité récente à afficher.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccueilDashboard
