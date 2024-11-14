import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify'


interface ProductListProps {
  searchQuery: string; // Aceptamos searchQuery como prop
}

const apiUrl = process.env.REACT_APP_API_URL;


const ProductListDelete: React.FC<ProductListProps> = ({ searchQuery }) => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

  useEffect(() => {
    axios.get(apiUrl +'/api/products')
      .then(response => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch(error => {
        console.error("Error al cargar productos", error);
      });
  }, []);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);

  const handleDeleteClick = (id: number) => {
    setProductIdToDelete(id);
    setShowModal(true);
  };

  const handleDeleteProduct = () => {
    if (productIdToDelete !== null) {
      axios.delete(apiUrl +`/api/products/${productIdToDelete}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== productIdToDelete));
          // alert('Producto eliminado con éxito');
          toast.success('😊 Listo! Borraste el Producto!!! 😊', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
            });
          setShowModal(false);
          setProductIdToDelete(null);
        })
        .catch(error => {
          console.error("Error al borrar producto", error);
          alert('Error al borrar producto');
        });
    }
  };

  return (
    <div className="container mx-auto pb-32 pt-24 ">
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">¿Estás seguro de que deseas borrar este producto?</h2>
            <div className="flex justify-end">
              <button 
                className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mr-2"
                onClick={handleDeleteProduct}
              >
                Sí, borrar
              </button>
              <button 
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Producto</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b">Borrar</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">${product.price}</td>
              <td className="py-2 px-4 border-b">
                <p className="text-teal-800">{product.description}</p>
              </td>
              <td className="py-2 px-4 border-b">
                <a href={`/producto/${product.id}/edit`} className="text-blue-500 hover:underline">
                  Modificar
                </a>
              </td>
              <td className="py-2 px-4 border-b">
                <button 
                  className='bg-red-600 text-white font-bold py-1 px-2 rounded hover:bg-red-700 transition duration-300' 
                  onClick={() => handleDeleteClick(product.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductListDelete;
