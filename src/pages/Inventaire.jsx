"use client"

import { useState, useEffect } from "react"
import { useStock } from "../contexte/StockContexte"
import "../styles/Inventaire.css"
import { Search, Calendar, Filter, FileDown, Package, Computer, Brush, FileText } from "lucide-react"

function Inventaire() {
  // États pour les données
  const [inventaireConsolide, setInventaireConsolide] = useState([])
  const [inventaireFiltree, setInventaireFiltree] = useState([])

  // États pour les filtres
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [filtreMois, setFiltreMois] = useState("")
  const [filtreAnnee, setFiltreAnnee] = useState("")

  // Récupérer les données du contexte
  const { inventaire } = useStock()

  // Charger les données de dispatche et western union depuis localStorage
  useEffect(() => {
    // Récupérer les données
    const dispatchesSauvegardes = localStorage.getItem("dispatches") || "[]"
    const westernUnionsSauvegardes = localStorage.getItem("westernUnions") || "[]"
    const directionsSauvegardees = localStorage.getItem("directions") || "[]"

    const dispatches = JSON.parse(dispatchesSauvegardes)
    const westernUnions = JSON.parse(westernUnionsSauvegardes)
    const directions = JSON.parse(directionsSauvegardees)

    // Combiner toutes les données en un seul tableau
    const toutesLesDonnees = [
      ...inventaire.map((item) => ({
        ...item,
        source: "Stock",
        dateReference: item.dateEntree || item.date,
      })),
      ...dispatches.map((item) => ({
        id: `d-${item.id}`,
        designation: item.designation,
        categorie: "Dispatche",
        quantite: item.quantite,
        date: item.date,
        dateReference: item.date,
        source: "Dispatche",
      })),
      ...westernUnions.map((item) => ({
        id: `wu-${item.id}`,
        designation: item.designation,
        categorie: "Western Union",
        quantite: item.quantite,
        date: item.date,
        dateReference: item.date,
        source: "Western Union",
      })),
      ...directions.map((item) => ({
        id: `dir-${item.id}`,
        designation: item.designation,
        categorie: "Direction",
        quantite: item.quantite,
        date: item.date,
        dateReference: item.date,
        source: "Direction",
      })),
    ]

    // Trier par date (du plus récent au plus ancien)
    const donneeTriees = toutesLesDonnees.sort((a, b) => {
      return new Date(b.dateReference) - new Date(a.dateReference)
    })

    setInventaireConsolide(donneeTriees)
    setInventaireFiltree(donneeTriees)
  }, [inventaire])

  // Appliquer les filtres lorsqu'ils changent
  useEffect(() => {
    let resultats = [...inventaireConsolide]

    // Filtre par désignation
    if (filtreDesignation) {
      resultats = resultats.filter((item) => item.designation.toLowerCase().includes(filtreDesignation.toLowerCase()))
    }

    // Filtre par mois
    if (filtreMois) {
      resultats = resultats.filter((item) => {
        const date = new Date(item.dateReference)
        return (date.getMonth() + 1).toString() === filtreMois
      })
    }

    // Filtre par année
    if (filtreAnnee) {
      resultats = resultats.filter((item) => {
        const date = new Date(item.dateReference)
        return date.getFullYear().toString() === filtreAnnee
      })
    }

    setInventaireFiltree(resultats)
  }, [filtreDesignation, filtreMois, filtreAnnee, inventaireConsolide])

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
      case "Dispatche":
        return <Package size={18} className="icone-dispatche" />
      case "Western Union":
        return <Package size={18} className="icone-western-union" />
      case "Direction":
        return <Package size={18} className="icone-direction" />
      default:
        return <Package size={18} />
    }
  }

  // Fonction pour exporter l'inventaire en Excel (CSV)
  const exporterEnExcel = () => {
    // Créer les en-têtes du CSV
    const headers = ["Désignation", "Catégorie", "Date", "Quantité", "Source"]

    // Convertir les données en format CSV
    const csvData = inventaireFiltree.map((item) => [
      item.designation,
      item.categorie,
      item.dateReference,
      item.quantite,
      item.source,
    ])

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

  return (
    <div className="page-inventaire">
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

          <button className="bouton-exporter" onClick={exporterEnExcel} disabled={inventaireFiltree.length === 0}>
            <FileDown size={16} /> Exporter en Excel
          </button>
        </div>

        <div className="liste-inventaire">
          <table>
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Catégorie</th>
                <th>Date</th>
                <th>Quantité</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>
              {inventaireFiltree.length > 0 ? (
                inventaireFiltree.map((item) => (
                  <tr key={item.id} className={`item-inventaire source-${item.source.toLowerCase().replace(" ", "-")}`}>
                    <td>{item.designation}</td>
                    <td>
                      <div className="categorie-cell">
                        <span className="categorie-icon">{getIconeCategorie(item.categorie)}</span>
                        <span>{item.categorie}</span>
                      </div>
                    </td>
                    <td>{new Date(item.dateReference).toLocaleDateString()}</td>
                    <td>{item.quantite}</td>
                    <td>
                      <span className={`badge-source ${item.source.toLowerCase().replace(" ", "-")}`}>
                        {item.source}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    Aucun élément dans l'inventaire correspondant aux critères de recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="statistiques-inventaire">
          <div className="stat-item">
            <div className="stat-label">Total des articles:</div>
            <div className="stat-value">{inventaireFiltree.length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Articles en stock:</div>
            <div className="stat-value">{inventaireFiltree.filter((item) => item.source === "Stock").length}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">Articles dispatche:</div>
            <div className="stat-value">
              {
                inventaireFiltree.filter((item) => ["Dispatche", "Western Union", "Direction"].includes(item.source))
                  .length
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventaire

