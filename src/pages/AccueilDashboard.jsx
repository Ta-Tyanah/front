"use client"

import { useState, useEffect, useRef } from "react"
import "../styles/Dashboard.css"
import "../styles/AccueilDashboard.css"
import { Package, Truck, Building2, Users, Calendar, Clock, Filter } from "lucide-react"
import Header from "../composants/Header"
import SidebarMenu from "../composants/SidebarMenu"

function AccueilDashboard() {
  const [activitesRecentes, setActivitesRecentes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("mensuel")
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString())
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)

  // Références pour les canvas
  const donutChartRef = useRef(null)
  const barChartRef = useRef(null)
  const lineChartRef = useRef(null)
  const semiCircleRef = useRef(null)

  // Statistiques résumées
  const resumeStats = [
    {
      titre: "Total Stock",
      valeur: 254,
      icone: <Package size={20} />,
      couleur: "#e50000",
    },
    {
      titre: "Dispatches",
      valeur: 128,
      icone: <Truck size={20} />,
      couleur: "#333333",
    },
    {
      titre: "Immobiliers",
      valeur: 45,
      icone: <Building2 size={20} />,
      couleur: "#777777",
    },
    {
      titre: "Utilisateurs",
      valeur: 12,
      icone: <Users size={20} />,
      couleur: "#e50000",
    },
  ]

  // Ajouter useEffect pour charger les activités récentes depuis localStorage
  useEffect(() => {
    // Créer des activités fictives
    const activitesData = [
      {
        id: 1,
        type: "Stock",
        description: "Ajout de 20 ordinateurs portables",
        date: "Aujourd'hui, 10:30",
        statut: "Complété",
      },
      {
        id: 2,
        type: "Dispatche",
        description: "Envoi de fournitures à l'Agence A",
        date: "Aujourd'hui, 09:15",
        statut: "En cours",
      },
      {
        id: 3,
        type: "Western Union",
        description: "Transfert de fonds effectué",
        date: "Hier, 16:45",
        statut: "Complété",
      },
      {
        id: 4,
        type: "Direction",
        description: "Demande de matériel approuvée",
        date: "Hier, 14:20",
        statut: "Complété",
      },
      { id: 5, type: "Stock", description: "Mise à jour de l'inventaire", date: "22/03/2023", statut: "Complété" },
    ]

    setActivitesRecentes(activitesData)

    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    // Nettoyer le timer lors du démontage du composant
    return () => clearTimeout(timer)
  }, [])

  // Dessiner les graphiques après le chargement
  useEffect(() => {
    if (!isLoading) {
      // Dessiner le graphique en donut
      if (donutChartRef.current) {
        const ctx = donutChartRef.current.getContext("2d")
        drawDonutChart(ctx)
      }

      // Dessiner le graphique en barres
      if (barChartRef.current) {
        const ctx = barChartRef.current.getContext("2d")
        drawBarChart(ctx)
      }

      // Dessiner le graphique en ligne
      if (lineChartRef.current) {
        const ctx = lineChartRef.current.getContext("2d")
        drawLineChart(ctx)
      }

      // Dessiner le graphique semi-circulaire
      if (semiCircleRef.current) {
        const ctx = semiCircleRef.current.getContext("2d")
        drawSemiCircleChart(ctx)
      }
    }
  }, [isLoading])

  // Fonction pour dessiner un graphique en donut
  const drawDonutChart = (ctx) => {
    const data = [35, 25, 20, 15, 5]
    const colors = ["#e50000", "#ff6b6b", "#ffa5a5", "#333333", "#777777"]
    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8
    const innerRadius = radius * 0.5

    let startAngle = 0

    data.forEach((value, index) => {
      const sliceAngle = (value / 100) * 2 * Math.PI

      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle)
      ctx.arc(centerX, centerY, innerRadius, startAngle + sliceAngle, startAngle, true)
      ctx.closePath()

      ctx.fillStyle = colors[index]
      ctx.fill()

      startAngle += sliceAngle
    })

    // Cercle blanc au centre
    ctx.beginPath()
    ctx.arc(centerX, centerY, innerRadius - 1, 0, 2 * Math.PI)
    ctx.fillStyle = "white"
    ctx.fill()
  }

  // Fonction pour dessiner un graphique en barres
  const drawBarChart = (ctx) => {
    const data = [65, 80, 45, 90, 55, 70]
    const labels = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"]
    const barWidth = ctx.canvas.width / (data.length * 2)
    const maxValue = Math.max(...data)
    const barColor = "#333333"

    // Dessiner les barres
    data.forEach((value, index) => {
      const barHeight = (value / maxValue) * (ctx.canvas.height - 40)
      const x = index * barWidth * 2 + barWidth / 2
      const y = ctx.canvas.height - barHeight - 20

      ctx.fillStyle = barColor
      ctx.fillRect(x, y, barWidth, barHeight)

      // Ajouter les labels
      ctx.fillStyle = "#666"
      ctx.font = "10px Arial"
      ctx.textAlign = "center"
      ctx.fillText(labels[index], x + barWidth / 2, ctx.canvas.height - 5)
    })
  }

  // Fonction pour dessiner un graphique en ligne
  const drawLineChart = (ctx) => {
    const data = [30, 50, 45, 70, 65, 80]
    const width = ctx.canvas.width
    const height = ctx.canvas.height
    const maxValue = Math.max(...data)
    const padding = 20

    // Dessiner la ligne
    ctx.beginPath()
    ctx.moveTo(padding, height - padding - (data[0] / maxValue) * (height - 2 * padding))

    for (let i = 1; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
      const y = height - padding - (data[i] / maxValue) * (height - 2 * padding)
      ctx.lineTo(x, y)
    }

    ctx.strokeStyle = "#e50000"
    ctx.lineWidth = 2
    ctx.stroke()

    // Ajouter des points
    for (let i = 0; i < data.length; i++) {
      const x = padding + (i / (data.length - 1)) * (width - 2 * padding)
      const y = height - padding - (data[i] / maxValue) * (height - 2 * padding)

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fillStyle = "#e50000"
      ctx.fill()
    }
  }

  // Fonction pour dessiner un graphique semi-circulaire
  const drawSemiCircleChart = (ctx) => {
    const centerX = ctx.canvas.width / 2
    const centerY = ctx.canvas.height - 20
    const radius = Math.min(centerX, centerY) * 0.8

    // Dessiner l'arc de fond
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, 0)
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 15
    ctx.stroke()

    // Dessiner l'arc de progression (70%)
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, Math.PI - Math.PI * 0.7)
    ctx.strokeStyle = "#e50000"
    ctx.lineWidth = 15
    ctx.stroke()

    // Ajouter le texte
    ctx.fillStyle = "#333"
    ctx.font = "bold 16px Arial"
    ctx.textAlign = "center"
    ctx.fillText("70%", centerX, centerY - 20)
  }

  const basculerMenuMobile = () => {
    setMenuMobileOuvert(!menuMobileOuvert)
  }

  if (isLoading) {
    return (
      <div className="ecran-chargement">
        <div className="loader"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    )
  }

  return (
    <div className="dashboard-conteneur">
      <Header />

      <div className="dashboard-corps">
        <SidebarMenu menuMobileOuvert={menuMobileOuvert} setMenuMobileOuvert={setMenuMobileOuvert} />

        <main className="dashboard-contenu">
          <div className="accueil-dashboard animation-accueil">
            <h1 className="titre-page">Tableau de bord</h1>

            {/* Filtres de période */}
            <div className="filtres-dashboard">
              <div className="filtre-groupe">
                <label>
                  <Calendar size={16} /> Période:
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="select-filtre"
                >
                  <option value="hebdomadaire">Hebdomadaire</option>
                  <option value="mensuel">Mensuel</option>
                  <option value="annuel">Annuel</option>
                </select>
              </div>

              <div className="filtre-groupe">
                <label>
                  <Filter size={16} /> Année:
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="select-filtre"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            {/* Cartes de statistiques */}
            <div className="stats-cards">
              {resumeStats.map((stat, index) => (
                <div className="stat-card" key={index}>
                  <div className="stat-icon" style={{ backgroundColor: `${stat.couleur}20` }}>
                    {stat.icone}
                  </div>
                  <div className="stat-info">
                    <h3>{stat.titre}</h3>
                    <div className="stat-value">{stat.valeur}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Première rangée de graphiques */}
            <div className="dashboard-row">
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Répartition par catégorie</h2>
                  <div className="card-actions">
                    <button className="btn-card-action">Filtrer</button>
                  </div>
                </div>
                <div className="card-content chart-container">
                  <canvas ref={donutChartRef} width="300" height="200"></canvas>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: "#e50000" }}></span>
                      <span className="legend-label">Produits Informatiques</span>
                      <span className="legend-value">35%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: "#ff6b6b" }}></span>
                      <span className="legend-label">Produits d'Entretien</span>
                      <span className="legend-value">25%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: "#ffa5a5" }}></span>
                      <span className="legend-label">Produits de Magasin</span>
                      <span className="legend-value">20%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: "#333333" }}></span>
                      <span className="legend-label">Produits de Bureau</span>
                      <span className="legend-value">15%</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color" style={{ backgroundColor: "#777777" }}></span>
                      <span className="legend-label">Autres</span>
                      <span className="legend-value">5%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Consommation mensuelle</h2>
                  <div className="card-actions">
                    <button className="btn-card-action">Filtrer</button>
                  </div>
                </div>
                <div className="card-content chart-container">
                  <canvas ref={barChartRef} width="300" height="200"></canvas>
                </div>
              </div>
            </div>

            {/* Deuxième rangée de graphiques */}
            <div className="dashboard-row">
              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Tendance du stock</h2>
                  <div className="card-actions">
                    <button className="btn-card-action">Filtrer</button>
                  </div>
                </div>
                <div className="card-content chart-container">
                  <canvas ref={lineChartRef} width="300" height="200"></canvas>
                </div>
              </div>

              <div className="dashboard-card">
                <div className="card-header">
                  <h2>Taux d'utilisation</h2>
                  <div className="card-actions">
                    <button className="btn-card-action">Filtrer</button>
                  </div>
                </div>
                <div className="card-content chart-container">
                  <canvas ref={semiCircleRef} width="300" height="200"></canvas>
                </div>
              </div>
            </div>

            {/* Section des activités récentes */}
            <div className="dashboard-card activites-recentes">
              <div className="card-header">
                <h2>
                  <Clock size={18} /> Activités récentes
                </h2>
                <div className="card-actions">
                  <button className="btn-card-action">Voir tout</button>
                </div>
              </div>
              <div className="card-content">
                <table className="tableau-activites">
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

export default AccueilDashboard

