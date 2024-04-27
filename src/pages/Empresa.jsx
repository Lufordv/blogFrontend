
// PAGINA DE CATEGORÍA: EMPRESA

// Importamos el hook useState para modificar los estados
// Importamos el hook useEffect para realizar acciones al montarse el componente
// Importamos Link de react-router-dom para navegar a la página de cada post
// Importamos axios para realizar las peticiones al servidor 
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Empresa() {
  /* Generamos un estado para mostrar los post.
  El estado inicial es un array vacío que rellenaremos
  con los datos que el servidor nos envíe de la base de datos */
  const [ posts, setPosts] = useState([]);
  /* Utilizamos un useEffect con una petición axios para traer los post
  que el servidor habrá recuperado de la base de datos */
  useEffect(() => {
    axios.get( 'https://blogbackend1-0nyy.onrender.com/categoria' )
    .then( response => { console.log(response.data)
      /* Una vez recibida la respuesta del servidor seteamos el estado
      para rellenar el array con los datos de los posts */
      setPosts( response.data )
    });
  },[]);
  /* Retorna el listado de posts mapeando el array, lo que a su vez retorna
  cada post con su clave única.
  Con un operador ternario le decimos que si el post
  pertenece a la categoría indicada se muestre en pantalla, si no se descarta */
  return (
    <>
      <div className='inicio'>
        <div className='posts'>
          {posts.map(( post ) => {
            {/* Guardamos en una constante la URL completa de la imagen de cada post */}
            const imageUrl = 'https://blogbackend1-0nyy.onrender.com' + post.imagen;
              return (
                  post.categoria === 'empresa' ? (
                    <div className='post' key = { post.id_post }>
                      <div className='img'>
                        <img src={ imageUrl } alt={ post.titulo } />
                      </div>
                      <div className='contenido'>
                        <h2>{ post.titulo }</h2>
                        <h3>{post.categoria}</h3>
                        <button>
                          <Link to = { '/inicio/' + post.id_post }>Leer post</Link>
                        </button>
                      </div>           
                    </div>
                  ) : (
                      null
                  )
              )}
          )}
        </div>
      </div>
    </>
  )
}

export default Empresa;