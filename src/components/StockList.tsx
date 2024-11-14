import React, { useState, useEffect } from 'react';
import axios from 'axios';
require('dotenv').config()

const apiUrl = process.env.REACT_APP_API_URL;


interface StockItem {
  id: number;                   // Cambiado para coincidir con la estructura del array
  name: string;                 // Cambiado para coincidir con la estructura del array
  variety: string | null;       // Cambiado para incluir 'null'
  provider: string;             // Cambiado para coincidir con la estructura del array
  variedadesFaltantes: string[]; // Cambiado para coincidir con la estructura del array
}

const StockList: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [newVariety, setNewVariety] = useState('');

  // Fetch data al cargar el componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl +'/api/products/all'); // Ruta para obtener todos los productos
        const fetchedItems = response.data.map((item: { id: number; name: string; variety: string | null; provider: string; variedadesFaltantes: string[]; }) => ({
          ...item,
          variedadesFaltantes: item.variedadesFaltantes || [], // Asegúrate de que sea un arreglo
        }));
        console.log('Items a establecer en stockItems:', fetchedItems); // Verifica qué se va a establecer
        setStockItems(fetchedItems);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };
  
    fetchData();
  }, []); // Cambiar aquí a un array vacío
  
  // Función para agregar una variedad
  const handleAddVariety = async (index: number) => {
    if (newVariety.trim() === '') return;

    const selectedItem = stockItems[index];

    try {
      await axios.post(apiUrl + `/api/varieties/${selectedItem.id}`, { // Cambiado a 'id'
        variety: newVariety
      });

      const updatedStockItems = [...stockItems];
      updatedStockItems[index].variedadesFaltantes.push(newVariety);
      setStockItems(updatedStockItems);
      setNewVariety('');
    } catch (error) {
      console.error('Error al agregar la variedad:', error);
    }
  };

  // Función para actualizar el proveedor
  const handleUpdateProvider = async (index: number, newProviderId: string) => { // Cambiado a 'string' para coincidir con el tipo de value del select
    const selectedItem = stockItems[index];

    try {
      await axios.put(apiUrl+`/api/products/${selectedItem.id}`, { // Cambiado a 'id'
        providerId: newProviderId
      });

      const updatedStockItems = [...stockItems];
      updatedStockItems[index].provider = newProviderId; // Cambiado a 'provider'
      setStockItems(updatedStockItems);
    } catch (error) {
      console.error('Error al actualizar el proveedor:', error);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-2xl font-bold mb-4">Gestión de Stock</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Proveedor</th>
            <th className="py-2 px-4 border-b">Artículo</th>
            <th className="py-2 px-4 border-b">Variedades Faltantes</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-2 px-4 text-center text-gray-500">No hay datos disponibles.</td>
            </tr>
          ) : (
            stockItems.map((item, itemIndex) => (
              <tr key={itemIndex} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <select
                    value={item.provider} // Cambiado a 'provider'
                    onChange={(e) => handleUpdateProvider(itemIndex, e.target.value)}
                    className="border rounded p-1"
                  >
                    {/* Asegúrate de llenar este select con los proveedores disponibles */}
                    <option value="">Seleccionar Proveedor</option>
                    <option value="Proveedor A">Proveedor A</option>
                    <option value="Proveedor B">Proveedor B</option>
                    {/* Agrega más opciones según sea necesario */}
                  </select>
                </td>
                <td className="py-2 px-4 border-b">{item.name}</td> {/* Cambiado a 'name' */}
                <td className="py-2 px-4 border-b">
                  {item.variedadesFaltantes.length === 0 ? (
                    <span className="text-gray-500">No hay variedades faltantes.</span>
                  ) : (
                    <ul className="list-disc list-inside">
                      {item.variedadesFaltantes.map((variety, varietyIndex) => (
                        <li key={varietyIndex}>{variety}</li>
                      ))}
                    </ul>
                  )}
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  <input
                    type="text"
                    value={newVariety}
                    onChange={(e) => setNewVariety(e.target.value)}
                    placeholder="Nueva variedad"
                    className="border rounded p-1 flex-grow"
                  />
                  <button
                    onClick={() => handleAddVariety(itemIndex)}
                    className="ml-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Agregar Variedad
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
