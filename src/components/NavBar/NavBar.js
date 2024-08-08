import React from 'react'
import { useState } from 'react'
import { NavLink} from 'react-router-dom'
import { ReactComponent as Hamburger } from '../../assets/hamburguerIcon.svg'
import './navbar.css'

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)
  const [isPopupOpenRegistro, setPopUpOpenRegistro] = useState(false);
  const [isPopupOpenLogin, setPopUpOpenLogin] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  const openPopUpRegistro = () => {
    setPopUpOpenRegistro(true);
  };

  const closePopUpRegistro = () => {
    setPopUpOpenRegistro(false);
  };

  const openPopUpLogin = () => {
    setPopUpOpenLogin(true);
  };

  const closePopUpLogin = () => {
    setPopUpOpenLogin(false);
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          MY STATS
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <Hamburger />
        </div>
        <div className={`nav-elements  ${showNavbar && 'active'}`}>
          <ul>
            <li>
              <NavLink to="/">Inicio</NavLink>
            </li>
            <li>
              <NavLink to="/agregar">Agregar</NavLink>
            </li>
            <li>
              <NavLink to="/buscar">Buscar</NavLink>
            </li>
            <li>
              <NavLink to="/stats">Stats</NavLink>
            </li>

            <li>
              <button onClick={openPopUpLogin} id='iniciarBtn'>Iniciar sesión</button>
              {isPopupOpenLogin && (
        <div className="ventana-popup">
          <div className="contenido-popup">
            <h2>Inicia Sesión</h2>
            <form>
              <label>Correo</label>
              <input type="email" placeholder="Correo" />
              <label>Contraseña</label>
              <input type="password" placeholder="Contraseña" />
              <button className='finishBtn'>Login</button>
            </form>
            <button className='cerrarBtn' onClick={closePopUpLogin}><img width="50" height="50" src="https://img.icons8.com/ios/50/FA5252/close-window--v1.png" alt="close-window--v1"/></button>
          </div>
        </div>
      )}
            </li>
            <li>
              <button onClick={openPopUpRegistro} id='registrarBtn'>Registrarme</button>
              {isPopupOpenRegistro && (
        <div className="ventana-popup">
          <div className="contenido-popup">
            <h2>Registrate</h2>
            <form>
              <div className='registerDiv'>
                <label>Información personal</label>
                <div id='infoPlayer'>
              <input type="text" placeholder="Nombre" />
              <input type="email" placeholder="Apellido" />
              <input type="date" placeholder="Fecha de nacimiento" />
              <input type="number" placeholder="Altura " />
              <input type="number" placeholder="Peso " />
              </div>
              </div>
              <div className='registerDiv'>
                <label>Información de jugador</label>
                <div>
                <input type="text" placeholder="Club " />
                <input type="number" placeholder="Dorsal " />
              </div>
              </div>
              <div className='registerDiv'>
                <label>Información de cuenta</label>
                <div>
              <input type="email" placeholder="Correo" />
              <input type="password" placeholder="Contraseña" />
              </div>
              </div>
              <button className='finishBtn'>Registrarme</button>
            </form>
            <button className='cerrarBtn' onClick={closePopUpRegistro}><img width="50" height="50" src="https://img.icons8.com/ios/50/FA5252/close-window--v1.png" alt="close-window--v1"/></button>
          </div>
        </div>
      )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
