
// PÁGINA DE DETALLES DEL POST

// Importamos el hook useState para modificar los estados
// Importamos el hook useEffect para realizar acciones tras montarse el componente
// Importamos Link de react-router-dom para navegar a la página de cada post
// Importamos el hook useParams para acceder a los parámetros de la URL
// Importamos axios para realizar las peticiones al servidor 
// importamos las imágenes de los iconos de editar y eliminar
// Importamos la ventana modal de eliminar post
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Editar from '../img/icono_editar.jpg';
import Eliminar from '../img/icono_eliminar.jpg';
import Modal from '../components/Modal';

function PostDetalles() {
    // Definimos tres estados:
    // Uno para mostrar el post, otro para mostrar el autor y otro para la ventana modal
    const [post, setPost] = useState({});
    const [autorNombre, setAutorNombre] = useState('');
    const [modalAbierto, setModalAbierto] = useState(false);
    
    // En una variable guardamos el id recuperado de los parámetros de la URL
    const { id } = useParams();

    useEffect(() => {
        // Petición para recibir el contenido del post
        axios.get(`https://blogbackend1-0nyy.onrender.com/postsById?id=${id}`)
            .then(response => {
                const postData = response.data;
                setPost(postData);
                /* Después de recibir los detalles del post,
                realizamos una nueva petición axios para obtener el nombre del autor */
                axios.get(`https://blogbackend1-0nyy.onrender.com/usuariosById?id=${postData.autor}`)
                    .then(response => {
                        // Seteamos el estado con el nombre que hemos recibido
                        setAutorNombre(response.data.nombre);
                    })
                    .catch(error => {
                        console.error('Error al obtener el nombre del autor: ' + error);
                    });
            })
            .catch(error => {
                console.error('Error al obtener los detalles del post: ' + error);
            });
        // El efecto se ejecuta cada vez que el id cambia
    }, [id]);

    // Función que cambia el estado de la modal para abrirla o cerrarla
    const toggleModal = () => {
        setModalAbierto(!modalAbierto);
    }
    // Retorna el contenido completo del post
    return (
        <div className='postUnico'>
            {modalAbierto && <Modal cierraModal={toggleModal} />}
            <div className='contenidoPost'>
                {/*Renderiza la imagen del post si existe */}
                {post.imagen && <img src={`https://blogbackend1-0nyy.onrender.com${post.imagen}`} alt={post.titulo} />}
                <div className='autor'>
                    <div className='info'>
                        {/* Muestra el nombre del autor */}
                        <span>Autor: {autorNombre}</span>
                    </div>
                    {/* Muestra los iconos de edición y eliminación del post cuando corresponde */}
                    {post.autor === JSON.parse(localStorage.getItem('usuario')).idUsuario ? (
                        <div className='editar'>
                            <Link to={`/crearPost?editar=${id}`} state={post}>
                                <img src={Editar} alt='Editar' />
                            </Link>
                            <img onClick={toggleModal} src={Eliminar} alt='Eliminar' />
                        </div>
                    ) : null}
                </div>
                <h2>{post.titulo}</h2>
                <h3>Categoría: {post.categoria}</h3>
                <p><span>Descripción:</span> {post.descripcion} </p>
            </div>
        </div>
    );
}

export default PostDetalles;

