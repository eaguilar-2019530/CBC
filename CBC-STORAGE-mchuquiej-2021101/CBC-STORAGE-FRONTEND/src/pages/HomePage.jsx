import React from 'react';
import '../pages/HomePage1.css';

export const HomePage = () => {
    return (
        <div className="home-page">
            <div className="overlay"></div>
            <div className="content">
                <img className="logo" />
                <h1>BIENVENIDO A "ALMACENADORA CBC"</h1>
                <p className='parrafo'>
                    Nos alegra darte la bienvenida a Almacenadora CBC!! 
                    Esta app está aquí para ayudarte a gestionar tus herramientas de manera más segura y eficiente.
                </p>
            </div>
        </div>
    );
};


