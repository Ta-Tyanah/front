"use client"

import { useState, useEffect } from "react"
import "../styles/Immobiliers.css"

function Immobiliers() {
  const [immobiliers, setImmobiliers] = useState([])
  const [filtreNom, setFiltreNom] = useState("")
  const [modalOuvert, setModalOuvert] = useState(false)
  const [immobilierEdite, setImmobilierEdite] = useState(null)
  const [formData, setFormData] = useState({
    nom: "",
    type: "",
    localisation: "",
    dateAcquisition: "",
    valeur: "",
    etat: "Bon",
  })

  // Types d'immobiliers
  const typesImmobiliers = ["Bâtiment", "Terrain", "Véhicule", "Équipement lourd", "Mobilier"]

  // États possibles
  const etatsImmobiliers = ["Excellent", "Bon", "Moyen", "Mauvais", "Hors service"]

  // Charger les données
  useEffect(() => {
    // Simulation de données
    const donneesMockees = [
      {
        id: 1,
        nom: "Bâtiment principal",
        type: "Bâtiment",
        localisation: "Zone industrielle",
        dateAcquisition: "2015-05-12",
        valeur: 450000,
        etat: "Bon",
      },
      {
        id: 2,
        nom: "Camion de livraison",
        type: "Véhicule",
        localisation: "Garage",
        dateAcquisition: "2020-03-18",
        valeur: 35000,
        etat: "Excellent",
      },
      {
        id: 3,
        nom: "Terrain expansion",
        type: "Terrain",
        localisation: "Zone périphérique",
        dateAcquisition: "2018-11-05",
        valeur: 120000,
        etat: "Bon",
      },
    ]

    setImmobiliers(donneesMockees)
  }, [])

  // Filtrer les immobiliers
  const immobiliersFiltres = immobiliers.filter((item) => item.nom.toLowerCase().includes(filtreNom.toLowerCase()))

  // Ouvrir le modal pour ajouter
  const ouvrirModalAjout = () => {
    setImmobilierEdite(null)
    setFormData({
      nom: "",
      type: "",
      localisation: "",
      dateAcquisition: new Date().toISOString().split("T")[0],
      valeur: "",
      etat: "Bon",
    })
    setModalOuvert(true)
  }

  // Ouvrir le modal pour éditer
  const ouvrirModalEdition = (immobilier) => {
    setImmobilierEdite(immobilier)
    setFormData({
      nom: immobilier.nom,
      type: immobilier.type,
      localisation: immobilier.localisation,
      dateAcquisition: immobilier.dateAcquisition,
      valeur: immobilier.valeur.toString(),
      etat: immobilier.etat,
    })
    setModalOuvert(true)
  }

  // Fermer le modal
  const fermerModal = () => {
    setModalOuvert(false)
  }

  // Gérer les changements dans le formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Sauvegarder l'immobilier
  const sauvegarderImmobilier = () => {
    if (immobilierEdite) {
      // Mise à jour
      setImmobiliers(
        immobiliers.map((item) =>
          item.id === immobilierEdite.id
            ? {
                ...item,
                nom: formData.nom,
                type: formData.type,
                localisation: formData.localisation,
                dateAcquisition: formData.dateAcquisition,
                valeur: Number.parseFloat(formData.valeur),
                etat: formData.etat,
              }
            : item,
        ),
      )
    } else {
      // Ajout
      const nouvelImmobilier = {
        id: Date.now(),
        nom: formData.nom,
        type: formData.type,
        localisation: formData.localisation,
        dateAcquisition: formData.dateAcquisition,
        valeur: Number.parseFloat(formData.valeur),
        etat: formData.etat,
      }

      setImmobiliers([...immobiliers, nouvelImmobilier])
    }

    fermerModal()
  }

  // Supprimer un immobilier
  const supprimerImmobilier = (id) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet immobilier?")) {
      setImmobiliers(immobiliers.filter((item) => item.id !== id))
    }
  }

  return (
    <div className="page-immobiliers">
      <h1 className="titre-page">Gestion des Immobiliers</h1>

      <div className="section-immobiliers">
        <div className="entete-section">
          <div className="filtre-immobiliers">
            <input
              type="text"
              placeholder="Filtrer par nom..."
              value={filtreNom}
              onChange={(e) => setFiltreNom(e.target.value)}
              className="champ-filtre"
            />
          </div>
          <button className="bouton-ajouter" onClick={ouvrirModalAjout}>
            Ajouter un immobilier
          </button>
        </div>

        <div className="tableau-immobiliers">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Type</th>
                <th>Localisation</th>
                <th>Date {`d'acquisition`}</th>
                <th>Valeur</th>
                <th>État</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {immobiliersFiltres.map((item) => (
                <tr key={item.id}>
                  <td>{item.nom}</td>
                  <td>{item.type}</td>
                  <td>{item.localisation}</td>
                  <td>{item.dateAcquisition}</td>
                  <td>{item.valeur.toLocaleString()} €</td>
                  <td>
                    <span className={`etat-${item.etat.toLowerCase().replace(" ", "-")}`}>{item.etat}</span>
                  </td>
                  <td className="actions-cellule">
                    <button className="bouton-modifier" onClick={() => ouvrirModalEdition(item)}>
                      Modifier
                    </button>
                    <button className="bouton-supprimer" onClick={() => supprimerImmobilier(item.id)}>
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{immobilierEdite ? "Modifier" : "Ajouter"} un immobilier</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="nom">Nom</label>
                <input id="nom" name="nom" type="text" value={formData.nom} onChange={handleInputChange} required />
              </div>

              <div className="groupe-champ">
                <label htmlFor="type">Type</label>
                <select id="type" name="type" value={formData.type} onChange={handleInputChange} required>
                  <option value="">Sélectionner un type</option>
                  {typesImmobiliers.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div className="groupe-champ">
                <label htmlFor="localisation">Localisation</label>
                <input
                  id="localisation"
                  name="localisation"
                  type="text"
                  value={formData.localisation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="dateAcquisition">Date {`d'acquisition`}</label>
                <input
                  id="dateAcquisition"
                  name="dateAcquisition"
                  type="date"
                  value={formData.dateAcquisition}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="valeur">Valeur (€)</label>
                <input
                  id="valeur"
                  name="valeur"
                  type="number"
                  step="0.01"
                  value={formData.valeur}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="etat">État</label>
                <select id="etat" name="etat" value={formData.etat} onChange={handleInputChange} required>
                  {etatsImmobiliers.map((etat) => (
                    <option key={etat} value={etat}>
                      {etat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModal}>
                  Annuler
                </button>
                <button className="bouton-sauvegarder" onClick={sauvegarderImmobilier}>
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Immobiliers

