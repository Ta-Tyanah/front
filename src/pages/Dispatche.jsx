"use client"

import { useState, useEffect } from "react"
import "../styles/Dispatche.css"
import { Search, Plus, Edit, Trash, Save } from "lucide-react"

function Agence() {
  // État pour les agences normaux
  const [dispatches, setDispatches] = useState([])
  const [agences, setAgences] = useState([])
  const [nouvelleAgence, setNouvelleAgence] = useState("")
  const [filtreDesignation, setFiltreDesignation] = useState("")
  const [dispatchEnEdition, setDispatchEnEdition] = useState(null)

  // État pour les Western Union
  const [westernUnions, setWesternUnions] = useState([])
  const [agencesWU, setAgencesWU] = useState([])
  const [nouvelleAgenceWU, setNouvelleAgenceWU] = useState("")
  const [filtreWesternUnion, setFiltreWesternUnion] = useState("")
  const [westernUnionEnEdition, setWesternUnionEnEdition] = useState(null)

  // État pour les Directions
  const [directions, setDirections] = useState([])
  const [agencesDir, setAgencesDir] = useState([])
  const [nouvelleAgenceDir, setNouvelleAgenceDir] = useState("")
  const [filtreDirection, setFiltreDirection] = useState("")
  const [directionEnEdition, setDirectionEnEdition] = useState(null)

  // État pour les modals
  const [nouveauDispatch, setNouveauDispatch] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [nouveauWesternUnion, setNouveauWesternUnion] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [nouvelleDirection, setNouvelleDirection] = useState({
    designation: "",
    quantite: "",
    date: new Date().toISOString().split("T")[0],
  })

  const [modalOuvert, setModalOuvert] = useState(false)
  const [modalWesternUnionOuvert, setModalWesternUnionOuvert] = useState(false)
  const [modalDirectionOuvert, setModalDirectionOuvert] = useState(false)
  const [dispatchEdite, setDispatchEdite] = useState(null)
  const [westernUnionEdite, setWesternUnionEdite] = useState(null)
  const [directionEditee, setDirectionEditee] = useState(null)

  // Ajouter useEffect pour charger les données du localStorage
  useEffect(() => {
    const dispatchesSauvegardees = localStorage.getItem("dispatches")
    const agencesSauvegardees = localStorage.getItem("agences")
    const westernUnionsSauvegardes = localStorage.getItem("westernUnions")
    const agencesWUSauvegardees = localStorage.getItem("agencesWU")
    const directionsSauvegardees = localStorage.getItem("directions")
    const agencesDirSauvegardees = localStorage.getItem("agencesDir")

    if (dispatchesSauvegardees) {
      setDispatches(JSON.parse(dispatchesSauvegardees))
    }

    if (agencesSauvegardees) {
      setAgences(JSON.parse(agencesSauvegardees))
    }

    if (westernUnionsSauvegardes) {
      setWesternUnions(JSON.parse(westernUnionsSauvegardes))
    }

    if (agencesWUSauvegardees) {
      setAgencesWU(JSON.parse(agencesWUSauvegardees))
    }

    if (directionsSauvegardees) {
      setDirections(JSON.parse(directionsSauvegardees))
    }

    if (agencesDirSauvegardees) {
      setAgencesDir(JSON.parse(agencesDirSauvegardees))
    }
  }, [])

  // Ajouter un script pour détecter si le tableau nécessite un défilement
  useEffect(() => {
    const checkTableScroll = () => {
      const tableContainers = document.querySelectorAll(".tableau-dispatche")
      tableContainers.forEach((container) => {
        if (container.scrollWidth > container.clientWidth) {
          container.classList.add("scrollable")
        } else {
          container.classList.remove("scrollable")
        }
      })
    }

    // Vérifier au chargement et lors du redimensionnement
    checkTableScroll()
    window.addEventListener("resize", checkTableScroll)

    return () => {
      window.removeEventListener("resize", checkTableScroll)
    }
  }, [dispatches, agences, westernUnions, agencesWU, directions, agencesDir])

  // Fonctions pour les agences normaux
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

  // Fonction pour ajouter ou modifier un agence
  const sauvegarderDispatch = () => {
    if (dispatchEdite) {
      // Mise à jour d'un agence existant
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
      // Ajout d'un nouveau agence
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

    // Afficher un message de succès
    afficherMessage(dispatchEdite ? "Agence modifiée avec succès!" : "Agence ajoutée avec succès!", "succes")
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

    // Mettre à jour les agences pour inclure la nouvelle agence
    const dispatchesUpdated = dispatches.map((dispatch) => ({
      ...dispatch,
      consommations: [...(dispatch.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setDispatches(dispatchesUpdated)
    localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))

    // Réinitialiser le champ
    setNouvelleAgence("")

    // Afficher un message de succès
    afficherMessage("Agence ajoutée avec succès!", "succes")
  }

  // Supprimer une agence
  const supprimerAgence = (agenceId) => {
    // Créer une alerte de confirmation moderne
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `

    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer l'agence de la liste
      const agencesUpdated = agences.filter((a) => a.id !== agenceId)
      setAgences(agencesUpdated)
      localStorage.setItem("agences", JSON.stringify(agencesUpdated))

      // Mettre à jour les agences pour retirer cette agence
      const dispatchesUpdated = dispatches.map((dispatch) => ({
        ...dispatch,
        consommations: dispatch.consommations.filter((c) => c.agenceId !== agenceId),
      }))
      setDispatches(dispatchesUpdated)
      localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Agence supprimée avec succès!", "succes")
      }, 300)
    })
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

  // Activer/désactiver le mode édition pour un agence
  const toggleEditionDispatch = (dispatchId) => {
    if (dispatchEnEdition === dispatchId) {
      setDispatchEnEdition(null)
      // Afficher un message de succès
      afficherMessage("Modifications enregistrées", "succes")
    } else {
      setDispatchEnEdition(dispatchId)
    }
  }

  // Supprimer un agence
  const supprimerDispatch = (dispatchId) => {
    // Créer une alerte de confirmation moderne
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `

    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer le agence
      const dispatchesUpdated = dispatches.filter((d) => d.id !== dispatchId)
      setDispatches(dispatchesUpdated)
      localStorage.setItem("dispatches", JSON.stringify(dispatchesUpdated))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Agence supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Fonctions pour les Western Union
  const ouvrirModalWesternUnion = () => {
    setWesternUnionEdite(null)
    setNouveauWesternUnion({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    setModalWesternUnionOuvert(true)
  }

  const ouvrirModalEditionWesternUnion = (westernUnion) => {
    setWesternUnionEdite(westernUnion)
    setNouveauWesternUnion({
      designation: westernUnion.designation,
      quantite: westernUnion.quantite,
      date: westernUnion.date,
    })
    setModalWesternUnionOuvert(true)
  }

  const fermerModalWesternUnion = () => {
    setModalWesternUnionOuvert(false)
  }

  const handleWesternUnionInputChange = (e) => {
    const { name, value } = e.target
    setNouveauWesternUnion({
      ...nouveauWesternUnion,
      [name]: value,
    })
  }

  // Fonction pour ajouter ou modifier un Western Union
  const sauvegarderWesternUnion = () => {
    if (westernUnionEdite) {
      // Mise à jour d'un Western Union existant
      const westernUnionsUpdated = westernUnions.map((wu) =>
        wu.id === westernUnionEdite.id
          ? {
              ...wu,
              designation: nouveauWesternUnion.designation,
              quantite: Number.parseInt(nouveauWesternUnion.quantite),
              date: nouveauWesternUnion.date,
            }
          : wu,
      )
      setWesternUnions(westernUnionsUpdated)
      localStorage.setItem("westernUnions", JSON.stringify(westernUnionsUpdated))
    } else {
      // Ajout d'un nouveau Western Union
      const nouveauId = westernUnions.length > 0 ? Math.max(...westernUnions.map((wu) => wu.id)) + 1 : 1

      const westernUnion = {
        id: nouveauId,
        designation: nouveauWesternUnion.designation,
        quantite: Number.parseInt(nouveauWesternUnion.quantite),
        date: nouveauWesternUnion.date,
        consommations: agencesWU.map((agence) => ({ agenceId: agence.id, quantite: 0 })),
      }

      const westernUnionsUpdated = [...westernUnions, westernUnion]
      setWesternUnions(westernUnionsUpdated)
      localStorage.setItem("westernUnions", JSON.stringify(westernUnionsUpdated))
    }

    // Réinitialiser le formulaire et fermer le modal
    setNouveauWesternUnion({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    fermerModalWesternUnion()

    // Afficher un message de succès
    afficherMessage(
      westernUnionEdite ? "Western Union modifié avec succès!" : "Western Union ajouté avec succès!",
      "succes",
    )
  }

  // Ajouter une nouvelle agence pour Western Union
  const ajouterAgenceWU = () => {
    if (!nouvelleAgenceWU.trim()) return

    const nouvelleAgenceObj = {
      id: agencesWU.length > 0 ? Math.max(...agencesWU.map((a) => a.id)) + 1 : 1,
      nom: nouvelleAgenceWU,
    }

    // Mettre à jour la liste des agences
    const agencesUpdated = [...agencesWU, nouvelleAgenceObj]
    setAgencesWU(agencesUpdated)
    localStorage.setItem("agencesWU", JSON.stringify(agencesUpdated))

    // Mettre à jour les Western Unions pour inclure la nouvelle agence
    const westernUnionsUpdated = westernUnions.map((wu) => ({
      ...wu,
      consommations: [...(wu.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setWesternUnions(westernUnionsUpdated)
    localStorage.setItem("westernUnions", JSON.stringify(westernUnionsUpdated))

    // Réinitialiser le champ
    setNouvelleAgenceWU("")

    // Afficher un message de succès
    afficherMessage("Agence Western Union ajoutée avec succès!", "succes")
  }

  // Supprimer une agence Western Union
  const supprimerAgenceWU = (agenceId) => {
    // Créer une alerte de confirmation moderne
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence Western Union ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `

    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer l'agence de la liste
      const agencesUpdated = agencesWU.filter((a) => a.id !== agenceId)
      setAgencesWU(agencesUpdated)
      localStorage.setItem("agencesWU", JSON.stringify(agencesUpdated))

      // Mettre à jour les Western Unions pour retirer cette agence
      const westernUnionsUpdated = westernUnions.map((wu) => ({
        ...wu,
        consommations: wu.consommations.filter((c) => c.agenceId !== agenceId),
      }))
      setWesternUnions(westernUnionsUpdated)
      localStorage.setItem("westernUnions", JSON.stringify(westernUnionsUpdated))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Agence Western Union supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Mettre à jour la consommation d'une agence pour Western Union
  const mettreAJourConsommationWU = (westernUnionId, agenceId, quantite) => {
    const westernUnionsUpdated = westernUnions.map((wu) => {
      if (wu.id === westernUnionId) {
        const consommationsUpdated = wu.consommations
          ? wu.consommations.map((c) =>
              c.agenceId === agenceId ? { ...c, quantite: Number.parseInt(quantite) || 0 } : c,
            )
          : [{ agenceId, quantite: Number.parseInt(quantite) || 0 }]

        return { ...wu, consommations: consommationsUpdated }
      }
      return wu
    })

    setWesternUnions(westernUnionsUpdated)
    localStorage.setItem("westernUnions", JSON.stringify(westernUnionsUpdated))
  }

  // Activer/désactiver le mode édition pour un Western Union
  const toggleEditionWesternUnion = (westernUnionId) => {
    if (westernUnionEnEdition === westernUnionId) {
      setWesternUnionEnEdition(null)
      // Afficher un message de succès
      afficherMessage("Modifications enregistrées", "succes")
    } else {
      setWesternUnionEnEdition(westernUnionId)
    }
  }

  // Supprimer un Western Union
  const supprimerWesternUnion = (westernUnionId) => {
    // Créer une alerte de confirmation moderne
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer ce Western Union ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `

    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer le Western Union
      const westernUnionsUpdated = westernUnions.filter((wu) => wu.id !== westernUnionId)
      setWesternUnions(westernUnionsUpdated)
      localStorage.setItem("westernUnions", JSON.stringify(westernUnionsUpdated))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Western Union supprimé avec succès!", "succes")
      }, 300)
    })
  }

  // Fonctions pour les Directions
  const ouvrirModalDirection = () => {
    setDirectionEditee(null)
    setNouvelleDirection({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    setModalDirectionOuvert(true)
  }

  const ouvrirModalEditionDirection = (direction) => {
    setDirectionEditee(direction)
    setNouvelleDirection({
      designation: direction.designation,
      quantite: direction.quantite,
      date: direction.date,
    })
    setModalDirectionOuvert(true)
  }

  const fermerModalDirection = () => {
    setModalDirectionOuvert(false)
  }

  const handleDirectionInputChange = (e) => {
    const { name, value } = e.target
    setNouvelleDirection({
      ...nouvelleDirection,
      [name]: value,
    })
  }

  // Fonction pour ajouter ou modifier une Direction
  const sauvegarderDirection = () => {
    if (directionEditee) {
      // Mise à jour d'une Direction existante
      const directionsUpdated = directions.map((d) =>
        d.id === directionEditee.id
          ? {
              ...d,
              designation: nouvelleDirection.designation,
              quantite: Number.parseInt(nouvelleDirection.quantite),
              date: nouvelleDirection.date,
            }
          : d,
      )
      setDirections(directionsUpdated)
      localStorage.setItem("directions", JSON.stringify(directionsUpdated))
    } else {
      // Ajout d'une nouvelle Direction
      const nouveauId = directions.length > 0 ? Math.max(...directions.map((d) => d.id)) + 1 : 1

      const direction = {
        id: nouveauId,
        designation: nouvelleDirection.designation,
        quantite: Number.parseInt(nouvelleDirection.quantite),
        date: nouvelleDirection.date,
        consommations: agencesDir.map((agence) => ({ agenceId: agence.id, quantite: 0 })),
      }

      const directionsUpdated = [...directions, direction]
      setDirections(directionsUpdated)
      localStorage.setItem("directions", JSON.stringify(directionsUpdated))
    }

    // Réinitialiser le formulaire et fermer le modal
    setNouvelleDirection({
      designation: "",
      quantite: "",
      date: new Date().toISOString().split("T")[0],
    })
    fermerModalDirection()

    // Afficher un message de succès
    afficherMessage(directionEditee ? "Direction modifiée avec succès!" : "Direction ajoutée avec succès!", "succes")
  }

  // Ajouter une nouvelle agence pour Direction
  const ajouterAgenceDir = () => {
    if (!nouvelleAgenceDir.trim()) return

    const nouvelleAgenceObj = {
      id: agencesDir.length > 0 ? Math.max(...agencesDir.map((a) => a.id)) + 1 : 1,
      nom: nouvelleAgenceDir,
    }

    // Mettre à jour la liste des agences
    const agencesUpdated = [...agencesDir, nouvelleAgenceObj]
    setAgencesDir(agencesUpdated)
    localStorage.setItem("agencesDir", JSON.stringify(agencesUpdated))

    // Mettre à jour les Directions pour inclure la nouvelle agence
    const directionsUpdated = directions.map((dir) => ({
      ...dir,
      consommations: [...(dir.consommations || []), { agenceId: nouvelleAgenceObj.id, quantite: 0 }],
    }))
    setDirections(directionsUpdated)
    localStorage.setItem("directions", JSON.stringify(directionsUpdated))

    // Réinitialiser le champ
    setNouvelleAgenceDir("")

    // Afficher un message de succès
    afficherMessage("Agence Direction ajoutée avec succès!", "succes")
  }

  // Supprimer une agence Direction
  const supprimerAgenceDir = (agenceId) => {
    // Créer une alerte de confirmation moderne
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette agence Direction ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `

    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer l'agence de la liste
      const agencesUpdated = agencesDir.filter((a) => a.id !== agenceId)
      setAgencesDir(agencesUpdated)
      localStorage.setItem("agencesDir", JSON.stringify(agencesUpdated))

      // Mettre à jour les Directions pour retirer cette agence
      const directionsUpdated = directions.map((dir) => ({
        ...dir,
        consommations: dir.consommations.filter((c) => c.agenceId !== agenceId),
      }))
      setDirections(directionsUpdated)
      localStorage.setItem("directions", JSON.stringify(directionsUpdated))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Agence Direction supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Mettre à jour la consommation d'une agence pour Direction
  const mettreAJourConsommationDir = (directionId, agenceId, quantite) => {
    const directionsUpdated = directions.map((dir) => {
      if (dir.id === directionId) {
        const consommationsUpdated = dir.consommations
          ? dir.consommations.map((c) =>
              c.agenceId === agenceId ? { ...c, quantite: Number.parseInt(quantite) || 0 } : c,
            )
          : [{ agenceId, quantite: Number.parseInt(quantite) || 0 }]

        return { ...dir, consommations: consommationsUpdated }
      }
      return dir
    })

    setDirections(directionsUpdated)
    localStorage.setItem("directions", JSON.stringify(directionsUpdated))
  }

  // Activer/désactiver le mode édition pour une Direction
  const toggleEditionDirection = (directionId) => {
    if (directionEnEdition === directionId) {
      setDirectionEnEdition(null)
      // Afficher un message de succès
      afficherMessage("Modifications enregistrées", "succes")
    } else {
      setDirectionEnEdition(directionId)
    }
  }

  // Supprimer une Direction
  const supprimerDirection = (directionId) => {
    // Créer une alerte de confirmation moderne
    const alerteElement = document.createElement("div")
    alerteElement.className = "alerte-confirmation"
    alerteElement.innerHTML = `
    <div class="alerte-contenu">
      <div class="alerte-titre">Confirmer la suppression</div>
      <div class="alerte-message">Êtes-vous sûr de vouloir supprimer cette Direction ?</div>
      <div class="alerte-actions">
        <button class="bouton-annuler-alerte">Annuler</button>
        <button class="bouton-confirmer-alerte">Supprimer</button>
      </div>
    </div>
  `

    document.body.appendChild(alerteElement)

    // Animation d'entrée
    setTimeout(() => {
      alerteElement.classList.add("visible")
    }, 10)

    // Gérer les actions
    const boutonAnnuler = alerteElement.querySelector(".bouton-annuler-alerte")
    const boutonConfirmer = alerteElement.querySelector(".bouton-confirmer-alerte")

    boutonAnnuler.addEventListener("click", () => {
      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)
      }, 300)
    })

    boutonConfirmer.addEventListener("click", () => {
      // Supprimer la Direction
      const directionsUpdated = directions.filter((dir) => dir.id !== directionId)
      setDirections(directionsUpdated)
      localStorage.setItem("directions", JSON.stringify(directionsUpdated))

      // Animation de sortie
      alerteElement.classList.remove("visible")
      setTimeout(() => {
        document.body.removeChild(alerteElement)

        // Afficher un message de succès
        afficherMessage("Direction supprimée avec succès!", "succes")
      }, 300)
    })
  }

  // Fonction pour afficher un message
  const afficherMessage = (texte, type) => {
    // Supprimer toute alerte existante
    const alertesExistantes = document.querySelectorAll(".alerte-flottante")
    alertesExistantes.forEach((alerte) => {
      alerte.classList.add("disparition")
      setTimeout(() => {
        if (alerte.parentNode) {
          alerte.parentNode.removeChild(alerte)
        }
      }, 300)
    })

    // Créer la nouvelle alerte
    const messageElement = document.createElement("div")
    messageElement.className = `alerte-flottante alerte-${type}`

    // Icône en fonction du type
    let icone = ""
    if (type === "succes") {
      icone = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
    } else if (type === "erreur") {
      icone = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
    } else if (type === "info") {
      icone = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`
    }

    messageElement.innerHTML = `
    <div class="icone-alerte">${icone}</div>
    <div class="texte-alerte">${texte}</div>
    <button class="fermer-alerte">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  `

    document.body.appendChild(messageElement)

    // Ajouter l'animation d'entrée
    setTimeout(() => {
      messageElement.classList.add("visible")
    }, 10)

    // Ajouter l'événement pour fermer l'alerte
    const boutonFermer = messageElement.querySelector(".fermer-alerte")
    if (boutonFermer) {
      boutonFermer.addEventListener("click", () => {
        messageElement.classList.remove("visible")
        messageElement.classList.add("disparition")
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement)
          }
        }, 300)
      })
    }

    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
      if (messageElement.parentNode) {
        messageElement.classList.remove("visible")
        messageElement.classList.add("disparition")
        setTimeout(() => {
          if (messageElement.parentNode) {
            messageElement.parentNode.removeChild(messageElement)
          }
        }, 300)
      }
    }, 5000)
  }

  // État pour les listes déroulantes
  const [listeAgencesOuverte, setListeAgencesOuverte] = useState(false)
  const [listeAgencesWUOuverte, setListeAgencesWUOuverte] = useState(false)
  const [listeAgencesDirOuverte, setListeAgencesDirOuverte] = useState(false)

  // Fonction pour basculer l'affichage de la liste des agences
  const toggleListeAgences = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setListeAgencesOuverte(!listeAgencesOuverte)
    setListeAgencesWUOuverte(false)
    setListeAgencesDirOuverte(false)
  }

  // Fonction pour basculer l'affichage de la liste des agences Western Union
  const toggleListeAgencesWU = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setListeAgencesWUOuverte(!listeAgencesWUOuverte)
    setListeAgencesOuverte(false)
    setListeAgencesDirOuverte(false)
  }

  // Fonction pour basculer l'affichage de la liste des agences Direction
  const toggleListeAgencesDir = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setListeAgencesDirOuverte(!listeAgencesDirOuverte)
    setListeAgencesOuverte(false)
    setListeAgencesWUOuverte(false)
  }

  // Fermer les listes si on clique ailleurs
  useEffect(() => {
    const fermerListesSiClicExterieur = () => {
      setListeAgencesOuverte(false)
      setListeAgencesWUOuverte(false)
      setListeAgencesDirOuverte(false)
    }

    document.addEventListener("click", fermerListesSiClicExterieur)
    return () => {
      document.removeEventListener("click", fermerListesSiClicExterieur)
    }
  }, [])

  // Filtrer les agences par désignation
  const dispatchesFiltres = dispatches.filter((dispatch) =>
    dispatch.designation.toLowerCase().includes(filtreDesignation.toLowerCase()),
  )

  // Filtrer les Western Unions par désignation
  const westernUnionsFiltres = westernUnions.filter((wu) =>
    wu.designation.toLowerCase().includes(filtreWesternUnion.toLowerCase()),
  )

  // Filtrer les Directions par désignation
  const directionsFiltrees = directions.filter((dir) =>
    dir.designation.toLowerCase().includes(filtreDirection.toLowerCase()),
  )

  // Ajouter la classe d'animation à Agence
  return (
    <div className="page-dispatche animation-dispatche">
      <h1 className="titre-page">Gestion des Agences</h1>

      {/* Section Agence */}
      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Agences</h2>
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
            {agences.length > 0 && (
              <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <button className="bouton-supprimer-liste" onClick={toggleListeAgences}>
                  <Trash size={16} /> Supprimer Agence
                </button>
                {listeAgencesOuverte && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Sélectionner une agence</div>
                    {agences.map((agence) => (
                      <div key={agence.id} className="dropdown-item" onClick={() => supprimerAgence(agence.id)}>
                        {agence.nom}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
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
                      <th key={agence.id} className="th-agence">
                        {agence.nom}
                      </th>
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
                              disabled={dispatchEnEdition !== dispatch.id}
                            />
                          </td>
                        )
                      })}
                      <td>{dispatch.date}</td>
                      <td className="actions-cellule">
                        <button
                          className={`bouton-modifier ${dispatchEnEdition === dispatch.id ? "actif" : ""}`}
                          onClick={() => toggleEditionDispatch(dispatch.id)}
                        >
                          {dispatchEnEdition === dispatch.id ? (
                            <>
                              <Save size={14} /> Enregistrer
                            </>
                          ) : (
                            <>
                              <Edit size={14} /> Modifier
                            </>
                          )}
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerDispatch(dispatch.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agences.length > 0 ? agences.length + 4 : 4} className="no-data">
                      Aucune agence trouvée. Utilisez le bouton "Ajouter" pour en créer une.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section Western Union */}
      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Western Union</h2>
          <div className="actions-entete">
            <div className="champ-recherche-wrapper">
              <Search size={18} className="icone-recherche" />
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreWesternUnion}
                onChange={(e) => setFiltreWesternUnion(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <div className="ajout-agence">
              <input
                type="text"
                placeholder="Nom de la nouvelle agence"
                value={nouvelleAgenceWU}
                onChange={(e) => setNouvelleAgenceWU(e.target.value)}
                className="champ-nouvelle-agence"
              />
              <button className="bouton-ajouter-agence" onClick={ajouterAgenceWU} disabled={!nouvelleAgenceWU.trim()}>
                <Plus size={16} /> Ajouter Agence
              </button>
            </div>
            {agencesWU.length > 0 && (
              <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <button className="bouton-supprimer-liste" onClick={toggleListeAgencesWU}>
                  <Trash size={16} /> Supprimer Agence
                </button>
                {listeAgencesWUOuverte && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Sélectionner une agence</div>
                    {agencesWU.map((agence) => (
                      <div key={agence.id} className="dropdown-item" onClick={() => supprimerAgenceWU(agence.id)}>
                        {agence.nom}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button className="bouton-ajouter" onClick={ouvrirModalWesternUnion}>
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
                  {agencesWU.length > 0 && <th colSpan={agencesWU.length}>Consommations des agences</th>}
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {agencesWU.length > 0 && (
                  <tr>
                    <th></th>
                    <th></th>
                    {agencesWU.map((agence) => (
                      <th key={agence.id} className="th-agence">
                        {agence.nom}
                      </th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {westernUnionsFiltres.length > 0 ? (
                  westernUnionsFiltres.map((westernUnion) => (
                    <tr key={westernUnion.id}>
                      <td>{westernUnion.designation}</td>
                      <td>{westernUnion.quantite}</td>
                      {agencesWU.map((agence) => {
                        const consommation = westernUnion.consommations?.find((c) => c.agenceId === agence.id)
                        return (
                          <td key={`${westernUnion.id}-${agence.id}`}>
                            <input
                              type="number"
                              min="0"
                              max={westernUnion.quantite}
                              value={consommation?.quantite || 0}
                              onChange={(e) => mettreAJourConsommationWU(westernUnion.id, agence.id, e.target.value)}
                              className="input-consommation"
                              disabled={westernUnionEnEdition !== westernUnion.id}
                            />
                          </td>
                        )
                      })}
                      <td>{westernUnion.date}</td>
                      <td className="actions-cellule">
                        <button
                          className={`bouton-modifier ${westernUnionEnEdition === westernUnion.id ? "actif" : ""}`}
                          onClick={() => toggleEditionWesternUnion(westernUnion.id)}
                        >
                          {westernUnionEnEdition === westernUnion.id ? (
                            <>
                              <Save size={14} /> Enregistrer
                            </>
                          ) : (
                            <>
                              <Edit size={14} /> Modifier
                            </>
                          )}
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerWesternUnion(westernUnion.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agencesWU.length > 0 ? agencesWU.length + 4 : 4} className="no-data">
                      Aucun Western Union trouvé. Utilisez le bouton "Ajouter" pour en créer un.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Section Directions */}
      <div className="section-dispatche">
        <div className="entete-section">
          <h2>Liste des Directions</h2>
          <div className="actions-entete">
            <div className="champ-recherche-wrapper">
              <Search size={18} className="icone-recherche" />
              <input
                type="text"
                placeholder="Filtrer par désignation..."
                value={filtreDirection}
                onChange={(e) => setFiltreDirection(e.target.value)}
                className="champ-filtre"
              />
            </div>
            <div className="ajout-agence">
              <input
                type="text"
                placeholder="Nom de la nouvelle agence"
                value={nouvelleAgenceDir}
                onChange={(e) => setNouvelleAgenceDir(e.target.value)}
                className="champ-nouvelle-agence"
              />
              <button className="bouton-ajouter-agence" onClick={ajouterAgenceDir} disabled={!nouvelleAgenceDir.trim()}>
                <Plus size={16} /> Ajouter Agence
              </button>
            </div>
            {agencesDir.length > 0 && (
              <div className="dropdown-container" onClick={(e) => e.stopPropagation()}>
                <button className="bouton-supprimer-liste" onClick={toggleListeAgencesDir}>
                  <Trash size={16} /> Supprimer Agence
                </button>
                {listeAgencesDirOuverte && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">Sélectionner une agence</div>
                    {agencesDir.map((agence) => (
                      <div key={agence.id} className="dropdown-item" onClick={() => supprimerAgenceDir(agence.id)}>
                        {agence.nom}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            <button className="bouton-ajouter" onClick={ouvrirModalDirection}>
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
                  {agencesDir.length > 0 && <th colSpan={agencesDir.length}>Consommations des agences</th>}
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
                {agencesDir.length > 0 && (
                  <tr>
                    <th></th>
                    <th></th>
                    {agencesDir.map((agence) => (
                      <th key={agence.id} className="th-agence">
                        {agence.nom}
                      </th>
                    ))}
                    <th></th>
                    <th></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {directionsFiltrees.length > 0 ? (
                  directionsFiltrees.map((direction) => (
                    <tr key={direction.id}>
                      <td>{direction.designation}</td>
                      <td>{direction.quantite}</td>
                      {agencesDir.map((agence) => {
                        const consommation = direction.consommations?.find((c) => c.agenceId === agence.id)
                        return (
                          <td key={`${direction.id}-${agence.id}`}>
                            <input
                              type="number"
                              min="0"
                              max={direction.quantite}
                              value={consommation?.quantite || 0}
                              onChange={(e) => mettreAJourConsommationDir(direction.id, agence.id, e.target.value)}
                              className="input-consommation"
                              disabled={directionEnEdition !== direction.id}
                            />
                          </td>
                        )
                      })}
                      <td>{direction.date}</td>
                      <td className="actions-cellule">
                        <button
                          className={`bouton-modifier ${directionEnEdition === direction.id ? "actif" : ""}`}
                          onClick={() => toggleEditionDirection(direction.id)}
                        >
                          {directionEnEdition === direction.id ? (
                            <>
                              <Save size={14} /> Enregistrer
                            </>
                          ) : (
                            <>
                              <Edit size={14} /> Modifier
                            </>
                          )}
                        </button>
                        <button className="bouton-supprimer" onClick={() => supprimerDirection(direction.id)}>
                          <Trash size={14} /> Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={agencesDir.length > 0 ? agencesDir.length + 4 : 4} className="no-data">
                      Aucune direction trouvée. Utilisez le bouton "Ajouter" pour en créer une.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal pour Agence */}
      {modalOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{dispatchEdite ? "Modifier" : "Ajouter"} une agence</h2>

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

      {/* Modal pour Western Union */}
      {modalWesternUnionOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{westernUnionEdite ? "Modifier" : "Ajouter"} un Western Union</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="wu-designation">Désignation</label>
                <input
                  id="wu-designation"
                  name="designation"
                  type="text"
                  value={nouveauWesternUnion.designation}
                  onChange={handleWesternUnionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="wu-quantite">Quantité</label>
                <input
                  id="wu-quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouveauWesternUnion.quantite}
                  onChange={handleWesternUnionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="wu-date">Date</label>
                <input
                  id="wu-date"
                  name="date"
                  type="date"
                  value={nouveauWesternUnion.date}
                  onChange={handleWesternUnionInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModalWesternUnion}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderWesternUnion}
                  disabled={!nouveauWesternUnion.designation || !nouveauWesternUnion.quantite}
                >
                  {westernUnionEdite ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal pour Direction */}
      {modalDirectionOuvert && (
        <div className="modal-overlay">
          <div className="modal-contenu">
            <h2>{directionEditee ? "Modifier" : "Ajouter"} une direction</h2>

            <div className="formulaire-modal">
              <div className="groupe-champ">
                <label htmlFor="dir-designation">Désignation</label>
                <input
                  id="dir-designation"
                  name="designation"
                  type="text"
                  value={nouvelleDirection.designation}
                  onChange={handleDirectionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="dir-quantite">Quantité</label>
                <input
                  id="dir-quantite"
                  name="quantite"
                  type="number"
                  min="1"
                  value={nouvelleDirection.quantite}
                  onChange={handleDirectionInputChange}
                  required
                />
              </div>

              <div className="groupe-champ">
                <label htmlFor="dir-date">Date</label>
                <input
                  id="dir-date"
                  name="date"
                  type="date"
                  value={nouvelleDirection.date}
                  onChange={handleDirectionInputChange}
                  required
                />
              </div>

              <div className="actions-modal">
                <button className="bouton-annuler" onClick={fermerModalDirection}>
                  Annuler
                </button>
                <button
                  className="bouton-sauvegarder"
                  onClick={sauvegarderDirection}
                  disabled={!nouvelleDirection.designation || !nouvelleDirection.quantite}
                >
                  {directionEditee ? "Modifier" : "Ajouter"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Agence

