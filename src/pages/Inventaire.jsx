"use client"

import { useState, useEffect } from "react"
import "../styles/Inventaire.css"

function Inventaire() {
  const [inventaire, setInventaire] = useState([])
  const [filtreDesignation, setFiltreDesignation] = useState("")

  // Charger les données d'inventaire
  useEffect(() => {
    // Simulation de données d'inventaire
    const donneesMockees = [
      {
        id: 1,
        designation: "Ordinateur portable",
        date: "2023-03-15",
        quantite: 15,
      },
      {
        id: 2,
        designation: "Imprimante laser",
        date: "2023-03-15",
        quantite: 8,
      },
      {
        id: 3,
        designation: "Souris sans fil",
        date: "2023-03-10",
        quantite: 25,
      },
      {
        id: 4,
        designation: "Clavier ergonomique",
        date: "2023-03-10",
        quantite: 12,
      },
      {
        id: 5,
        designation: "Écran 24 pouces",
        date: "2023-03-05",
        quantite: 10,
      },
    ]

    setInventaire(donneesMockees)
  }, [])

  // Filtrer l'inventaire
  const inventaireFiltree = inventaire.filter((item) =>
    item.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  return (
    <div className="page-inventaire">
      <h1 className="titre-page">Inventaire</h1>

      <div className="section-inventaire">
        <div className="entete-section">
          <div className="filtre-inventaire">
            <input
              type="text"
              placeholder="Filtrer par désignation..."
              value={filtreDesignation}
              onChange={(e) => setFiltreDesignation(e.target.value)}
              className="champ-filtre"
            />
          </div>
        </div>

        <div className="liste-inventaire">
          <table>
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Date</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {inventaireFiltree.map((item) => (
                <tr key={item.id} className="item-inventaire">
                  <td>{item.designation}</td>
                  <td>{item.date}</td>
                  <td>{item.quantite}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Inventaire

