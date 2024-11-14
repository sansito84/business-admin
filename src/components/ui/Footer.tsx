import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center fixed bottom-0 left-0 w-full">
            <p>🧺 2024 Reta-Sitos. Todos los derechos reservados.</p>
            <p>Desarrollado por <a href="https://github.com/sansito84" target="_blank" rel="noreferrer" className="hover:text-blue-500">SantiagoSito</a></p>
            <Link to="/delete" className="hover:text-gray-300 text-lg text-red-500 left-0">Borrar productos</Link>
        </footer>
    );
}

export default Footer;