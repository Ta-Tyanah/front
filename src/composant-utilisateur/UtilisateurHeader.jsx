"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexte/AuthContexte"
import "../styles/UtilisateurDashboard.css"
import { Package, ArrowDown, ArrowUp, Clipboard, AlertTriangle, CheckCircle, Clock } from "lucide-react"

function UtilisateurDashboard() {
  const { utilisateurCourant } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)
  const [activeTab, setActiveTab] = useState("apercu")
  const [stockUtilisateur, setStockUtilisateur] = useState([])
  const [dispatchesRecus, setDispatchesRecus] = useState([])
  const [inventaireUtilisateur, setInventaireUtilisateur] = useState([])
  const naviguer = useNavigate()

  // Simuler le chargement des données de l'utilisateur
  useEffect(() => {
    // Si l'utilisateur n'est pas connecté, on ne charge pas les données
    if (!utilisateurCourant) {
      setIsLoading(false)
      return
    }

    // Récupérer les données depuis localStorage
    const agences = JSON.parse(localStorage.getItem("agences") || "[]")
    const dispatches = JSON.parse(localStorage.getItem("dispatches") || "[]")
    const inventaire = JSON.parse(localStorage.getItem("inventaire") || "[]")

    // Utiliser les données réelles de l'utilisateur
    const utilisateurActuel = {
      ...utilisateurCourant,
      type: "agence", // Par défaut, considérer l'utilisateur comme une agence
      agenceId: agences.length > 0 ? agences[0].id : 1,
    }

    // Récupérer les dispatches pour cet utilisateur
    const dispatchesUtilisateur = dispatches.filter(
      (d) => d.consommations && d.consommations.some((c) => c.agenceId === utilisateurActuel.agenceId),
    )

    // Utiliser les données réelles du stock
    const stockReel = JSON.parse(localStorage.getItem("lignesStock") || "[]").map((item) => ({
      id: item.id,
      designation: item.designation,
      quantite: item.stockActuel.quantite,
      dateReception: item.dateEntree || item.stockActuel.date,
      etat: item.stockActuel.quantite > 10 ? "bon" : item.stockActuel.quantite > 5 ? "moyen" : "bas",
    }))

    // Mettre à jour les états avec les données réelles
    setStockUtilisateur(stockReel)
    setDispatchesRecus(dispatchesUtilisateur)
    setInventaireUtilisateur(inventaire.filter((item) => item.agenceId === utilisateurActuel.agenceId))

    // Terminer le chargement
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [utilisateurCourant, naviguer])

  const basculerMenuMobile = () => {
    setMenuMobileOuvert(!menuMobileOuvert)
  }

  // Obtenir l'icône et la couleur en fonction de l'état du stock
  const getStockInfo = (etat) => {
    switch (etat) {
      case "critique":
        return { icon: <AlertTriangle size={16} />, color: "#800000", text: "Critique" }
      case "bas":
        return { icon: <Clock size={16} />, color: "#982B1C", text: "Bas" }
      case "moyen":
        return { icon: <Package size={16} />, color: "#DAD4B5", text: "Moyen" }
      case "bon":
        return { icon: <CheckCircle size={16} />, color: "#F2E8C6", text: "Bon" }
      default:
        return { icon: <Package size={16} />, color: "#DAD4B5", text: "Normal" }
    }
  }

  if (isLoading) {
    return (
      <div className="ecran-chargement">
        <div className="loader"></div>
        <p>Chargement de votre tableau de bord...</p>
      </div>
    )
  }

  return (
    <div className="utilisateur-dashboard-conteneur">

      <div className="utilisateur-dashboard-corps">

        <main className="utilisateur-dashboard-contenu">
          <div className="utilisateur-bienvenue">
            <h1>Bienvenue, {utilisateurCourant.nom}</h1>
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
                    <div className="stat-value">{stockUtilisateur.reduce((acc, item) => acc + item.quantite, 0)}</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <ArrowDown size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Dispatches Reçus</h3>
                    <div className="stat-value">{dispatchesRecus.length}</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <ArrowUp size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Consommations</h3>
                    <div className="stat-value">
                      {dispatchesRecus.reduce((acc, item) => {
                        const consommation = item.consommations.find((c) => c.agenceId === utilisateurCourant.agenceId)
                        return acc + (consommation ? consommation.quantite : 0)
                      }, 0)}
                    </div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <Clipboard size={24} />
                  </div>
                  <div className="stat-info">
                    <h3>Inventaire</h3>
                    <div className="stat-value">{inventaireUtilisateur.length}</div>
                  </div>
                </div>
              </div>

              <div className="utilisateur-sections">
                <div className="section-recents">
                  <h2>Articles Récents</h2>
                  <div className="liste-recents">
                    {stockUtilisateur.slice(0, 3).map((item) => {
                      const stockInfo = getStockInfo(item.etat)
                      return (
                        <div className="item-recent" key={item.id}>
                          <div className="item-info">
                            <h3>{item.designation}</h3>
                            <p>Reçu le {item.dateReception}</p>
                          </div>
                          <div className="item-quantite">
                            <span className="quantite-valeur">{item.quantite}</span>
                            <span className="etat-stock" style={{ backgroundColor: stockInfo.color }}>
                              {stockInfo.icon}
                              <span>{stockInfo.text}</span>
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="section-recents">
                  <h2>Derniers Dispatches</h2>
                  <div className="liste-recents">
                    {dispatchesRecus.slice(0, 3).map((item) => {
                      const consommation = item.consommations.find((c) => c.agenceId === utilisateurCourant.agenceId)
                      return (
                        <div className="item-recent" key={item.id}>
                          <div className="item-info">
                            <h3>{item.designation}</h3>
                            <p>Reçu le {item.date}</p>
                          </div>
                          <div className="item-quantite">
                            <span className="quantite-valeur">{consommation ? consommation.quantite : 0}</span>
                            <span className="quantite-total">/ {item.quantite}</span>
                          </div>
                        </div>
                      )
                    })}
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
                    {stockUtilisateur.map((item) => {
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
                    })}
                  </tbody>
                </table>
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
                    {dispatchesRecus.map((item) => {
                      const consommation = item.consommations.find((c) => c.agenceId === utilisateurCourant.agenceId)
                      return (
                        <tr key={item.id}>
                          <td>{item.designation}</td>
                          <td>{item.quantite}</td>
                          <td>{consommation ? consommation.quantite : 0}</td>
                          <td>{item.date}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "inventaire" && (
            <div className="utilisateur-inventaire">
              <h2>Mon Inventaire</h2>
              {inventaireUtilisateur.length > 0 ? (
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
                      {inventaireUtilisateur.map((item) => (
                        <tr key={item.id}>
                          <td>{item.designation}</td>
                          <td>{item.categorie}</td>
                          <td>{item.quantite}</td>
                          <td>{item.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="message-vide">
                  <p>Aucun élément dans votre inventaire pour le moment.</p>
                </div>
              )}
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

