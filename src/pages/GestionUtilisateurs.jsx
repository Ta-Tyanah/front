"use client"

import { useState } from "react"
import { FaSearch, FaFilter, FaArrowRight, FaExclamationTriangle, FaBoxOpen, FaChartLine } from "react-icons/fa"
import "../styles/GestionUtilisateurs.css"

const GestionUtilisateurs = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("Tous les types")
  const [selectedUser, setSelectedUser] = useState(null)
  const [showModal, setShowModal] = useState(false)

  // Données fictives des utilisateurs
  const users = [
    {
      id: 1,
      nom: "Rakoto",
      role: "Gestionnaire d'agence",
      agence: "CEM01",
      stockCritique: true,
      stockLevel: 0,
      stockItems: [
        { id: 1, designation: "Ordinateur portable", quantite: 2, seuil: 5, cmup: 1200000 },
        { id: 2, designation: "Imprimante", quantite: 1, seuil: 3, cmup: 450000 },
        { id: 3, designation: "Cartouche d'encre", quantite: 0, seuil: 10, cmup: 75000 },
      ],
    },
    {
      id: 2,
      nom: "Rabe",
      role: "Responsable Western Union",
      agence: "WU01",
      stockCritique: true,
      stockLevel: 0,
      stockItems: [
        { id: 1, designation: "Formulaire WU", quantite: 5, seuil: 50, cmup: 2000 },
        { id: 2, designation: "Tampon", quantite: 1, seuil: 2, cmup: 15000 },
        { id: 3, designation: "Cartouche d'encre", quantite: 0, seuil: 5, cmup: 75000 },
      ],
    },
    {
      id: 3,
      nom: "Rasoa",
      role: "Directeur régional",
      agence: "D01",
      stockCritique: true,
      stockLevel: 0,
      stockItems: [
        { id: 1, designation: "Papier A4", quantite: 2, seuil: 10, cmup: 25000 },
        { id: 2, designation: "Stylo", quantite: 5, seuil: 20, cmup: 2500 },
        { id: 3, designation: "Agrafeuse", quantite: 1, seuil: 3, cmup: 15000 },
      ],
    },
    {
      id: 4,
      nom: "Ravelo",
      role: "Gestionnaire d'agence",
      agence: "cem01",
      stockCritique: true,
      stockLevel: 0,
      stockItems: [
        { id: 1, designation: "Ordinateur portable", quantite: 1, seuil: 3, cmup: 1200000 },
        { id: 2, designation: "Imprimante", quantite: 0, seuil: 2, cmup: 450000 },
        { id: 3, designation: "Cartouche d'encre", quantite: 2, seuil: 10, cmup: 75000 },
      ],
    },
  ]

  // Filtrer les utilisateurs en fonction de la recherche et du filtre
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.agence.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "Tous les types" || user.role === filterType

    return matchesSearch && matchesFilter
  })

  // Ouvrir le modal avec les détails de l'utilisateur
  const openUserDetails = (user) => {
    setSelectedUser(user)
    setShowModal(true)
  }

  // Obtenir les initiales pour l'avatar
  const getInitials = (name) => {
    return name.charAt(0).toUpperCase()
  }

  return (
    <div className="gestion-utilisateurs-container">
      <h1 className="page-title">Gestion des Utilisateurs</h1>

      <div className="search-filter-container">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-box">
          <FaFilter className="filter-icon" />
          <label>Type:</label>
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option>Tous les types</option>
            <option>Gestionnaire d'agence</option>
            <option>Responsable Western Union</option>
            <option>Directeur régional</option>
          </select>
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-header">
              <div className="user-avatar">
                <div className="avatar-circle">{getInitials(user.nom)}</div>
              </div>
              <div className="user-info">
                <h3>{user.nom}</h3>
                <p>{user.role}</p>
                <p className="user-agence">
                  Agence: <span>{user.agence}</span>
                </p>
              </div>
              <button className="stock-alert-btn" onClick={() => openUserDetails(user)}>
                <FaExclamationTriangle /> Stock critique
              </button>
            </div>

            <div className="stock-progress-container">
              <div className="stock-progress-bar">
                <div className="stock-progress" style={{ width: `${user.stockLevel}%` }}></div>
              </div>
              <div className="stock-percentage">{user.stockLevel}%</div>
            </div>

            <div className="user-actions">
              <button className="view-details-btn" onClick={() => openUserDetails(user)}>
                Voir détails <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de détails utilisateur */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="user-details-modal">
            <div className="modal-header">
              <div className="user-modal-info">
                <div className="modal-avatar">{getInitials(selectedUser.nom)}</div>
                <div>
                  <h2>{selectedUser.nom}</h2>
                  <p>
                    {selectedUser.role} - {selectedUser.agence}
                  </p>
                </div>
              </div>
              <button className="close-modal-btn" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <div className="modal-content">
              <div className="user-stats">
                <div className="stat-box">
                  <div className="stat-icon">
                    <FaBoxOpen />
                  </div>
                  <div className="stat-info">
                    <h4>Articles en stock</h4>
                    <p>{selectedUser.stockItems.reduce((total, item) => total + item.quantite, 0)}</p>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon">
                    <FaExclamationTriangle />
                  </div>
                  <div className="stat-info">
                    <h4>Articles critiques</h4>
                    <p>{selectedUser.stockItems.filter((item) => item.quantite < item.seuil).length}</p>
                  </div>
                </div>

                <div className="stat-box">
                  <div className="stat-icon">
                    <FaChartLine />
                  </div>
                  <div className="stat-info">
                    <h4>Valeur totale</h4>
                    <p>
                      {selectedUser.stockItems
                        .reduce((total, item) => total + item.quantite * item.cmup, 0)
                        .toLocaleString()}{" "}
                      Ar
                    </p>
                  </div>
                </div>
              </div>

              <div className="stock-details">
                <h3>Détails du stock</h3>
                <table className="stock-table">
                  <thead>
                    <tr>
                      <th>Désignation</th>
                      <th>Quantité</th>
                      <th>Seuil critique</th>
                      <th>CMUP</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedUser.stockItems.map((item) => (
                      <tr key={item.id} className={item.quantite < item.seuil ? "critical-row" : ""}>
                        <td>{item.designation}</td>
                        <td>{item.quantite}</td>
                        <td>{item.seuil}</td>
                        <td>{item.cmup.toLocaleString()} Ar</td>
                        <td>
                          <span className={`status-badge ${item.quantite < item.seuil ? "critical" : "normal"}`}>
                            {item.quantite < item.seuil ? "Critique" : "Normal"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="user-actions-footer">
                <button className="action-btn send-stock">Envoyer du stock</button>
                <button className="action-btn contact-user">Contacter l'utilisateur</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionUtilisateurs

