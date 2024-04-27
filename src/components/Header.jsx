
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../img/logo.svg';
import Nav from './Nav';


function Header() {

  //Creamos un estado para la navegación desplegable que inicializamos en false
  const [navAbierto, setNavAbierto] = useState(false);

  /* Creamos la función que nos permite abrir y cerrar el desplegable
  modificando el valor del estado */
  const toggleModal = () => {
    setNavAbierto(!navAbierto);
}
  /* Retorna el Header de la aplicación:
  Contiene el logo, el componente nav, dos botones ocultos en versión escritorio
  que permiten abrir y cerrar la navegación responsive, el nombre del usuario
  con la sesión activa, el enlace a la página de Logout y el botón para crear
  nuestras publicaciones. */
  return (
    <div className="header">
      <div className="logo">
        <Link to='/inicio'><img src={logo} alt='logo'/></Link>
      </div>
      <div className={`nav-links ${navAbierto && 'desplegado'}`}>
          <Nav toggleMenu={toggleModal} />
      </div>
      <button className='nav-abrir' onClick={toggleModal}>
        Menú
      </button>    
      <div className="usuario">
        <span>{ JSON.parse( localStorage.getItem('usuario' )).nombre }</span>
        <span>
          <Link className='logout' to='/logout'>Logout</Link>
        </span>
        <span className="publicacion">
          <Link className="crear" to='/crearPost'>Crear post</Link>
        </span>
      </div>
    </div>
  );
}

export default Header;

