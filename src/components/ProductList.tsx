import React, { useState, useEffect } from 'react';
import axios from 'axios';


interface ProductListProps {
  searchQuery: string; // Aceptamos searchQuery como prop
}

const ProductList: React.FC<ProductListProps> = ({ searchQuery }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  // Por ejemplo, 10 productos por página


  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {

        setProducts(response.data);
        console.log(response.data);
        setFilteredProducts(response.data);
        // Inicialmente todos los productos
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


  console.log(products)

  return (
    <div className="container mx-auto my-5">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Producto</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Stock</th>
            <th className="py-2 px-4 border-b"></th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.id}>
              <td className="py-2 px-4 border-b">{product.name}</td>
              <td className="py-2 px-4 border-b">${product.price}</td>
              <td className="py-2 px-4 border-b">
                <p className="text-teal-800">
                  {product.description}
                </p>
              </td>
              <td className="py-2 px-4 border-b">
                <a href={`/producto/${product.id}/edit`} className="text-blue-500 hover:underline">
                  Modificar
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
