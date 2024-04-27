import React from 'react';
import logo from '../img/logo.svg';

// El footer contiene el logo de la aplicación y un mensaje
function Footer() {
  return (
    <div className="footer">
      <div className="contenedor">
        <img src={logo} alt=''/>
        <span>
          Creado por Luis
        </span>
       </div>
    </div>
  )
}

export default Footer;
