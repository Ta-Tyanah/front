"use client"

import { useState } from "react"
import { useStock } from "../contexte/StockContexte"
import "../styles/Inventaire.css"
import { Search, Package, Computer, Brush, FileText, FileDown } from "lucide-react"

function Inventaire() {
  const { inventaire } = useStock()
  const [filtreDesignation, setFiltreDesignation] = useState("")

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

  // Filtrer l'inventaire
  const inventaireFiltree = inventaire.filter((item) =>
    item.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Fonction pour exporter l'inventaire en Excel (CSV)
  const exporterEnExcel = () => {
    // Créer les en-têtes du CSV
    const headers = ["Désignation", "Catégorie", "Date", "Quantité"]

    // Convertir les données en format CSV
    const csvData = inventaireFiltree.map((item) => [item.designation, item.categorie, item.date, item.quantite])

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

  return (
    <div className="page-inventaire">
      <h1 className="titre-page">Inventaire</h1>

      <div className="section-inventaire">
        <div className="entete-section">
          <div className="filtre-inventaire">
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
          </div>
          <button className="bouton-exporter" onClick={exporterEnExcel} disabled={inventaire.length === 0}>
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
              </tr>
            </thead>
            <tbody>
              {inventaireFiltree.length > 0 ? (
                inventaireFiltree.map((item) => (
                  <tr key={item.id} className="item-inventaire">
                    <td>{item.designation}</td>
                    <td>
                      <div className="categorie-cell">
                        <span className="categorie-icon">{getIconeCategorie(item.categorie)}</span>
                        <span>{item.categorie}</span>
                      </div>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.quantite}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="no-data">
                    Aucun élément dans l'inventaire. Utilisez le bouton "Enregistrer l'inventaire" dans la page Stock.
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

export default Inventaire

