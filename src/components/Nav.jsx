import React from 'react';
import { Link } from 'react-router-dom';

// El componente Nav contiene el menú de nuestra aplicación
// Los links nos permiten navegar a cada una de las páginas

/* El componente recibe por props la función toggleMenú
para poder cerrar el desplegable responsive */
function Nav({ toggleMenu }) {

    // Función que dispara la función toggleMenú
    const cierraMenu = () => {
        toggleMenu();
    }

  return (
    <div className="nav">
        <div className="links">
            <Link className="link" to="/aventuras" onClick={cierraMenu} >
                <h2>AVENTURAS</h2>
            </Link>
            <Link className="link" to="/novelas" onClick={cierraMenu} >
                <h2>NOVELAS</h2>
            </Link>
            <Link className="link" to="/cienciaFiccion" onClick={cierraMenu} >
                <h2>CIENCIA FICCIÓN</h2>
            </Link>
            <Link className="link" to="/salud" onClick={cierraMenu} >
                <h2>SALUD</h2>
            </Link>
            <Link className="link" to="/autoayuda" onClick={cierraMenu} >
                <h2>AUTOAYUDA</h2>
            </Link>
            <Link className="link" to="/empresa" onClick={cierraMenu} >
                <h2>EMPRESA</h2>
            </Link>
            <button className="nav-cerrar" onClick={cierraMenu} >
                X
            </button>
        </div>
        
    </div>
  )
}

export default Nav;
