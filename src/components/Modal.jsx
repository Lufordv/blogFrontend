import React from 'react';
import axios from 'axios';
/* Importamos el hook useParams para poder acceder desde nuestro componente
a los parámetros de la ruta */
import { useParams } from 'react-router-dom';

// Función para mostrar la modal que recibe por props la función de Cerrar Modal
function Modal({ cierraModal }) {

  // En una constante almacenamos el valor id del post, recuperado de la URL
  const {id} = useParams();
  // Función que borra el post con esa id
  function handleDelete () {
    axios.delete( 'http://localhost:3000/postsById?id=' + id )
    .then( response => {
      if (response.data.status === 'failed' ) {
        // Si la petición falla mostramos mensaje de error
        setPost({ error: 'Error: No se ha podio eliminar el post' });
      } else {
          // En caso contrario es que el borrado se ha realizado con éxito
          // Entonces navegamos de nuevo hasta la página de inicio
          window.location.href = 'http://localhost:5173/inicio';
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