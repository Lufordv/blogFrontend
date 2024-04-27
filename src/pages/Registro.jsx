
// PAGINA DE REGISTRO

// Importamos la imagen del logo desde nuestra carpeta imágenes
// Importamos el hook useState para trabajar los estados
// Importamos el hook useNavigate para hacer redirecciones entre URLs
// Importamos Link de react-router-dom para poder navegar a la página de login
// Importamos axios para realizar las peticiones al servidor 
import React from "react";
import logo from '../img/logo.svg';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Registro() {
    /* Creamos tres estados:
    Uno para el formulario, otro para los mensajes de error y otro para el aviso de registro exitoso */
    const [registro,setRegistro] = useState ({ nombre:'', email:'', password:'', error:'' });
    const [errores,setErrores] = useState({ nombre:'', email:'', password:'' })
    const [ mensaje, setMensaje ] = useState('');

    /* Creamos la constante navegar que dispara el hook useNavigate
    para redigir al usuario. Lo utilizaremos para llevarlo a la
    página de login si se registra con éxito */
    const navegar = useNavigate();

    // Función para obtener los datos del formulario
    function handleChange (e) {
      let nombre = e.target.name;
      let valor = e.target.value;
      setRegistro({...registro, [nombre]: valor});
    } 
    // Función para el envío del formulario
    function handleSubmit (e) {
      // Evita el comportamiento por defecto del formulario
      e.preventDefault();
      /*Creamos la variable erroresTemp para mostrar los posibles errores
      que se mostrarán debajo de los inputs */
      let erroresTemp = {};
      // Si el campo nombre se queda sin rellenar, lanzaremos un mensaje de error
      if (registro.nombre === '') {
        erroresTemp.nombre = 'El campo nombre no puede estar vacío';
      }
      /* Utilizamos una expresión regular en el campo email
      para asegurarnos de que el usuario introduce un email válido */
      if (!(/^\S+@\S+\.\S+$/.test(registro.email))) {
        erroresTemp.email = 'El formato de email no es válido';
      }
      /* Utilizamos una expresión regular en el campo contraseña para obligar al usuario
      a generar una contraseña fuerte. Si la contraseña no cumple los requisitos establecidos,
      sale un aviso que informa al usuario sobre qué tipo de caracteres debe introducir */
      if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(registro.password)) {
        erroresTemp.password = 'La contraseña debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número';
      }
      /* Si el objeto que contiene la variable creada es mayor que cero,
      entonces seteamos el estado para que se muestren los mensajes de error */
      if ( Object.keys( erroresTemp ).length > 0 ) {
        setErrores( erroresTemp );
      } else {
        // En caso contrario el estado permanecerá vacío
        setErrores({}),
        // Después envíamos la petición de registro de 'nuevo usuario' al servidor
        axios.post( 'https://blogbackend1-0nyy.onrender.com/registro', registro )
        .then( ( response ) => {
          /* Si el servidor nos envía un estado fallido
          significa que el usuario ya existe. Mostramos mensaje de error */
          if (response.data.status === 'failed') {
            setRegistro( {...registro, error: 'Error. El usuario introducido ya existe' });
          } else {
            /* En caso contrario mostramos el mensaje de éxito del servidor
            y redirigimos al usuario a la página de login después de 1 segundo */
            setMensaje(response.data.message);
            setTimeout(() => {
              navegar('/');
            },1000); 
          }
        }) 
      }
    }
    // Retorna el formulario de registro y un link para ir a la página de login
    return (
      <>
        <div className="fondo">
          {registro.error && <span className="notFound">{registro.error}</span>}
          {mensaje && <span className="success">{mensaje}</span>}  
          <div className="autenticacion">
            <h1>Registro</h1>
            <form action='https://blogbackend1-0nyy.onrender.com/registro' method='POST' onSubmit={handleSubmit}>
              <input 
                className='campo'
                type='text'
                placeholder='nombre'
                name='nombre'
                value={registro.nombre}
                onChange={handleChange}
              />
              {errores.nombre && <p>{errores.nombre}</p>}
              <input
                className='campo'
                type='email'
                placeholder='email'
                name='email'
                value={registro.email}
                required
                onChange={handleChange}
                
              />
              {errores.email && <p>{errores.email}</p>}
              <input 
                className='campo'
                type='password'
                placeholder='password'
                name='password'
                value={registro.password}
                required
                onChange={handleChange}
                
              />
              {errores.password && <p>{errores.password}</p>}
              <input className='envio' type='submit' value='Enviar'/>
              <span>¿Ya tienes una cuenta?<br/><Link to="/">Inicia sesión</Link></span>
            </form>
            <div className="logo">
              <img src={logo} alt='logo'/>
            </div>
          </div>
        </div>
      </>
    )
  }
  
  export default Registro;
  