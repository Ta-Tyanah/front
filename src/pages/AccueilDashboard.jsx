"use client"

import { useState, useEffect } from "react"
import { Package, Truck, Building2, Users, Calendar, Filter } from "lucide-react"
import "../styles/AccueilDashboard.css"

const AccueilDashboard = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [periode, setPeriode] = useState("Mensuel")
  const [annee, setAnnee] = useState("2025")

  // Simuler un chargement
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="ecran-chargement">
        <div className="loader"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    )
  }

  // Données pour les graphiques
  const donutData = [
    { label: "Produit A", value: 35, color: "#6a2c94", montant: "132.3K" },
    { label: "Produit B", value: 25, color: "#b74f6f", montant: "93.8K" },
    { label: "Produit C", value: 15, color: "#f67280", montant: "56.5K" },
    { label: "Produit D", value: 10, color: "#f8b195", montant: "32.6K" },
    { label: "Produit E", value: 5, color: "#84ceeb", montant: "16.5K" },
    { label: "Produit F", value: 10, color: "#5ab9ea", montant: "7.9K" },
  ]

  const barData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept"],
    datasets: [
      { label: "Produit A", data: [150, 200, 300, 250, 220, 350, 200, 230, 280], color: "#6a2c94" },
      { label: "Produit B", data: [100, 150, 200, 180, 120, 250, 100, 180, 220], color: "#b74f6f" },
      { label: "Produit C", data: [80, 100, 120, 90, 70, 150, 80, 100, 130], color: "#f67280" },
    ],
  }

  const lineData = {
    labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sept", "Oct", "Nov", "Déc"],
    data: [5000, 5200, 5700, 5300, 5800, 6200, 6000, 6500, 7100, 6800, 7200, 7500],
  }

  const dailyData = {
    labels: ["8h", "9h", "10h", "11h", "12h", "13h", "14h", "15h", "16h", "17h"],
    data: [42, 45, 48, 38, 27, 35, 32, 28, 24, 20],
  }

  const assetData = [
    { name: "Asset A", value: 354542.02, change: "+20.25%", color: "#f67280" },
    { name: "Asset B", value: 254242.32, change: "+15.75%", color: "#b74f6f" },
    { name: "Asset C", value: 94555.01, change: "+8.32%", color: "#6a2c94" },
    { name: "Asset D", value: 45430.0, change: "+20.25%", color: "#5ab9ea" },
    { name: "Asset E", value: 24370.0, change: "+12.45%", color: "#84ceeb" },
    { name: "Asset F", value: 18350.0, change: "+5.78%", color: "#f8b195" },
  ]

  const gaugeValue = 32455
  const gaugeMax = 50000
  const gaugePercent = (gaugeValue / gaugeMax) * 100

  const performanceData = [
    { label: "Audience", value: 45 },
    { label: "Earnings", value: 25 },
    { label: "Orders", value: 15 },
    { label: "Sales", value: 10 },
    { label: "Marketing", value: 5 },
  ]

  return (
    <div className="accueil-dashboard">
      <h1 className="titre-page">Tableau de bord</h1>

      {/* Filtres de période */}
      <div className="filtres-dashboard">
        <div className="filtre-groupe">
          <label>
            <Calendar size={16} /> Période:
          </label>
          <select value={periode} onChange={(e) => setPeriode(e.target.value)} className="select-filtre">
            <option value="Mensuel">Mensuel</option>
            <option value="Trimestriel">Trimestriel</option>
            <option value="Annuel">Annuel</option>
          </select>
        </div>
        <div className="filtre-groupe">
          <label>
            <Filter size={16} /> Année:
          </label>
          <select value={annee} onChange={(e) => setAnnee(e.target.value)} className="select-filtre">
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
      </div>

      {/* Cartes de statistiques */}
      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-header">
            <h3>Total Stock</h3>
          </div>
          <div className="stat-content">
            <div className="stat-icon">
              <Package size={24} />
            </div>
            <div className="stat-value">254</div>
          </div>
          <div className="stat-footer">
            <div className="stat-evolution positive">+12%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Dispatches</h3>
          </div>
          <div className="stat-content">
            <div className="stat-icon">
              <Truck size={24} />
            </div>
            <div className="stat-value">128</div>
          </div>
          <div className="stat-footer">
            <div className="stat-evolution positive">+5%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Immobiliers</h3>
          </div>
          <div className="stat-content">
            <div className="stat-icon">
              <Building2 size={24} />
            </div>
            <div className="stat-value">45</div>
          </div>
          <div className="stat-footer">
            <div className="stat-evolution positive">+8%</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-header">
            <h3>Utilisateurs</h3>
          </div>
          <div className="stat-content">
            <div className="stat-icon">
              <Users size={24} />
            </div>
            <div className="stat-value">12</div>
          </div>
          <div className="stat-footer">
            <div className="stat-evolution positive">+2%</div>
          </div>
        </div>
      </div>

      {/* Première rangée de graphiques */}
      <div className="dashboard-row">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Répartition des ventes</h2>
            <div className="card-actions">
              <button className="btn-card-action">{/* <FaDownload size={14} /> */} Exporter</button>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="donut-chart">
                <svg width="200" height="200" viewBox="0 0 42 42">
                  <circle
                    cx="21"
                    cy="21"
                    r="15.91549430918954"
                    fill="transparent"
                    stroke="#e6e6e6"
                    strokeWidth="3"
                  ></circle>

                  {donutData.map((item, index) => {
                    const previousEndAngle = donutData.slice(0, index).reduce((sum, d) => sum + d.value, 0)
                    const startAngle = (previousEndAngle / 100) * 2 * Math.PI - Math.PI / 2
                    const endAngle = ((previousEndAngle + item.value) / 100) * 2 * Math.PI - Math.PI / 2

                    const x1 = 21 + 15.91549430918954 * Math.cos(startAngle)
                    const y1 = 21 + 15.91549430918954 * Math.sin(startAngle)
                    const x2 = 21 + 15.91549430918954 * Math.cos(endAngle)
                    const y2 = 21 + 15.91549430918954 * Math.sin(endAngle)

                    const largeArcFlag = item.value > 50 ? 1 : 0

                    const pathData = [
                      `M ${x1} ${y1}`,
                      `A 15.91549430918954 15.91549430918954 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                      `L 21 21`,
                      `Z`,
                    ].join(" ")

                    return <path key={index} d={pathData} fill={item.color}></path>
                  })}

                  <circle cx="21" cy="21" r="10" fill="white"></circle>
                </svg>
              </div>
              <div className="donut-legend">
                {donutData.map((item, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: item.color }}></div>
                    <div className="legend-label">{item.label}</div>
                    <div className="legend-value">{item.value}%</div>
                    <div className="legend-montant">{item.montant}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Évolution des ventes</h2>
            <div className="card-actions">
              <button className="btn-card-action">{/* <FaDownload size={14} /> */} Exporter</button>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="bar-chart">
                <svg width="100%" height="200" viewBox="0 0 600 200">
                  {/* Axe X */}
                  <line x1="40" y1="170" x2="580" y2="170" stroke="#e6e6e6" strokeWidth="1" />

                  {/* Axe Y */}
                  <line x1="40" y1="20" x2="40" y2="170" stroke="#e6e6e6" strokeWidth="1" />

                  {/* Lignes horizontales */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#e6e6e6" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="40" y1="70" x2="580" y2="70" stroke="#e6e6e6" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="40" y1="120" x2="580" y2="120" stroke="#e6e6e6" strokeWidth="0.5" strokeDasharray="5,5" />

                  {/* Labels axe X */}
                  {barData.labels.map((label, index) => (
                    <text key={index} x={60 + index * 60} y="185" textAnchor="middle" fontSize="10" fill="#666">
                      {label}
                    </text>
                  ))}

                  {/* Barres */}
                  {barData.datasets.map((dataset, datasetIndex) =>
                    dataset.data.map((value, index) => {
                      const barWidth = 15
                      const x = 60 + index * 60 - barWidth * 1.5 + datasetIndex * barWidth
                      const barHeight = (value / 350) * 150
                      const y = 170 - barHeight

                      return (
                        <rect
                          key={`${datasetIndex}-${index}`}
                          x={x}
                          y={y}
                          width={barWidth}
                          height={barHeight}
                          fill={dataset.color}
                          opacity="0.8"
                        />
                      )
                    }),
                  )}
                </svg>
              </div>
              <div className="bar-legend">
                {barData.datasets.map((dataset, index) => (
                  <div key={index} className="legend-item">
                    <div className="legend-color" style={{ backgroundColor: dataset.color }}></div>
                    <div className="legend-label">{dataset.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Résumé financier</h2>
          </div>
          <div className="card-content">
            <div className="financial-summary">
              <div className="financial-total">
                <div className="financial-label">Total des ventes</div>
                <div className="financial-value">354,542.02</div>
                <div className="financial-change positive">+20.25%</div>
              </div>
              <div className="financial-details">
                {assetData.slice(0, 3).map((asset, index) => (
                  <div key={index} className="financial-item">
                    <div className="financial-item-header">
                      <div className="financial-item-name">{asset.name}</div>
                      <div className="financial-item-change positive">{asset.change}</div>
                    </div>
                    <div className="financial-item-value">
                      {asset.value.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deuxième rangée de graphiques */}
      <div className="dashboard-row">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Paiements quotidiens</h2>
            <div className="card-actions">
              <button className="btn-card-action">Voir tout</button>
            </div>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="daily-stats">
                <div className="daily-percent">
                  <div className="daily-percent-value">55%</div>
                  <div className="daily-percent-label">Paiement quotidien</div>
                </div>
                <div className="daily-chart">
                  <svg width="100%" height="100" viewBox="0 0 400 100">
                    {/* Axe X */}
                    <line x1="0" y1="80" x2="400" y2="80" stroke="#e6e6e6" strokeWidth="1" />

                    {/* Points et lignes */}
                    {dailyData.data.map((value, index) => {
                      const x = index * (400 / (dailyData.data.length - 1))
                      const y = 80 - (value / 50) * 60

                      return (
                        <g key={index}>
                          {index > 0 && (
                            <line
                              x1={(index - 1) * (400 / (dailyData.data.length - 1))}
                              y1={80 - (dailyData.data[index - 1] / 50) * 60}
                              x2={x}
                              y2={y}
                              stroke="#6a2c94"
                              strokeWidth="2"
                            />
                          )}
                          <circle cx={x} cy={y} r="4" fill={index === 3 ? "#e50000" : "#6a2c94"} />
                        </g>
                      )
                    })}

                    {/* Labels axe X */}
                    {dailyData.labels.map((label, index) => {
                      if (index % 2 === 0) {
                        return (
                          <text
                            key={index}
                            x={index * (400 / (dailyData.labels.length - 1))}
                            y="95"
                            textAnchor="middle"
                            fontSize="10"
                            fill="#666"
                          >
                            {label}
                          </text>
                        )
                      }
                      return null
                    })}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Distribution des produits</h2>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="product-distribution">
                <div className="distribution-stats">
                  <div className="distribution-stat">
                    <div className="distribution-value">5,715</div>
                    <div className="distribution-label">Total</div>
                  </div>
                  <div className="distribution-chart">
                    <svg width="100%" height="80" viewBox="0 0 300 80">
                      {/* Barres */}
                      {[40, 25, 35, 20, 30, 45, 25, 35, 50, 30, 25, 20].map((value, index) => {
                        const barWidth = 18
                        const gap = 6
                        const x = index * (barWidth + gap)
                        const barHeight = (value / 50) * 70
                        const y = 80 - barHeight

                        return (
                          <rect
                            key={index}
                            x={x}
                            y={y}
                            width={barWidth}
                            height={barHeight}
                            fill={index === 8 ? "#e50000" : "#6a2c94"}
                            opacity="0.8"
                            rx="2"
                            ry="2"
                          />
                        )
                      })}
                    </svg>
                  </div>
                </div>
                <div className="distribution-details">
                  <div className="distribution-detail">
                    <div className="detail-label">Mensuel</div>
                    <div className="detail-value">$4,500</div>
                    <div className="detail-date">Juin 7</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Performance</h2>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="gauge-chart">
                <svg width="200" height="120" viewBox="0 0 200 120">
                  <path
                    d="M 10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="20"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 100 A 90 90 0 0 1 190 100"
                    fill="none"
                    stroke="#6a2c94"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${gaugePercent * 2.8} 280`}
                  />
                  <text x="100" y="85" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#333">
                    {gaugeValue.toLocaleString()}
                  </text>
                </svg>
              </div>
              <div className="performance-stats">
                {performanceData.map((item, index) => (
                  <div key={index} className="performance-item">
                    <div className="performance-label">
                      <div
                        className="performance-dot"
                        style={{ backgroundColor: index === 0 ? "#e50000" : "#6a2c94" }}
                      ></div>
                      {item.label}
                    </div>
                    <div className="performance-value">{item.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Troisième rangée de graphiques */}
      <div className="dashboard-row">
        <div className="dashboard-card">
          <div className="card-header">
            <h2>Tendance des ventes</h2>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="line-chart">
                <svg width="100%" height="150" viewBox="0 0 600 150">
                  {/* Axe X */}
                  <line x1="40" y1="120" x2="580" y2="120" stroke="#e6e6e6" strokeWidth="1" />

                  {/* Axe Y */}
                  <line x1="40" y1="20" x2="40" y2="120" stroke="#e6e6e6" strokeWidth="1" />

                  {/* Lignes horizontales */}
                  <line x1="40" y1="20" x2="580" y2="20" stroke="#e6e6e6" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="40" y1="53" x2="580" y2="53" stroke="#e6e6e6" strokeWidth="0.5" strokeDasharray="5,5" />
                  <line x1="40" y1="86" x2="580" y2="86" stroke="#e6e6e6" strokeWidth="0.5" strokeDasharray="5,5" />

                  {/* Labels axe X */}
                  {lineData.labels.map((label, index) => {
                    if (index % 2 === 0) {
                      return (
                        <text
                          key={index}
                          x={40 + index * (540 / (lineData.labels.length - 1))}
                          y="135"
                          textAnchor="middle"
                          fontSize="10"
                          fill="#666"
                        >
                          {label}
                        </text>
                      )
                    }
                    return null
                  })}

                  {/* Ligne */}
                  <path
                    d={lineData.data
                      .map((value, index) => {
                        const x = 40 + index * (540 / (lineData.data.length - 1))
                        const y = 120 - ((value - 5000) / 2500) * 100
                        return (index === 0 ? "M" : "L") + `${x} ${y}`
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#e50000"
                    strokeWidth="2"
                  />

                  {/* Points */}
                  {lineData.data.map((value, index) => {
                    const x = 40 + index * (540 / (lineData.data.length - 1))
                    const y = 120 - ((value - 5000) / 2500) * 100

                    return <circle key={index} cx={x} cy={y} r="4" fill="#e50000" stroke="#fff" strokeWidth="2" />
                  })}
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h2>Répartition des produits</h2>
          </div>
          <div className="card-content">
            <div className="chart-container">
              <div className="product-circles">
                {[
                  { percent: 90, value: "$15,000", label: "Produit A" },
                  { percent: 50, value: "$10,500", label: "Produit B" },
                  { percent: 25, value: "$15,000", label: "Produit C" },
                ].map((item, index) => (
                  <div key={index} className="product-circle">
                    <svg width="80" height="80" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke="#e6e6e6"
                        strokeWidth="3"
                      ></circle>
                      <circle
                        cx="18"
                        cy="18"
                        r="15.91549430918954"
                        fill="transparent"
                        stroke={index === 0 ? "#e50000" : "#6a2c94"}
                        strokeWidth="3"
                        strokeDasharray={`${item.percent} 100`}
                        strokeDashoffset="25"
                      ></circle>
                      <text
                        x="18"
                        y="18"
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fontSize="10"
                        fontWeight="bold"
                        fill="#333"
                      >
                        {item.percent}%
                      </text>
                    </svg>
                    <div className="product-circle-info">
                      <div className="product-circle-value">{item.value}</div>
                      <div className="product-circle-label">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccueilDashboard

