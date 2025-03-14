"use client"

import { createContext, useState, useContext, useEffect } from "react"

// Création du contexte
const StockContexte = createContext()

// Hook personnalisé pour utiliser le contexte
export const useStock = () => {
  return useContext(StockContexte)
}

// Provider du contexte
export const StockProvider = ({ children }) => {
  // État pour les lignes de stock
  const [lignesStock, setLignesStock] = useState([])

  // État pour l'inventaire
  const [inventaire, setInventaire] = useState([])

  // Rétablir les catégories prédéfinies
  const [categoriesStock, setCategoriesStock] = useState([
    { id: 1, nom: "Produits Informatiques", quantite: 0, icone: "Computer" },
    { id: 2, nom: "Produits d'Entretien", quantite: 0, icone: "Brush" },
    { id: 3, nom: "Produits de Magasin", quantite: 0, icone: "Package" },
    { id: 4, nom: "Produits de Bureau", quantite: 0, icone: "FileText" },
  ])

  // Charger les données du localStorage au démarrage
  useEffect(() => {
    const stockSauvegarde = localStorage.getItem("lignesStock")
    const inventaireSauvegarde = localStorage.getItem("inventaire")
    const categoriesSauvegardees = localStorage.getItem("categoriesStock")

    if (stockSauvegarde) {
      const stockParse = JSON.parse(stockSauvegarde)
      setLignesStock(stockParse)
      mettreAJourQuantitesCategories(stockParse)
    }

    if (inventaireSauvegarde) {
      setInventaire(JSON.parse(inventaireSauvegarde))
    }

    if (categoriesSauvegardees) {
      setCategoriesStock(JSON.parse(categoriesSauvegardees))
    } else {
      // Si pas de catégories sauvegardées, sauvegarder les catégories par défaut
      localStorage.setItem("categoriesStock", JSON.stringify(categoriesStock))
    }
  }, [])

  // Fonction pour mettre à jour les quantités par catégorie
  const mettreAJourQuantitesCategories = (lignes) => {
    // Créer un objet pour stocker les quantités par catégorie
    const quantitesParCategorie = {}

    // Initialiser les quantités à 0
    categoriesStock.forEach((cat) => {
      quantitesParCategorie[cat.nom] = 0
    })

    // Calculer les quantités par catégorie
    lignes.forEach((ligne) => {
      if (quantitesParCategorie[ligne.categorie] !== undefined) {
        quantitesParCategorie[ligne.categorie] += ligne.stockActuel.quantite
      } else {
        // Si la catégorie n'existe pas encore, l'initialiser à la quantité de la ligne
        quantitesParCategorie[ligne.categorie] = ligne.stockActuel.quantite
      }
    })

    // Mettre à jour les catégories
    setCategoriesStock((prevCategories) => {
      const updatedCategories = prevCategories.map((cat) => ({
        ...cat,
        quantite: quantitesParCategorie[cat.nom] || 0,
      }))

      // Vérifier s'il y a des catégories dans les lignes qui ne sont pas dans les catégories existantes
      const categoriesExistantes = new Set(prevCategories.map((cat) => cat.nom))

      // Ajouter les nouvelles catégories
      Object.keys(quantitesParCategorie).forEach((nomCategorie) => {
        if (!categoriesExistantes.has(nomCategorie) && quantitesParCategorie[nomCategorie] > 0) {
          // Déterminer l'icône en fonction du nom de la catégorie
          let icone = "Package"
          if (nomCategorie.toLowerCase().includes("informatique")) {
            icone = "Computer"
          } else if (nomCategorie.toLowerCase().includes("entretien")) {
            icone = "Brush"
          } else if (nomCategorie.toLowerCase().includes("bureau")) {
            icone = "FileText"
          }

          updatedCategories.push({
            id: Date.now() + Math.random(), // Assurer un ID unique
            nom: nomCategorie,
            quantite: quantitesParCategorie[nomCategorie],
            icone: icone,
          })
        }
      })

      // Sauvegarder les catégories mises à jour
      localStorage.setItem("categoriesStock", JSON.stringify(updatedCategories))

      return updatedCategories
    })
  }

  // Fonction pour ajouter une ligne de stock
  const ajouterLigneStock = (nouvelleLigne) => {
    const lignesUpdated = [...lignesStock, nouvelleLigne]
    setLignesStock(lignesUpdated)
    localStorage.setItem("lignesStock", JSON.stringify(lignesUpdated))

    // Mettre à jour les quantités des catégories
    mettreAJourQuantitesCategories(lignesUpdated)
  }

  // Fonction pour mettre à jour une ligne de stock
  const mettreAJourLigneStock = (id, ligneModifiee) => {
    const lignesUpdated = lignesStock.map((ligne) => (ligne.id === id ? ligneModifiee : ligne))
    setLignesStock(lignesUpdated)
    localStorage.setItem("lignesStock", JSON.stringify(lignesUpdated))

    // Mettre à jour les quantités des catégories
    mettreAJourQuantitesCategories(lignesUpdated)
  }

  // Fonction pour supprimer une ligne de stock
  const supprimerLigneStock = (id) => {
    const lignesUpdated = lignesStock.filter((ligne) => ligne.id !== id)
    setLignesStock(lignesUpdated)
    localStorage.setItem("lignesStock", JSON.stringify(lignesUpdated))

    // Mettre à jour les quantités des catégories
    mettreAJourQuantitesCategories(lignesUpdated)
  }

  // Fonction pour enregistrer l'inventaire
  const enregistrerInventaire = () => {
    // Créer un nouvel inventaire à partir des lignes de stock actuelles
    const nouvelInventaire = lignesStock.map((ligne) => ({
      id: ligne.id,
      designation: ligne.designation,
      categorie: ligne.categorie,
      date: ligne.stockActuel.date,
      quantite: ligne.stockActuel.quantite,
    }))

    setInventaire(nouvelInventaire)
    localStorage.setItem("inventaire", JSON.stringify(nouvelInventaire))

    return nouvelInventaire
  }

  // Valeur du contexte
  const valeur = {
    lignesStock,
    setLignesStock,
    categoriesStock,
    setCategoriesStock,
    inventaire,
    setInventaire,
    ajouterLigneStock,
    mettreAJourLigneStock,
    supprimerLigneStock,
    enregistrerInventaire,
    mettreAJourQuantitesCategories,
  }

  return <StockContexte.Provider value={valeur}>{children}</StockContexte.Provider>
}

