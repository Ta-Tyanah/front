"use client"

import { useState, useEffect } from "react"
import { useStock } from "../contexte/StockContexte"
import "../styles/Inventaire.css"
import { Search, Calendar, Filter, FileDown, Package, Computer, Brush, FileText } from "lucide-react"

function Inventaire() {
  // États pour les données
  const [stockData, setStockData] = useState([])
  const [dispatcheData, setDispatcheData] = useState([])
  const [westernUnionData, setWesternUnionData] = useState([])
  const [directionData, setDirectionData] = useState([])

  // États pour les filtres
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [filtreMois, setFiltreMois] = useState("")
  const [filtreAnnee, setFiltreAnnee] = useState("")

  // Récupérer les données du contexte
  const { lignesStock } = useStock()

  // Charger les données depuis localStorage
  useEffect(() => {
    // Récupérer les données
    const dispatchesSauvegardes = localStorage.getItem("dispatches") || "[]"
    const westernUnionsSauvegardes = localStorage.getItem("westernUnions") || "[]"
    const directionsSauvegardees = localStorage.getItem("directions") || "[]"

    // Filtrer les données selon les critères
    const filtrerDonnees = (donnees) => {
      return donnees.filter((item) => {
        // Filtre par désignation
        const matchDesignation =
          !filtreDesignation || item.designation.toLowerCase().includes(filtreDesignation.toLowerCase())

        // Filtre par date
        let dateItem
        if (item.dateEntree) {
          dateItem = new Date(item.dateEntree)
        } else if (item.date) {
          dateItem = new Date(item.date)
        } else {
          dateItem = new Date() // Fallback
        }

        const matchMois = !filtreMois || (dateItem.getMonth() + 1).toString() === filtreMois
        const matchAnnee = !filtreAnnee || dateItem.getFullYear().toString() === filtreAnnee

        return matchDesignation && matchMois && matchAnnee
      })
    }

    // Mettre à jour les données filtrées
    setStockData(filtrerDonnees(lignesStock))
    setDispatcheData(filtrerDonnees(JSON.parse(dispatchesSauvegardes)))
    setWesternUnionData(filtrerDonnees(JSON.parse(westernUnionsSauvegardes)))
    setDirectionData(filtrerDonnees(JSON.parse(directionsSauvegardees)))
  }, [lignesStock, filtreDesignation, filtreMois, filtreAnnee])

  // Obtenir l'icône correspondant à la catégorie
  const getIconeCategorie = (categorie) => {
    switch (categorie) {
      case "Produits Informatiques":
        return <Computer size={18} />
      case "Produits d'Entretien":
        return <Brush size={18} />
      case "Produits de Magasin":
        return <Package size={18} />
      case "Produits de Bureau":
        return <FileText size={18} />
      default:
        return <Package size={18} />
    }
  }

  // Fonction pour exporter l'inventaire en Excel (CSV)
  const exporterEnExcel = () => {
    // Créer les en-têtes du CSV
    const headers = ["Type", "Désignation", "Catégorie", "Date", "Quantité"]

    // Convertir les données en format CSV
    const csvData = [
      ...stockData.map((item) => [
        "Stock",
        item.designation,
        item.categorie,
        item.dateEntree || item.stockActuel.date,
        item.stockActuel.quantite,
      ]),
      ...dispatcheData.map((item) => ["Dispatche", item.designation, "Dispatche", item.date, item.quantite]),
      ...westernUnionData.map((item) => ["Western Union", item.designation, "Western Union", item.date, item.quantite]),
      ...directionData.map((item) => ["Direction", item.designation, "Direction", item.date, item.quantite]),
    ]

    // Ajouter les en-têtes au début
    csvData.unshift(headers)

    // Convertir en chaîne CSV
    const csvString = csvData.map((row) => row.join(",")).join("\n")

    // Créer un Blob et un lien de téléchargement
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")

    // Configurer le lien
    link.setAttribute("href", url)
    link.setAttribute("download", `inventaire_${new Date().toISOString().split("T")[0]}.csv`)
    link.style.visibility = "hidden"

    // Ajouter à la page, cliquer et supprimer
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Afficher un message de succès
    afficherMessage("Inventaire exporté avec succès!", "succes")
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

  // Générer les options pour les années
  const genererOptionsAnnees = () => {
    const anneeActuelle = new Date().getFullYear()
    const annees = []
    for (let i = anneeActuelle - 5; i <= anneeActuelle; i++) {
      annees.push(i)
    }
    return annees.reverse()
  }

  // Ajouter la classe d'animation à Inventaire
  return (
    <div className="page-inventaire animation-inventaire">
      <h1 className="titre-page">Inventaire Consolidé</h1>

      <div className="section-inventaire">
        <div className="entete-section">
          <div className="filtres-inventaire">
            <div className="champ-recherche-wrapper">
              <Search size={18} className="icone-recherche" />
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreDesignation}
                onChange={(e) => setFiltreDesignation(e.target.value)}
                className="champ-filtre"
              />
            </div>

            <div className="filtres-date">
              <div className="groupe-filtre">
                <label htmlFor="filtreMois">
                  <Calendar size={16} /> Mois:
                </label>
                <select
                  id="filtreMois"
                  value={filtreMois}
                  onChange={(e) => setFiltreMois(e.target.value)}
                  className="select-filtre"
                >
                  <option value="">Tous les mois</option>
                  <option value="1">Janvier</option>
                  <option value="2">Février</option>
                  <option value="3">Mars</option>
                  <option value="4">Avril</option>
                  <option value="5">Mai</option>
                  <option value="6">Juin</option>
                  <option value="7">Juillet</option>
                  <option value="8">Août</option>
                  <option value="9">Septembre</option>
                  <option value="10">Octobre</option>
                  <option value="11">Novembre</option>
                  <option value="12">Décembre</option>
                </select>
              </div>

              <div className="groupe-filtre">
                <label htmlFor="filtreAnnee">
                  <Filter size={16} /> Année:
                </label>
                <select
                  id="filtreAnnee"
                  value={filtreAnnee}
                  onChange={(e) => setFiltreAnnee(e.target.value)}
                  className="select-filtre"
                >
                  <option value="">Toutes les années</option>
                  {genererOptionsAnnees().map((annee) => (
                    <option key={annee} value={annee.toString()}>
                      {annee}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            className="bouton-exporter"
            onClick={exporterEnExcel}
            disabled={
              stockData.length === 0 &&
              dispatcheData.length === 0 &&
              westernUnionData.length === 0 &&
              directionData.length === 0
            }
          >
            <FileDown size={16} /> Exporter en Excel
          </button>
        </div>

        <div className="tableau-inventaire-wrapper">
          <div className="tableau-inventaire-scroll">
            <table className="tableau-inventaire-continu">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Désignation</th>
                  <th>Catégorie</th>
                  <th>Date</th>
                  <th>Quantité</th>
                  <th>Prix Unitaire</th>
                  <th>Montant</th>
                  <th>Consommations</th>
                </tr>
              </thead>
              <tbody>
                {/* Lignes de Stock */}
                {stockData.map((ligne) => (
                  <tr key={`stock-${ligne.id}`} className="item-inventaire source-stock">
                    <td>
                      <span className="badge-source stock">Stock</span>
                    </td>
                    <td>{ligne.designation}</td>
                    <td>
                      <div className="categorie-cell">
                        <span className="categorie-icon">{getIconeCategorie(ligne.categorie)}</span>
                        <span>{ligne.categorie}</span>
                      </div>
                    </td>
                    <td>{ligne.stockActuel.date}</td>
                    <td>{ligne.stockActuel.quantite}</td>
                    <td>{ligne.stockActuel.prixUnitaire}</td>
                    <td>{ligne.stockActuel.montant}</td>
                    <td>-</td>
                  </tr>
                ))}

                {/* Lignes de Dispatche */}
                {dispatcheData.map((dispatche) => (
                  <tr key={`dispatche-${dispatche.id}`} className="item-inventaire source-dispatche">
                    <td>
                      <span className="badge-source dispatche">Dispatche</span>
                    </td>
                    <td>{dispatche.designation}</td>
                    <td>Dispatche</td>
                    <td>{dispatche.date}</td>
                    <td>{dispatche.quantite}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {dispatche.consommations && dispatche.consommations.length > 0 ? (
                        <div className="consommations-liste">
                          {dispatche.consommations
                            .map((c, index) => {
                              const agence =
                                c.agenceId && localStorage.getItem("agences")
                                  ? JSON.parse(localStorage.getItem("agences")).find((a) => a.id === c.agenceId)
                                  : null
                              return agence && c.quantite > 0 ? (
                                <span key={index} className="badge-consommation">
                                  {agence.nom}: {c.quantite}
                                </span>
                              ) : null
                            })
                            .filter(Boolean)}
                        </div>
                      ) : (
                        <span className="no-consommation">Aucune</span>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Lignes de Western Union */}
                {westernUnionData.map((wu) => (
                  <tr key={`wu-${wu.id}`} className="item-inventaire source-western-union">
                    <td>
                      <span className="badge-source western-union">Western Union</span>
                    </td>
                    <td>{wu.designation}</td>
                    <td>Western Union</td>
                    <td>{wu.date}</td>
                    <td>{wu.quantite}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {wu.consommations && wu.consommations.length > 0 ? (
                        <div className="consommations-liste">
                          {wu.consommations
                            .map((c, index) => {
                              const agence =
                                c.agenceId && localStorage.getItem("agencesWU")
                                  ? JSON.parse(localStorage.getItem("agencesWU")).find((a) => a.id === c.agenceId)
                                  : null
                              return agence && c.quantite > 0 ? (
                                <span key={index} className="badge-consommation">
                                  {agence.nom}: {c.quantite}
                                </span>
                              ) : null
                            })
                            .filter(Boolean)}
                        </div>
                      ) : (
                        <span className="no-consommation">Aucune</span>
                      )}
                    </td>
                  </tr>
                ))}

                {/* Lignes de Direction */}
                {directionData.map((dir) => (
                  <tr key={`dir-${dir.id}`} className="item-inventaire source-direction">
                    <td>
                      <span className="badge-source direction">Direction</span>
                    </td>
                    <td>{dir.designation}</td>
                    <td>Direction</td>
                    <td>{dir.date}</td>
                    <td>{dir.quantite}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>
                      {dir.consommations && dir.consommations.length > 0 ? (
                        <div className="consommations-liste">
                          {dir.consommations
                            .map((c, index) => {
                              const agence =
                                c.agenceId && localStorage.getItem("agencesDir")
                                  ? JSON.parse(localStorage.getItem("agencesDir")).find((a) => a.id === c.agenceId)
                                  : null
                              return agence && c.quantite > 0 ? (
                                <span key={index} className="badge-consommation">
                                  {agence.nom}: {c.quantite}
                                </span>
                              ) : null
                            })
                            .filter(Boolean)}
                        </div>
                      ) : (
                        <span className="no-consommation">Aucune</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {stockData.length === 0 &&
          dispatcheData.length === 0 &&
          westernUnionData.length === 0 &&
          directionData.length === 0 && (
            <div className="no-data-message">Aucune donnée ne correspond aux critères de recherche.</div>
          )}

        <div className="statistiques-inventaire">
          <div className="stat-item">
            <div className="stat-label">Stock:</div>
            <div className="stat-value">{stockData.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Dispatche:</div>
            <div className="stat-value">{dispatcheData.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Western Union:</div>
            <div className="stat-value">{westernUnionData.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Direction:</div>
            <div className="stat-value">{directionData.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventaire

