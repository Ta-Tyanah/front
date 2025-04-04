"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import UtilisateurSidebar from "../composant-utilisateur/UtilisateurSidebar"
import "../CssUtilisateur/UtilisateurDashboard.css"
import { Package, ArrowDown, ArrowUp, Clipboard, AlertTriangle, CheckCircle, Clock } from "lucide-react"

function UtilisateurDashboard() {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)
  const [activeTab, setActiveTab] = useState("apercu")
  const naviguer = useNavigate()

  // Données vides pour l'interface de simulation
  const stockUtilisateur = []
  const dispatchesRecus = []
  const inventaireUtilisateur = []

  const basculerMenuMobile = () => {
    setMenuMobileOuvert(!menuMobileOuvert)
  }

  // Obtenir l'icône et la couleur en fonction de l'état du stock
  const getStockInfo = (etat) => {
    switch (etat) {
      case "critique":
        return { icon: <AlertTriangle size={16} />, color: "#C02121", text: "Critique" }
      case "bas":
        return { icon: <Clock size={16} />, color: "#E03E3E", text: "Bas" }
      case "moyen":
        return { icon: <Package size={16} />, color: "#81D274", text: "Moyen" }
      case "bon":
        return { icon: <CheckCircle size={16} />, color: "#5DE44E", text: "Bon" }
      default:
        return { icon: <Package size={16} />, color: "#81D274", text: "Normal" }
    }
  }

  return (
    <div className="utilisateur-dashboard-conteneur">
      <div className="utilisateur-dashboard-corps">
        <UtilisateurSidebar menuMobileOuvert={menuMobileOuvert} setMenuMobileOuvert={setMenuMobileOuvert} />

        <main className="utilisateur-dashboard-contenu">
          <div className="utilisateur-bienvenue">
            <h1>Bienvenue sur votre espace utilisateur</h1>
            <p>Voici un aperçu de votre stock et des dispatches reçus</p>
          </div>

          <div className="utilisateur-onglets">
            <button
              className={`onglet ${activeTab === "apercu" ? "actif" : ""}`}
              onClick={() => setActiveTab("apercu")}
            >
              Aperçu
            </button>
            <button className={`onglet ${activeTab === "stock" ? "actif" : ""}`} onClick={() => setActiveTab("stock")}>
              Mon Stock
            </button>
            <button
              className={`onglet ${activeTab === "dispatches" ? "actif" : ""}`}
              onClick={() => setActiveTab("dispatches")}
            >
              Dispatches Reçus
            </button>
            <button
              className={`onglet ${activeTab === "inventaire" ? "actif" : ""}`}
              onClick={() => setActiveTab("inventaire")}
            >
              Mon Inventaire
            </button>
          </div>

          {activeTab === "apercu" && (
            <div className="utilisateur-apercu">
              <div className="utilisateur-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <Package size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Total Articles</h3>
                    <div className="stat-value">0</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <ArrowDown size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Dispatches Reçus</h3>
                    <div className="stat-value">0</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <ArrowUp size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Consommations</h3>
                    <div className="stat-value">0</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Clipboard size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Inventaire</h3>
                    <div className="stat-value">0</div>
                  </div>
                </div>
              </div>

              <div className="utilisateur-sections">
                <div className="section-recents">
                  <h2>Articles Récents</h2>
                  <div className="message-vide">
                    <p>Aucun article récent à afficher. Ajoutez des articles pour les voir apparaître ici.</p>
                  </div>
                </div>

                <div className="section-recents">
                  <h2>Derniers Dispatches</h2>
                  <div className="message-vide">
                    <p>Aucun dispatche récent à afficher. Les dispatches reçus apparaîtront ici.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "stock" && (
            <div className="utilisateur-stock">
              <h2>Mon Stock</h2>
              <div className="tableau-wrapper">
                <table className="tableau-utilisateur">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Quantité</th>
                      <th>Date de réception</th>
                      <th>État</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stockUtilisateur.length > 0 ? (
                      stockUtilisateur.map((item) => {
                        const stockInfo = getStockInfo(item.etat)
                        return (
                          <tr key={item.id}>
                            <td>{item.designation}</td>
                            <td>{item.quantite}</td>
                            <td>{item.dateReception}</td>
                            <td>
                              <span className="badge-etat" style={{ backgroundColor: stockInfo.color }}>
                                {stockInfo.icon}
                                <span>{stockInfo.text}</span>
                              </span>
                            </td>
                          </tr>
                        )
                      })
                    ) : (
                      <tr>
                        <td colSpan="4" className="message-vide">
                          <p>Aucun article en stock. Ajoutez des articles pour les voir apparaître ici.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="actions-stock">
                <button className="bouton-ajouter">Ajouter un article</button>
              </div>
            </div>
          )}

          {activeTab === "dispatches" && (
            <div className="utilisateur-dispatches">
              <h2>Dispatches Reçus</h2>
              <div className="tableau-wrapper">
                <table className="tableau-utilisateur">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Quantité totale</th>
                      <th>Quantité reçue</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dispatchesRecus.length > 0 ? (
                      dispatchesRecus.map((item) => (
                        <tr key={item.id}>
                          <td>{item.designation}</td>
                          <td>{item.quantite}</td>
                          <td>{item.quantiteRecue}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="message-vide">
                          <p>Aucun dispatche reçu. Les dispatches reçus apparaîtront ici.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "inventaire" && (
            <div className="utilisateur-inventaire">
              <h2>Mon Inventaire</h2>
              <div className="tableau-wrapper">
                <table className="tableau-utilisateur">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Catégorie</th>
                      <th>Quantité</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inventaireUtilisateur.length > 0 ? (
                      inventaireUtilisateur.map((item) => (
                        <tr key={item.id}>
                          <td>{item.designation}</td>
                          <td>{item.categorie}</td>
                          <td>{item.quantite}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="message-vide">
                          <p>Aucun élément dans votre inventaire. Créez un inventaire pour voir les éléments ici.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="actions-inventaire">
                <button className="bouton-ajouter">Créer un inventaire</button>
              </div>
            </div>
          )}
        </main>
      </div>

      <button
        className={`bouton-menu-mobile ${menuMobileOuvert ? "actif" : ""}`}
        onClick={basculerMenuMobile}
        aria-label="Menu"
      >
        <span className="icone-menu"></span>
      </button>
    </div>
  )
}

export default UtilisateurDashboard

