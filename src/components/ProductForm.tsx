import React, { useState } from 'react';
import axios from 'axios';
import { Bounce, toast } from 'react-toastify';

const apiUrl = process.env.REACT_APP_API_URL;


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

    axios.post(apiUrl +'/api/products', newProduct)
      .then(response => {
        console.log("Producto creado", response.data);
        toast.success('💪💪💪 Vamoooooo!!! 💪💪💪 Creaste el producto con éxito!!! 😊', {
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

        // Resetea los valores del formulario
        setName('');
        setPrice('');
        setDescription('');
      })
      .catch(error => {
        console.error("Error al crear el producto", error);
        toast.error('Error al crear el producto. 😞', {
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
      });
  };

  return (
    <div className="container mx-auto my-5">
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
