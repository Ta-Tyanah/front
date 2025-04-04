"use client"

import { Navigate } from "react-router-dom"
import { useAuth } from "../contexte/AuthContexte"
import PropTypes from 'prop-types';

function ProtectionRoute({ children }) {
  const { utilisateurCourant } = useAuth()

  if (!utilisateurCourant) {
    return <Navigate to="/connexion" />
  }

  return children
}

// Ajout des PropTypes
ProtectionRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectionRoute