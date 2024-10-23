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
        <header className="bg-gray-800 text-white p-4">
            <nav className="container mx-auto flex justify-between">
                <div className="text-lg font-bold">
                    <Link to="/" className="hover:text-gray-300 text-xl">Reta-Sitos</Link>
                </div>
                <ul className="flex space-x-4">
                    <li>
                        <input
                            type="text"
                            placeholder="Buscar..."
                            value={searchTerm}
                            onChange={handleSearch}
                            className="border-2 text-gray-800 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-500"
                            autoFocus={true}  // Agregamos autofoco al input para que comience con la búsqueda al cargar la página.
                        />
                    </li>
                    <li>
                        <Link to="/" className="hover:text-gray-300">Home</Link>
                    </li>
                    <li>
                        <Link to="/products" className="hover:text-gray-300">Productos</Link>
                    </li>
                    <li>
                        <Link to="/crear" className="hover:text-gray-300">Agregar Producto</Link>
                    </li>
                    <li>
                        <Link to="/stock" className="hover:text-gray-300">Stock</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
