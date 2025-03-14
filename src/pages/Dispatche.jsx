"use client"

import { useState, useEffect } from "react"
import "../styles/Dispatche.css"
import { Search, Plus, Edit } from "lucide-react"

function Dispatche() {
  const [dispatches, setDispatches] = useState([])
  const [agences, setAgences] = useState([])
  const [nouvelleAgence, setNouvelleAgence] = useState("")
  const [filtreDesignation, setFiltreDesignation] = useState("")

  const [nouveauDispatch, setNouveauDispatch] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [modalOuvert, setModalOuvert] = useState(false)
  const [dispatchEdite, setDispatchEdite] = useState(null)

  // Ajouter useEffect pour charger les données du localStorage
  useEffect(() => {
    const dispatchesSauvegardees = localStorage.getItem("dispatches")
    const agencesSauvegardees = localStorage.getItem("agences")

    if (dispatchesSauvegardees) {
      setDispatches(JSON.parse(dispatchesSauvegardees))
    }

    if (agencesSauvegardees) {
      setAgences(JSON.parse(agencesSauvegardees))
    }
  }, [])

  // Ajouter un script pour détecter si le tableau nécessite un défilement
  useEffect(() => {
    const checkTableScroll = () => {
      const tableContainer = document.querySelector(".tableau-dispatche")
      if (tableContainer) {
        if (tableContainer.scrollWidth > tableContainer.clientWidth) {
          tableContainer.classList.add("scrollable")
        } else {
          tableContainer.classList.remove("scrollable")
        }
      }
    }

    // Vérifier au chargement et lors du redimensionnement
    checkTableScroll()
    window.addEventListener("resize", checkTableScroll)

    return () => {
      window.removeEventListener("resize", checkTableScroll)
    }
  }, [dispatches, agences])

  const ouvrirModal = () => {
    setDispatchEdite(null)
    setNouveauDispatch({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    setModalOuvert(true)
  }

  const ouvrirModalEdition = (dispatch) => {
    setDispatchEdite(dispatch)
    setNouveauDispatch({
      designation: dispatch.designation,
      quantite: dispatch.quantite,
      date: dispatch.date,
    })
    setModalOuvert(true)
  }

  const fermerModal = () => {
    setModalOuvert(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNouveauDispatch({
      ...nouveauDispatch,
      [name]: value,
    })
  }

  // Fonction pour ajouter ou modifier un dispatche
  const sauvegarderDispatch = () => {
    if (dispatchEdite) {
      // Mise à jour d'un dispatche existant
      const dispatchesUpdated = dispatches.map((d) =>
        d.id === dispatchEdite.id
          ? {
              ...d,
              designation: nouveauDispatch.designation,
              quantite: Number.parseInt(nouveauDispatch.quantite),
              date: nouveauDispatch.date,
            }
          : d,
      )
      setDispatches(dispatchesUpdated)
      localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))
    } else {
      // Ajout d'un nouveau dispatche
      const nouveauId = dispatches.length > 0 ? Math.max(...dispatches.map((d) => d.id)) + 1 : 1

      const dispatch = {
        id: nouveauId,
        designation: nouveauDispatch.designation,
        quantite: Number.parseInt(nouveauDispatch.quantite),
        date: nouveauDispatch.date,
        consommations: agences.map((agence) => ({ agenceId: agence.id, quantite: 0 })),
      }

      const dispatchesUpdated = [...dispatches, dispatch]
      setDispatches(dispatchesUpdated)
      localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))
    }

    // Réinitialiser le formulaire et fermer le modal
    setNouveauDispatch({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    fermerModal()
  }

  // Ajouter une nouvelle agence
  const ajouterAgence = () => {
    if (!nouvelleAgence.trim()) return

    const nouvelleAgenceObj = {
      id: agences.length > 0 ? Math.max(...agences.map((a) => a.id)) + 1 : 1,
      nom: nouvelleAgence,
    }

    // Mettre à jour la liste des agences
    const agencesUpdated = [...agences, nouvelleAgenceObj]
    setAgences(agencesUpdated)
    localStorage.setItem("agences", JSON.stringify(agencesUpdated))

    // Mettre à jour les dispatches pour inclure la nouvelle agence
    const dispatchesUpdated = dispatches.map((dispatch) => ({
      ...dispatch,
      consommations: [...(dispatch.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setDispatches(dispatchesUpdated)
    localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))

    // Réinitialiser le champ
    setNouvelleAgence("")
  }

  // Mettre à jour la consommation d'une agence
  const mettreAJourConsommation = (dispatchId, agenceId, quantite) => {
    const dispatchesUpdated = dispatches.map((dispatch) => {
      if (dispatch.id === dispatchId) {
        const consommationsUpdated = dispatch.consommations
          ? dispatch.consommations.map((c) =>
              c.agenceId === agenceId ? { ...c, quantite: Number.parseInt(quantite) || 0 } : c,
            )
          : [{ agenceId, quantite: Number.parseInt(quantite) || 0 }]

        return { ...dispatch, consommations: consommationsUpdated }
      }
      return dispatch
    })

    setDispatches(dispatchesUpdated)
    localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))
  }

  // Filtrer les dispatches par désignation
  const dispatchesFiltres = dispatches.filter((dispatch) =>
    dispatch.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  return (
    <div className="page-dispatche">
      <h1 className="titre-page">Dispatche des Produits</h1>

      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Dispatches</h2>
          <div className="actions-entete">
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
            <div className="ajout-agence">
              <input
                type="text"
                placeholder="Nom de la nouvelle agence"
                value={nouvelleAgence}
                onChange={(e) => setNouvelleAgence(e.target.value)}
                className="champ-nouvelle-agence"
              />
              <button className="bouton-ajouter-agence" onClick={ajouterAgence} disabled={!nouvelleAgence.trim()}>
                <Plus size={16} /> Ajouter Agence
              </button>
            </div>
            <button className="bouton-ajouter" onClick={ouvrirModal}>
              <Plus size={16} /> Ajouter
            </button>
          </div>
        </div>

        <div className="tableau-dispatche-wrapper">
          <div className="tableau-dispatche">
            <table>
              <thead>
                <tr>
                  <th>Désignation</th>
                  <th>Quantité</th>
                  {agences.length > 0 && <th colSpan={agences.length}>Consommations des agences</th>}
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {agences.length > 0 && (
                  <tr>
                    <th></th>
                    <th></th>
                    {agences.map((agence) => (
                      <th key={agence.id}>{agence.nom}</th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {dispatchesFiltres.length > 0 ? (
                  dispatchesFiltres.map((dispatch) => (
                    <tr key={dispatch.id}>
                      <td>{dispatch.designation}</td>
                      <td>{dispatch.quantite}</td>
                      {agences.map((agence) => {
                        const consommation = dispatch.consommations?.find((c) => c.agenceId === agence.id)
                        return (
                          <td key={`${dispatch.id}-${agence.id}`}>
                            <input
                              type="number"
                              min="0"
                              max={dispatch.quantite}
                              value={consommation?.quantite || 0}
                              onChange={(e) => mettreAJourConsommation(dispatch.id, agence.id, e.target.value)}
                              className="input-consommation"
                            />
                          </td>
                        )
                      })}
                      <td>{dispatch.date}</td>
                      <td className="actions-cellule">
                        <button className="bouton-modifier" onClick={() => ouvrirModalEdition(dispatch)}>
                          <Edit size={14} /> Modifier
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agences.length > 0 ? agences.length + 4 : 4} className="no-data">
                      Aucun dispatche trouvé. Utilisez le bouton "Ajouter" pour en créer un.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{dispatchEdite ? "Modifier" : "Ajouter"} un dispatche</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="designation">Désignation</label>
                <input
                  id="designation"
                  name="designation"
                  type="text"
                  value={nouveauDispatch.designation}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="quantite">Quantité</label>
                <input
                  id="quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouveauDispatch.quantite}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={nouveauDispatch.date}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModal}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderDispatch}
                  disabled={!nouveauDispatch.designation || !nouveauDispatch.quantite}
                >
                  {dispatchEdite ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dispatche

