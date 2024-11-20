import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./loader.css"


interface ProductListProps {
  searchQuery: string; // Aceptamos searchQuery como prop
}

const apiUrl = process.env.REACT_APP_API_URL;

const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // Por ejemplo, 10 productos por página


  useEffect(() => {
    const fetchData = () => {
      axios.get(apiUrl + '/api/products')
        .then(response => {
          setProducts(response.data);
          setFilteredProducts(response.data);
          // console.log(response.data);
          // Detener el polling cuando la respuesta es exitosa
          clearInterval(intervalId);
          setIsLoading(false);
          console.log('El polling cuando')
        })
        .catch(error => {
          console.error("Error al cargar productos", error);
          setIsLoading(false);
          // No se limpia el intervalo aquí para que siga intentando
        });
    };

    // Hacer la primera llamada inmediatamente
    fetchData();

    // Configurar el polling
    const intervalId = setInterval(fetchData, 50000); // Intenta cada 5 segundos

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchQuery, products]);


  // console.log(products)

  return (
    <div className="container mx-auto pb-32 pt-24">
      {isLoading ? (
        <div className="flex flex-col justify-between  bg-slate-500 py-7">
          <h1 className="text-center font-medium mt-4">Estamos lavando las telas!!!</h1>
          <div className="flex justify-center mt-5">
            <div className="loader"></div>
          </div>
          <h1 className="text-center font-medium mt-4">Aguarde unos instantes</h1>
        </div>
      ) : (
        <table className="min-w-full table-fixed">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Producto</th>
              <th className="py-2 px-4 border-b text-center">Precio</th>
              <th className="py-2 px-4 border-b text-center">Stock</th>
              <th className="py-2 px-4 border-b text-center">Modificar</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{product.name}</td>
                <td className="py-2 px-4 border-b text-center">${product.price}</td>
                <td className="py-2 px-4 border-b text-center">
                  <p className="text-teal-800">
                    {product.description}
                  </p>
                </td>
                <td className="py-2 px-4 border-b text-center">
                  <a href={`/producto/${product.id}/edit`} className="text-blue-500 hover:underline">
                    Modificar
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductList;
