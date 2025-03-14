import { useOutletContext } from "react-router-dom"
import "../styles/Dashboard.css"

function AccueilDashboard() {
  const [statistiques] = useOutletContext()

  // Données pour les activités récentes
  const activitesRecentes = [
    { id: 1, type: "Stock", description: "Ajout de 15 ordinateurs portables", date: "2023-05-15", statut: "Actif" },
    {
      id: 2,
      type: "Dispatche",
      description: "Livraison au département Marketing",
      date: "2023-05-14",
      statut: "En attente",
    },
    {
      id: 3,
      type: "Immobilier",
      description: "Mise à jour du bâtiment principal",
      date: "2023-05-12",
      statut: "Actif",
    },
    { id: 4, type: "Stock", description: "Suppression de 5 imprimantes", date: "2023-05-10", statut: "Inactif" },
  ]

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
            {/* Ici vous pourriez intégrer un graphique avec une bibliothèque comme Chart.js */}
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
              Graphique {`d'évolution`} du stock
            </div>
          </div>
        </div>

        <div className="graphique">
          <h3>Répartition par catégorie</h3>
          <div className="placeholder-graphique">
            {/* Ici vous pourriez intégrer un graphique circulaire */}
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
              {activitesRecentes.map((activite) => (
                <tr key={activite.id}>
                  <td>{activite.type}</td>
                  <td>{activite.description}</td>
                  <td>{activite.date}</td>
                  <td>
                    <span className={`statut-badge statut-${activite.statut.toLowerCase().replace(" ", "-")}`}>
                      {activite.statut}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AccueilDashboard

