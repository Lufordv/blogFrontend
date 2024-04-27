
// PAGINA DE LOGIN

// Importamos la imagen del logo desde nuestra carpeta imágenes
// Importamos el hook useState para trabajar los estados
// Importamos el hook useNavigate para hacer redirecciones entre URLs
// Importamos Link de react-router-dom para poder navegar a la página de registro
// Importamos axios para realizar las peticiones al servidor 
import React from "react";
import logo from '../img/logo.svg';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function Login() {
  /* Creamos tres estados:
  Uno para el formulario, otro para los mensajes de error y otro para el aviso de inicio de sesión */ 
  const [ login,setLogin ] = useState ({  nombre:'', password:'', error:'', idUsuario: null });
  const [ errores,setErrores ] = useState({ nombre:'', password:'' });
  const [ mensaje, setMensaje ] = useState('');

  /* Creamos la constante navegar que dispara el hook useNavigate
  para redigir al usuario. Lo utilizaremos para llevarlo a la home
  si se loguea con éxito */
  const navegar = useNavigate();

  // Función para obtener los datos del formulario
  function handleChange (e) {
    let nombre = e.target.name;
    let valor = e.target.value;
    setLogin({ ...login, [ nombre ]: valor });
  } 

  // Función para el envío del formulario
  function handleSubmit (e) {
    // Evita el comportamiento por defecto del formulario
    e.preventDefault();
    /* Creamos la variable erroresTemp para mostrar los posibles errores
    que se mostrarán debajo de los inputs */
    let erroresTemp = {};
    // Si los campos se quedan sin rellenar lanzaremos un mensaje de error
    if (login.nombre === '') {
      erroresTemp.nombre = 'El campo nombre no puede estar vacío';
    }
    if (login.password === '') {
      erroresTemp.password = 'El campo password no puede estar vacío';
    }
    /* Si el objeto que contiene la variable creada es mayor que cero,
    entonces seteamos el estado para que se muestren los mensajes de error */
    if (Object.keys( erroresTemp ).length > 0) {
      setErrores( erroresTemp );
    } else {
      // En caso contrario el estado permanecerá vacío
      setErrores({}),
    // Después envíamos la petición de login al servidor
    axios.post( 'https://blogbackend1-0nyy.onrender.com/', login )
    .then((response) => {
      // Cuando recibamos la respuesta guardamos la id del usuario que va a iniciar sesión
      const idUsuario  = response.data.idUsuario;
      // Si el estado de la respuesta es fallido seteamos el estado para mostrar el error     
      if (response.data.status === 'failed' ) {
        setLogin({ ...login, error: 'Usuario no encontrado. Por favor, inténtelo de nuevo' });
      } else {
        // En caso contrario, actualizamos el estado y la id del usuario que va a iniciar sesión 
        setLogin({ ...login, idUsuario: idUsuario })
          // Introducimos los datos del usuario y su id en el almacenamiento local 
          localStorage.setItem( 'usuario', JSON.stringify({ ...login, idUsuario: idUsuario }));
          // Mostramos el aviso programado en el servidor de inicio de sesión
          setMensaje(response.data.message);
          // Llevamos al usuario a la home después de 2,5 segundos
          setTimeout(() => {
          navegar('/inicio');
        },2500); 
      }
    });
    }
  };

  // Retorna el formulario de login y un link para ir a la página de registro
  return (
    <>
      <div className="fondo">
        {login.error && <span className="notFound">{login.error}</span>}
        {mensaje && <span className="success">{mensaje}</span>}
        <div className="autenticacion">
          <h1>Login</h1>
          <form action='https://blogbackend1-0nyy.onrender.com/' method='POST' onSubmit={handleSubmit}>
            <input
              className='campo'
              type='text'
              placeholder='nombre'
              name='nombre'
              id='nom'
              value={login.nombre}
              onChange={handleChange}
            />
            {errores.nombre && <p>{errores.nombre}</p>}
            <input
              className='campo'
              type='password'
              placeholder='password'
              name='password'
              id='pass'
              value={login.password}
              onChange={handleChange}
            />
            {errores.password && <p>{errores.password}</p>}
            <input className='envio' type='submit' value='Enviar'/>
            <span>¿Todavía no tienes cuenta?<br/><Link to="/registro">Regístrate</Link></span>
          </form>
          <div className="logo">
            <img src={logo} alt='logo'/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
