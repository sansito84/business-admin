import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: ''
  });

  useEffect(() => {
    // Obtener datos del producto para precargar el formulario
    axios.get(apiUrl + `/api/products/${id}`)
      .then(response => {
        console.log("Producto cargado", response.data);
        setProduct(response.data[0]);
        // Actualizar el estado del formulario con los datos del producto
        setFormData({
          name: response.data[0].name,
          price: response.data[0].price,
          description: response.data[0].description          
        });
      })
      .catch(error => {
        console.error("Error al cargar el producto", error);
      });
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedFormData = {
      ...formData,
      price: parseFloat(formData.price.toString()), // Convertir precio a número
      provider_id: product.provider_id // Asegúrate de enviar provider_id si no lo capturas en el formulario
    };
  
    axios.put(apiUrl + `/api/products/${id}`, updatedFormData, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      alert('Producto actualizado con éxito');
    })
    .catch(error => {
      console.error("Error al actualizar el producto", error);
    });
  };
  

  if (!product) return <div>Cargando...</div>;

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Modificar Producto</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Título del Producto</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Precio</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"            
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default ProductDetail;
