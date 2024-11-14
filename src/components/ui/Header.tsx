import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Si usas React Router para navegación

interface HeaderProps {
    onSearch: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchTerm(query);
        onSearch(query);  // Emitimos el valor de búsqueda al componente padre
    };

    return (
        <header className="bg-gray-800 text-white p-4 shadow-lg fixed top-0 left-0 w-full">
            <nav className="container mx-auto flex items-center justify-between">
                <div className="text-2xl font-bold">
                    <Link to="/" className="hover:text-gray-300">Reta-Sitos 🔖</Link>
                </div>
                <div className="flex items-center space-x-6">
                    <input
                        type="text"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="border-2 text-gray-800 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                        autoFocus={true}
                    />
                    <Link to="/" className="hover:text-gray-300 text-lg">Home 🏠</Link>                    
                    <Link to="/crear" className="hover:text-gray-300 text-lg">Agregar Producto</Link>
                    {/* <Link to="/stock" className="hover:text-gray-300 text-lg">Stock</Link> */}
                </div>
            </nav>
        </header>
    );
};

export default Header;
