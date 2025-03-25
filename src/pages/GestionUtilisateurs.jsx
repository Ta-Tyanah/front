import { useState, useEffect } from "react"
import "../styles/GestionUtilisateurs.css"
import { Search, Filter, Package, AlertTriangle, CheckCircle, Clock, ArrowRight } from "lucide-react"

function GestionUtilisateurs() {
  const [utilisateurs, setUtilisateurs] = useState([])
  const [agences, setAgences] = useState([])
  const [agencesWU, setAgencesWU] = useState([])
  const [agencesDir, setAgencesDir] = useState([])
  const [dispatches, setDispatches] = useState([])
  const [westernUnions, setWesternUnions] = useState([])
  const [directions, setDirections] = useState([])
  const [filtreNom, setFiltreNom] = useState("")
  const [filtreType, setFiltreType] = useState("tous")
  const [isLoading, setIsLoading] = useState(true)
  const [utilisateurSelectionne, setUtilisateurSelectionne] = useState(null)
  const [modalDetailOuvert, setModalDetailOuvert] = useState(false)

  // Charger les données
  useEffect(() => {
    // Récupérer les données depuis localStorage
    const utilisateursSauvegardes = localStorage.getItem("utilisateurs") || "[]"
    const agencesSauvegardees = localStorage.getItem("agences") || "[]"
    const agencesWUSauvegardees = localStorage.getItem("agencesWU") || "[]"
    const agencesDirSauvegardees = localStorage.getItem("agencesDir") || "[]"
    const dispatchesSauvegardes = localStorage.getItem("dispatches") || "[]"
    const westernUnionsSauvegardees = localStorage.getItem("westernUnions") || "[]"
    const directionsSauvegardees = localStorage.getItem("directions") || "[]"

    // Convertir les données en objets JavaScript
    const utilisateursData = JSON.parse(utilisateursSauvegardes)
    const agencesData = JSON.parse(agencesSauvegardees)
    const agencesWUData = JSON.parse(agencesWUSauvegardees)
    const agencesDirData = JSON.parse(agencesDirSauvegardees)
    const dispatchesData = JSON.parse(dispatchesSauvegardes)
    const westernUnionsData = JSON.parse(westernUnionsSauvegardees)
    const directionsData = JSON.parse(directionsSauvegardees)

    // Si aucun utilisateur n'existe, créer des utilisateurs fictifs
    if (utilisateursData.length === 0) {
      const utilisateursFictifs = [
        {
          id: 1,
          nom: "Rakoto",
          email: "rakoto@example.com",
          telephone: "+261 34 12 34 567",
          poste: "Gestionnaire d'agence",
          dateInscription: "2023-01-15",
          type: "agence",
          agenceId: agencesData.length > 0 ? agencesData[0].id : null,
          statut: "Actif",
          niveauStock: "moyen", // bas, moyen, haut
        },
        {
          id: 2,
          nom: "Rabe",
          email: "rabe@example.com",
          telephone: "+261 33 98 76 543",
          poste: "Responsable Western Union",
          dateInscription: "2023-02-20",
          type: "westernUnion",
          agenceId: agencesWUData.length > 0 ? agencesWUData[0].id : null,
          statut: "Actif",
          niveauStock: "bas",
        },
        {
          id: 3,
          nom: "Rasoa",
          email: "rasoa@example.com",
          telephone: "+261 32 45 67 890",
          poste: "Directeur régional",
          dateInscription: "2023-03-10",
          type: "direction",
          agenceId: agencesDirData.length > 0 ? agencesDirData[0].id : null,
          statut: "Actif",
          niveauStock: "haut",
        },
        {
          id: 4,
          nom: "Ravelo",
          email: "ravelo@example.com",
          telephone: "+261 34 56 78 901",
          poste: "Gestionnaire d'agence",
          dateInscription: "2023-04-05",
          type: "agence",
          agenceId: agencesData.length > 1 ? agencesData[1].id : null,
          statut: "Actif",
          niveauStock: "critique",
        },
      ]

      // Sauvegarder les utilisateurs fictifs
      localStorage.setItem("utilisateurs", JSON.stringify(utilisateursFictifs))
      setUtilisateurs(utilisateursFictifs)
    } else {
      setUtilisateurs(utilisateursData)
    }

    // Mettre à jour les états avec les données récupérées
    setAgences(agencesData)
    setAgencesWU(agencesWUData)
    setAgencesDir(agencesDirData)
    setDispatches(dispatchesData)
    setWesternUnions(westernUnionsData)
    setDirections(directionsData)

    // Simuler un chargement
    setTimeout(() => {
      setIsLoading(false)
    }, 800)
  }, [])

  // Filtrer les utilisateurs
  const utilisateursFiltres = utilisateurs.filter((utilisateur) => {
    const matchNom = utilisateur.nom.toLowerCase().includes(filtreNom.toLowerCase())
    const matchType = filtreType === "tous" || utilisateur.type === filtreType
    return matchNom && matchType
  })

  // Obtenir le nom de l'agence associée à un utilisateur
  const getNomAgence = (utilisateur) => {
    if (!utilisateur || !utilisateur.agenceId) return "Non assigné"

    let agence = null
    switch (utilisateur.type) {
      case "agence":
        agence = agences.find((a) => a.id === utilisateur.agenceId)
        break
      case "westernUnion":
        agence = agencesWU.find((a) => a.id === utilisateur.agenceId)
        break
      case "direction":
        agence = agencesDir.find((a) => a.id === utilisateur.agenceId)
        break
    }

    return agence ? agence.nom : "Non assigné"
  }

  // Obtenir les consommations d'un utilisateur
  const getConsommations = (utilisateur) => {
    if (!utilisateur || !utilisateur.agenceId) return []

    let consommations = []
    switch (utilisateur.type) {
      case "agence":
        consommations = dispatches
          .filter((d) => d.consommations && d.consommations.some((c) => c.agenceId === utilisateur.agenceId))
          .map((d) => {
            const consommation = d.consommations.find((c) => c.agenceId === utilisateur.agenceId)
            return {
              id: d.id,
              designation: d.designation,
              quantiteDisponible: d.quantite,
              quantiteConsommee: consommation ? consommation.quantite : 0,
              date: d.date,
              type: "Dispatche",
            }
          })
        break
      case "westernUnion":
        consommations = westernUnions
          .filter((w) => w.consommations && w.consommations.some((c) => c.agenceId === utilisateur.agenceId))
          .map((w) => {
            const consommation = w.consommations.find((c) => c.agenceId === utilisateur.agenceId)
            return {
              id: w.id,
              designation: w.designation,
              quantiteDisponible: w.quantite,
              quantiteConsommee: consommation ? consommation.quantite : 0,
              date: w.date,
              type: "Western Union",
            }
          })
        break
      case "direction":
        consommations = directions
          .filter((d) => d.consommations && d.consommations.some((c) => c.agenceId === utilisateur.agenceId))
          .map((d) => {
            const consommation = d.consommations.find((c) => c.agenceId === utilisateur.agenceId)
            return {
              id: d.id,
              designation: d.designation,
              quantiteDisponible: d.quantite,
              quantiteConsommee: consommation ? consommation.quantite : 0,
              date: d.date,
              type: "Direction",
            }
          })
        break
    }

    return consommations
  }

  // Calculer le pourcentage de stock utilisé
  const calculerPourcentageStock = (utilisateur) => {
    const consommations = getConsommations(utilisateur)
    if (consommations.length === 0) return 0

    let totalDisponible = 0
    let totalConsomme = 0

    consommations.forEach((c) => {
      totalDisponible += c.quantiteDisponible
      totalConsomme += c.quantiteConsommee
    })

    return totalDisponible > 0 ? Math.round((totalConsomme / totalDisponible) * 100) : 0
  }

  // Déterminer l'état du stock d'un utilisateur
  const determinerEtatStock = (utilisateur) => {
    const pourcentage = calculerPourcentageStock(utilisateur)

    if (pourcentage < 20) return "critique"
    if (pourcentage < 50) return "bas"
    if (pourcentage < 80) return "moyen"
    return "haut"
  }

  // Obtenir la couleur en fonction de l'état du stock
  const getStockColor = (etat) => {
    switch (etat) {
      case "critique":
        return "#800000" // Rouge foncé
      case "bas":
        return "#982B1C" // Rouge brique
      case "moyen":
        return "#DAD4B5" // Beige clair
      case "haut":
        return "#F2E8C6" // Beige très clair
      default:
        return "#9e9e9e" // Gris
    }
  }

  // Obtenir l'icône en fonction de l'état du stock
  const getStockIcon = (etat) => {
    switch (etat) {
      case "critique":
        return <AlertTriangle size={16} />
      case "bas":
        return <Clock size={16} />
      case "moyen":
        return <Package size={16} />
      case "haut":
        return <CheckCircle size={16} />
      default:
        return <Package size={16} />
    }
  }

  // Obtenir le texte en fonction de l'état du stock
  const getStockText = (etat) => {
    switch (etat) {
      case "critique":
        return "Stock critique"
      case "bas":
        return "Stock bas"
      case "moyen":
        return "Stock moyen"
      case "haut":
        return "Stock suffisant"
      default:
        return "Non défini"
    }
  }

  // Ouvrir le modal de détail
  const ouvrirModalDetail = (utilisateur) => {
    setUtilisateurSelectionne(utilisateur)
    setModalDetailOuvert(true)
  }

  // Fermer le modal de détail
  const fermerModalDetail = () => {
    setModalDetailOuvert(false)
    setUtilisateurSelectionne(null)
  }

  // Afficher un message de chargement
  if (isLoading) {
    return (
      <div className="ecran-chargement">
        <div className="loader"></div>
        <p>Chargement des données utilisateurs...</p>
      </div>
    )
  }

  // Ajouter la classe d'animation à GestionUtilisateurs
  return (
    <div className="page-gestion-utilisateurs animation-utilisateurs">
      <h1 className="titre-page">Gestion des Utilisateurs</h1>

      <div className="section-filtres">
        <div className="champ-recherche-wrapper">
          <Search size={18} className="icone-recherche" />
          <input
            type="text"
            placeholder="Rechercher un utilisateur..."
            value={filtreNom}
            onChange={(e) => setFiltreNom(e.target.value)}
            className="champ-filtre"
          />
        </div>

        <div className="filtre-type">
          <label htmlFor="filtreType">
            <Filter size={16} /> Type:
          </label>
          <select
            id="filtreType"
            value={filtreType}
            onChange={(e) => setFiltreType(e.target.value)}
            className="select-filtre"
          >
            <option value="tous">Tous les types</option>
            <option value="agence">Agences</option>
            <option value="westernUnion">Western Union</option>
            <option value="direction">Directions</option>
          </select>
        </div>
      </div>

      <div className="liste-utilisateurs">
        {utilisateursFiltres.length > 0 ? (
          utilisateursFiltres.map((utilisateur) => {
            const etatStock = determinerEtatStock(utilisateur)
            const pourcentageStock = calculerPourcentageStock(utilisateur)

            return (
              <div className="carte-utilisateur" key={utilisateur.id} onClick={() => ouvrirModalDetail(utilisateur)}>
                <div className="utilisateur-info">
                  <h3 className="utilisateur-nom">{utilisateur.nom}</h3>
                  <p className="utilisateur-poste">{utilisateur.poste}</p>
                  <p className="utilisateur-agence">
                    <span className="label-agence">Agence:</span> {getNomAgence(utilisateur)}
                  </p>
                </div>
                <div className="utilisateur-stock">
                  <div className="stock-indicateur" style={{ backgroundColor: getStockColor(etatStock) }}>
                    {getStockIcon(etatStock)}
                    <span>{getStockText(etatStock)}</span>
                  </div>
                  <div className="stock-barre-wrapper">
                    <div className="stock-barre">
                      <div
                        className="stock-barre-remplissage"
                        style={{
                          width: `${pourcentageStock}%`,
                          backgroundColor: getStockColor(etatStock),
                        }}
                      ></div>
                    </div>
                    <span className="stock-pourcentage">{pourcentageStock}%</span>
                  </div>
                </div>
                <div className="utilisateur-actions">
                  <button className="bouton-voir-details">
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )
          })
        ) : (
          <div className="no-data">
            <p>Aucun utilisateur ne correspond aux critères de recherche.</p>
          </div>
        )}
      </div>

      {/* Modal de détail utilisateur */}
      {modalDetailOuvert && utilisateurSelectionne && (
        <div className="modal-overlay" onClick={fermerModalDetail}>
          <div className="modal-detail-utilisateur" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="utilisateur-detail-info">
                <div>
                  <h2>{utilisateurSelectionne.nom}</h2>
                  <p className="detail-poste">{utilisateurSelectionne.poste}</p>
                  <p className="detail-agence">
                    <span className="label-agence">Agence:</span> {getNomAgence(utilisateurSelectionne)}
                  </p>
                </div>
              </div>
              <button className="bouton-fermer-modal" onClick={fermerModalDetail}>
                &times;
              </button>
            </div>

            <div className="modal-body">
              <div className="section-info-utilisateur">
                <h3>Informations de contact</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{utilisateurSelectionne.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Téléphone:</span>
                    <span className="info-value">{utilisateurSelectionne.telephone}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date d'inscription:</span>
                    <span className="info-value">{utilisateurSelectionne.dateInscription}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Statut:</span>
                    <span className="info-value">{utilisateurSelectionne.statut}</span>
                  </div>
                </div>
              </div>

              <div className="section-stock-utilisateur">
                <h3>État du stock</h3>
                <div className="stock-resume">
                  <div
                    className="stock-indicateur-large"
                    style={{ backgroundColor: getStockColor(determinerEtatStock(utilisateurSelectionne)) }}
                  >
                    {getStockIcon(determinerEtatStock(utilisateurSelectionne))}
                    <span>{getStockText(determinerEtatStock(utilisateurSelectionne))}</span>
                  </div>
                  <div className="stock-barre-wrapper-large">
                    <div className="stock-barre">
                      <div
                        className="stock-barre-remplissage"
                        style={{
                          width: `${calculerPourcentageStock(utilisateurSelectionne)}%`,
                          backgroundColor: getStockColor(determinerEtatStock(utilisateurSelectionne)),
                        }}
                      ></div>
                    </div>
                    <span className="stock-pourcentage">{calculerPourcentageStock(utilisateurSelectionne)}%</span>
                  </div>
                </div>
              </div>

              <div className="section-consommations">
                <h3>Consommations</h3>
                <div className="tableau-consommations-wrapper">
                  <table className="tableau-consommations">
                    <thead>
                      <tr>
                        <th>Désignation</th>
                        <th>Type</th>
                        <th>Quantité disponible</th>
                        <th>Quantité consommée</th>
                        <th>Pourcentage</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getConsommations(utilisateurSelectionne).length > 0 ? (
                        getConsommations(utilisateurSelectionne).map((consommation) => {
                          const pourcentage =
                            consommation.quantiteDisponible > 0
                              ? Math.round((consommation.quantiteConsommee / consommation.quantiteDisponible) * 100)
                              : 0
                          let etatConsommation = "haut"
                          if (pourcentage < 20) etatConsommation = "critique"
                          else if (pourcentage < 50) etatConsommation = "bas"
                          else if (pourcentage < 80) etatConsommation = "moyen"

                          return (
                            <tr key={`${consommation.id}-${consommation.type}`}>
                              <td>{consommation.designation}</td>
                              <td>{consommation.type}</td>
                              <td>{consommation.quantiteDisponible}</td>
                              <td>{consommation.quantiteConsommee}</td>
                              <td>
                                <div className="mini-barre-wrapper">
                                  <div className="mini-barre">
                                    <div
                                      className="mini-barre-remplissage"
                                      style={{
                                        width: `${pourcentage}%`,
                                        backgroundColor: getStockColor(etatConsommation),
                                      }}
                                    ></div>
                                  </div>
                                  <span className="mini-pourcentage">{pourcentage}%</span>
                                </div>
                              </td>
                              <td>{consommation.date}</td>
                            </tr>
                          )
                        })
                      ) : (
                        <tr>
                          <td colSpan="6" className="no-data">
                            Aucune consommation enregistrée pour cet utilisateur.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="section-actions">
                <h3>Actions recommandées</h3>
                <div className="actions-recommandees">
                  {determinerEtatStock(utilisateurSelectionne) === "critique" && (
                    <div className="action-item urgente">
                      <AlertTriangle size={18} />
                      <span>Réapprovisionnement urgent nécessaire</span>
                    </div>
                  )}
                  {determinerEtatStock(utilisateurSelectionne) === "bas" && (
                    <div className="action-item attention">
                      <Clock size={18} />
                      <span>Planifier un réapprovisionnement prochainement</span>
                    </div>
                  )}
                  {determinerEtatStock(utilisateurSelectionne) === "moyen" && (
                    <div className="action-item info">
                      <Package size={18} />
                      <span>Stock à surveiller</span>
                    </div>
                  )}
                  {determinerEtatStock(utilisateurSelectionne) === "haut" && (
                    <div className="action-item success">
                      <CheckCircle size={18} />
                      <span>Stock suffisant, aucune action requise</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="bouton-fermer" onClick={fermerModalDetail}>
                Fermer
              </button>
              <button className="bouton-envoyer-stock">Envoyer du stock</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default GestionUtilisateurs

