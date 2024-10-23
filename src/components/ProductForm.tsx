import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      name,
      price: parseFloat(price),
      description,      
    };

    axios.post('http://localhost:5000/api/products', newProduct)
      .then(response => {
        console.log("Producto creado", response.data);
      })
      .catch(error => {
        console.error("Error al crear el producto", error);
      });
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Crear Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Título del Producto</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Precio</label>
          <input
            type="text"
            className="w-full border rounded-lg p-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Descripción</label>
          <textarea
            className="w-full border rounded-lg p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Crear</button>
      </form>
    </div>
  );
};

export default ProductForm;
