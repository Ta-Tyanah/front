import { useState, useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import Header from "../composants/Header"
import SidebarMenu from "../composants/SidebarMenu"

function Dashboard() {
  const [menuMobileOuvert, setMenuMobileOuvert] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  // Simulation de chargement initial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

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
          <Outlet />
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

export default Dashboard

