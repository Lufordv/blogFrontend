import React from 'react';
import axios from 'axios';
/* Importamos el hook useParams para poder acceder desde nuestro componente
a los parámetros de la ruta y el hook useNavigate para realizar redirecciones
entre URLs */
import { useParams, useNavigate } from 'react-router-dom';

// Función para mostrar la modal que recibe por props la función de Cerrar Modal
function Modal({ cierraModal }) {

  // En una constante almacenamos el valor id del post, recuperado de la URL
  const {id} = useParams();

  /* Creamos la constante navegar que dispara el hook useNavigate
    para redigir al usuario. Lo utilizaremos para llevarlo a la
    home después de borrar un post */
  const navegar = useNavigate();
  
  // Función que borra el post con esa id
  function handleDelete () {
    axios.delete( 'https://blogbackend1-0nyy.onrender.com/postsById?id=' + id )
    .then( response => {
      if (response.data.status === 'failed' ) {
        // Si la petición falla mostramos mensaje de error
        setPost({ error: 'Error: No se ha podio eliminar el post' });
      } else {
          // En caso contrario es que el borrado se ha realizado con éxito.
          // Entonces navegamos de nuevo hasta la página de inicio
         navegar('/inicio');
        }
    });
  };
  // Retorna la ventana modal con sus textos y los botones.
  // El botón borrar dispara la función handleDelete.
  // El botón cancelar cierra la ventana modal
  return (
    <>
      <div className='modal'>
        <div className='aviso'>
          <div className='texto'>
            <span>¡ATENCIÓN!</span>
            <p className='textoBorrar'>¿Deseas borrar este post?</p>
            <p className='textoDeshacer'>( Esta acción no se puede deshacer )</p>
          </div>
          <div className='acciones'>
              <button className='botonBorrar' onClick={handleDelete}>Si</button>
              <button className='botonVolver' onClick={cierraModal}>No</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
