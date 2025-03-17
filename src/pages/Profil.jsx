"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexte/AuthContexte";
import "../styles/Profil.css";
import {
  User,
  Mail,
  Calendar,
  MapPin,
  Briefcase,
  Shield,
  Clock,
  Activity,
  LogIn,
  Settings,
  Bell,
  Phone,
  Moon,
  Globe,
} from "lucide-react";

function Profil() {
  const { utilisateurCourant } = useAuth();
  const [activeTab, setActiveTab] = useState("informations");
  const [loading, setLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);
  const [formData, setFormData] = useState({
    nom: utilisateurCourant.nom,
    email: utilisateurCourant.email,
    telephone: "",
    adresse: "",
    poste: "",
    dateInscription: "",
    motDePasseActuel: "",
    nouveauMotDePasse: "",
    confirmationMotDePasse: "",
  });
  const [message, setMessage] = useState({ type: "", texte: "" });
  const [preferences, setPreferences] = useState({
    notifications: true,
    modeNuit: false,
    langagePrefere: "Français",
    formatDate: "DD/MM/YYYY",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    const statsTimer = setTimeout(() => setStatsVisible(true), 1200);
    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreferenceChange = (e) => {
    const { name, type, checked, value } = e.target;
    setPreferences((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const mettreAJourProfil = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: "succes", texte: "Profil mis à jour avec succès!" });
      setTimeout(() => setMessage({ type: "", texte: "" }), 3000);
    }, 1000);
  };

  const changerMotDePasse = (e) => {
    e.preventDefault();
    if (formData.nouveauMotDePasse !== formData.confirmationMotDePasse) {
      setMessage({ type: "erreur", texte: "Les mots de passe ne correspondent pas." });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessage({ type: "succes", texte: "Mot de passe changé avec succès!" });
      setFormData((prev) => ({ ...prev, motDePasseActuel: "", nouveauMotDePasse: "", confirmationMotDePasse: "" }));
      setTimeout(() => setMessage({ type: "", texte: "" }), 3000);
    }, 1000);
  };

  if (loading) return <div>Chargement...</div>;

  return (
    <div className="page-profil">
      <h1>Profil Utilisateur</h1>
      {message.texte && <div className={`alerte ${message.type}`}>{message.texte}</div>}
      <div>
        <button onClick={() => setActiveTab("informations")}>
          <User /> Informations
        </button>
        <button onClick={() => setActiveTab("securite")}>
          <Shield /> Sécurité
        </button>
        <button onClick={() => setActiveTab("preferences")}>
          <Settings /> Préférences
        </button>
      </div>
      {activeTab === "informations" && (
        <form onSubmit={mettreAJourProfil}>
          <input name="nom" value={formData.nom} onChange={handleInputChange} />
          <input name="email" value={formData.email} onChange={handleInputChange} />
          <button type="submit">Mettre à jour</button>
        </form>
      )}
      {activeTab === "securite" && (
        <form onSubmit={changerMotDePasse}>
          <input name="motDePasseActuel" type="password" value={formData.motDePasseActuel} onChange={handleInputChange} />
          <input name="nouveauMotDePasse" type="password" value={formData.nouveauMotDePasse} onChange={handleInputChange} />
          <input name="confirmationMotDePasse" type="password" value={formData.confirmationMotDePasse} onChange={handleInputChange} />
          <button type="submit">Changer mot de passe</button>
        </form>
      )}
      {activeTab === "preferences" && (
        <div>
          <label>
            <input type="checkbox" name="notifications" checked={preferences.notifications} onChange={handlePreferenceChange} /> Notifications
          </label>
          <label>
            <input type="checkbox" name="modeNuit" checked={preferences.modeNuit} onChange={handlePreferenceChange} /> Mode nuit
          </label>
        </div>
      )}
    </div>
  );
}

export default Profil;
