
// PÁGINA DE CREAR/EDITAR POST

// Importamos el hook useState para modificar los estados
// Importamos el hook useEffect para realizar acciones tras montarse el componente
// Importamos axios para realizar las peticiones al servidor
// Importamos el hook useLocation para acceder al estado pasado desde la ubicación anterior
// Importamos el hook useNavigate para hacer redirecciones entre URLs
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function CrearPost() {
  
  //Definimos la constante que nos permite acceder al estado pasado desde la página PostDetalles 
  const location = useLocation();

  /* Creamos la constante navegar que dispara el hook useNavigate
  para redigir al usuario. Lo utilizaremos para llevarlo a la home
  después de crear/editar los posts */
  const navegar = useNavigate();
  
  /* Definimos los estados para mostrar el título, descripción, el archivo de imagen,
  categoría seleccionada, mensaje de éxito/error y la URL de la imagen */
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [file, setFile] = useState(null);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [imagenURL, setImagenURL] = useState('');

  /* UseEffect para verificar si hay un estado pasado (para editar un post).
  En ese caso se establecen los estados correspondientes con esos valores */
  useEffect(() => {
    if (location.state) {
      const { titulo, descripcion, categoria, imagenURL } = location.state;
      setTitulo(titulo);
      setDescripcion(descripcion);
      setCategoriaSeleccionada(categoria);
      setImagenURL(imagenURL);
    }
  }, [location.state]);

  // Función para manejar el cambio en el input de tipo archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setImagenURL(URL.createObjectURL(e.target.files[0]));
  };

  // Función para el envío del formulario
  const handleSubmit = async (e) => {
    // Evita el comportamiento por defecto
    e.preventDefault();
    // Si no hay ninguna categoría seleccionada al enviar muestra un aviso
    try {
      if (categoriaSeleccionada === '') {
        setMensaje('Por favor selecciona una categoría');
        return;
      }
      // Verifica si se ha seleccionado un archivo
      let imageURL = '';
      // Si es así se sube y se obtiene la URL
      if (file) {
        imageURL = await upload();
      }

      // Si estamos editando, enviamos una solicitud PUT
      if (location.state) {
        await axios.put(`https://blogbackend1-0nyy.onrender.com/editarPost/${location.state.id_post}`, {
          id_post: location.state.id_post,
          titulo,
          descripcion,
          file: file ? imageURL : '', 
          categoria: categoriaSeleccionada,
          autor: JSON.parse(localStorage.getItem('usuario')).idUsuario
        });
        // Muestra mensaje informativo al editar el post
        setMensaje('Post actualizado correctamente');
        // Redirige al usuario a la home después de 1.5 segundos
        setTimeout(() => {
          navegar('/inicio');
        }, 1500); 
      } else {
        // En caso contrario, estamos creando no editando, por lo que enviamos una solicitud POST
        await axios.post('https://blogbackend1-0nyy.onrender.com/crearPost', {
          titulo,
          descripcion,
          file: file ? imageURL : '',
          categoria: categoriaSeleccionada,
          autor: JSON.parse(localStorage.getItem('usuario')).idUsuario
        });
        // Muestra mensaje informativo al crear el post
        setMensaje('Post creado correctamente');
        // Redirige al usuario a la home después de 1.5 segundos
        setTimeout(() => {
          navegar('/inicio');
        }, 1500); 
      }
    } catch (error) {
      console.error('Error al guardar el post:', error);
    }
  };

  // Función para subir la imagen cargada al servidor
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://blogbackend1-0nyy.onrender.com/upload', formData, {
        // En los headers de la petición indicamos el tipo de archivo que debe leer
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Imagen cargada:', response.data.file);
      // Devuelve la URL de la imagen
      return response.data.file;
      // Captura el error que pueda ocurrir durante la subida de la imagen
    } catch (error) {
      console.error('Error al cargar la imagen:', error);
      throw error;
    }
  };
  // Retorna los formularios de creación / edición de posts
  return (
    <div className='datos'>
      {mensaje && <span className='success'>{mensaje}</span>}
      <div className='titulo'>
        <label>Título</label>
        <input type='text' value={titulo} onChange={(e) => setTitulo(e.target.value)} />
        <label>Descripción</label>
        <textarea value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></textarea>
        {/* Muestra la imagen seleccionada, esconde el input file y agrega un botón de eliminar */}
        {imagenURL && (
          <div className='imagenPost'>
            <img src={imagenURL} alt='Imagen seleccionada' />
            <button onClick={() => setImagenURL('')}>Eliminar imagen</button>
          </div>
        )}
        {/* Muestrra el input de tipo archivo cuando no hay una imagen seleccionada */}
        {!imagenURL && (
          <div className='subidaImagen'>
            <label className='file' htmlFor='file'>Subir imagen</label>
            <input type='file' name='file' id='file' onChange={handleFileChange} />
          </div>
        )}
        <button onClick={handleSubmit}>Publicar</button>
      </div>
      <div className='item'> 
        <h3>Categoría</h3>
        <div className='cat'>
          <input type='radio' name='categoria' value='aventuras' id='ave' onChange=
          {() => setCategoriaSeleccionada('aventuras')} checked={categoriaSeleccionada === 'aventuras'} />
          <label htmlFor='aventuras'>Aventuras</label>
        </div>
        <div className='cat'>
          <input type='radio' name='categoria' value='novelas' id='nov' onChange=
          {() => setCategoriaSeleccionada('novelas')} checked={categoriaSeleccionada === 'novelas'} />
          <label htmlFor='novelas'>Novelas</label>
        </div>
        <div className='cat'>
          <input type='radio' name='categoria' value='ciencia ficcion' id='fic' onChange=
          {() => setCategoriaSeleccionada('ciencia ficcion')} checked={categoriaSeleccionada === 'ciencia ficcion' } />
          <label htmlFor='ciencia ficcion'>Ciencia Ficción</label>
        </div>
        <div className='cat'>
          <input type='radio'  name='categoria' value='salud' id='sal' onChange=
          {() => setCategoriaSeleccionada('salud')} checked={categoriaSeleccionada === 'salud' } />
          <label htmlFor='salud'>Salud</label>
        </div>
        <div className='cat'>
          <input type='radio' name='categoria' value='autoayuda' id='aut' onChange=
          {() => setCategoriaSeleccionada('autoayuda')} checked={categoriaSeleccionada === 'autoayuda' } />
          <label htmlFor='autoayuda'>Autoayuda</label>
        </div>
        <div className='cat'>
          <input type='radio'  name='categoria' value='empresa' id='emp' onChange=
          {() => setCategoriaSeleccionada('empresa')} checked={categoriaSeleccionada === 'empresa' } />
          <label htmlFor='empresa'>Empresa</label>
        </div>
      </div>
    </div>
  );
}

export default CrearPost;
