
// RUTAS

// Importamos todas las páginas
// Importamos los componentes Header y Footer para mostrarlos en cada página
// Importamos nuestro archivo de estilos
// Importamos el proveedor y el creador de rutas de react-router-dom
import React from 'react';
import "./css/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Registro from './pages/Registro';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import CrearPost from './pages/CrearPost';
import Logout from './pages/Logout';
import PostDetalles from './pages/PostDetalles';
import Aventuras from './pages/Aventuras';
import Novelas from './pages/Novelas';
import CienciaFiccion from './pages/CienciaFiccion';
import Salud from './pages/Salud';
import Autoayuda from './pages/Autoayuda';
import Empresa from './pages/Empresa';
 
function Rutas() {
    /* Creamos la constante router que almacena
    todas la rutas de nuestra aplicación.
    Cada ruta indica la dirección a la que apunta
    y los componentes que debe mostrar */
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
            /*Muestra error 404 si la ruta no existe */
            errorElement:<h1>Error 404: Página no encontrada</h1>,
        },
        {
            path: "/registro",
            element: <Registro />,
        },
        {
            path: "/inicio",
            element: 
                <>
                    <Header />
                    {/* Medida de seguridad para que solo un usuario logueado
                    pueda acceder a las URL´s internas */}
                    {localStorage.getItem('usuario') === null ? <Login /> : <Home />}
                    <Footer />
                </>,
        },
        {
            path: "/logout",
            element:
                <>
                    
                    {localStorage.getItem('usuario') === null ? <Login /> : <Logout />}
                    
                </>
        },
        {
            path: "inicio/:id",
            element:
                <>
                    <Header />
                    {localStorage.getItem('usuario') === null ? <Login /> : <PostDetalles />}
                    <Footer />
                </>
        },
        {
            path: "/crearPost",
            element:
                <>
                    <Header />
                    {localStorage.getItem('usuario') === null ? <Login /> : <CrearPost />}
                    <Footer />
                </>,
        },
        {
            path: "/aventuras",
            element:
                <>
                    <Header />
                    {localStorage.getItem('usuario') === null ? <Login /> : <Aventuras />}
                    <Footer />
                </>
        },
        {
            path: "/novelas",
            element:
                <>
                     <Header />
                     {localStorage.getItem('usuario') === null ? <Login /> : <Novelas />}
                     <Footer />
                </>
        },
        {
            path: "/cienciaFiccion",
            element:
                <>
                     <Header />
                     {localStorage.getItem('usuario') === null ? <Login /> : <CienciaFiccion />}
                     <Footer />
                </>
        },
        {
            path: "/salud",
            element:
                <>
                     <Header />
                     {localStorage.getItem('usuario') === null ? <Login /> : <Salud />}
                     <Footer />
                </>
        },
        {
            path: "/autoayuda",
            element:
                <>
                     <Header />
                     {localStorage.getItem('usuario') === null ? <Login /> : <Autoayuda />}
                     <Footer />
                </>
        },
        {
            path: "/empresa",
            element:
                <>
                     <Header />
                     {localStorage.getItem('usuario') === null ? <Login /> : <Empresa />}
                     <Footer />
                </>
        },
    ]);
    /* La función retorna al proveedor de rutas
    con la constante donde hemos almacenado nuestras rutas */
  return (
    <>
        <RouterProvider router={router}/>
    </> 
  )
}

export default Rutas;
