
// PAGINA DE LOGOUT

// Importamos el hook useNavigate para poder redirigir al usuario entre URLs
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    // Guardamos la función navigate en una constante llamada navegar
    const navegar = useNavigate();
    // Función para abandonar la aplicación
    function salir() {
        // Borramos los datos del usuario de localStorage antes de salir
        localStorage.removeItem('usuario');
        // Después de cerrar sesión llevamos al usuario a la página de login
        window.location.href = '/';
    }
    // Función para dar marcha atrás y permanecer en la aplicación
    function quedarse() {
        // Redirigimos de nuevo al usuario a la home
        navegar('/inicio');
    }
    // Retorna una ventana de confirmación con dos botones que disparan ambas funciones
    return (
        <div className='salir'>
            <div className='confirmar'>
                <span>¿Estás seguro que deseas cerrar sesión?</span>
                <div className='botones'>
                    <button className='si' type='button' onClick={salir}>Si</button>
                    <button className='no' type='button' onClick={quedarse}>No</button>
                </div> 
            </div> 
        </div>
    );
}

export default Logout;