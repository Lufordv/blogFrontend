
// PÁGINA DE HOME

// Importamos el hook useState para modificar los estados
// Importamos el hook useEffect para realizar acciones al montarse el componente
// Importamos Link de react-router-dom para navegar a la página de cada post
// Importamos axios para realizar las peticiones al servidor 
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Inicio() {
  /* Generamos un estado para mostrar los post.
  El estado inicial es un array vacío que rellenaremos
  con los datos que el servidor nos envíe de la base de datos */
  const [ posts, setPosts] = useState([]);
  
  /* Utilizamos un useEffect con una petición axios para traer todos los post que el servidor
  recupere de la base de datos */
  useEffect( () => {
    axios.get( 'https://blogbackend1-0nyy.onrender.com/inicio' )
    .then( response => {
      console.log('Datos recibidos del servidor:', response.data);
      /* Una vez recibida la respuesta del servidor seteamos el estado
      para rellenar el array y poder mostrar los posts */
      setPosts( response.data )
    });
  },[]);
  /* Retorna el listado de posts mapeando el array, lo que a su vez retorna
  cada post con su clave única.
  Visualmente lo que se muestra es una imagen animada del post, el título,
  la categoría a la que pertenece y un botón que nos dirige a su contenido */
  return (
    <>
      <div className='inicio'>
        <div className='posts'>        
          {posts.map(( post ) => {
            {/* Guardamos en una constante la URL completa de la imagen de cada post */}
            const imageUrl = 'https://blogbackend1-0nyy.onrender.com' + post.imagen;
              return (
                <div className='post' key = { post.id_post }>
                  <div className='img scale-up-ver-center'>
                    <img src={ imageUrl } alt={ post.titulo } />
                  </div>
                  <div className='contenido'>
                    <h2>{ post.titulo }</h2>
                    <h3>{post.categoria}</h3>
                    <button>
                    <Link to = { `/inicio/${ post.id_post }` }>Leer post</Link>
                    </button>
                  </div>        
                </div>
              ); 
          })}
        </div>
      </div>
    </>
  )
}



export default Inicio;