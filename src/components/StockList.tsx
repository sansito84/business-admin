import React, { useState, useEffect } from 'react';

interface StockItem {
  proveedor: string;
  articulo: string;
  variedadesFaltantes: string[];
}

const StockList: React.FC = () => {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    { proveedor: 'Proveedor Z', articulo: 'Artículo A', variedadesFaltantes: ['Variedad 1'] },
    { proveedor: 'Proveedor A', articulo: 'Artículo B', variedadesFaltantes: ['Variedad 2', 'Variedad 3'] },
    { proveedor: 'Proveedor M', articulo: 'Artículo C', variedadesFaltantes: ['Variedad 4'] },
  ]);

  const [newVariety, setNewVariety] = useState(''); // Para manejar la nueva variedad a agregar
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null); // Saber a qué artículo se está agregando

  useEffect(() => {
    // Ordenar por proveedor en cada renderización
    const sortedItems = [...stockItems].sort((a, b) => a.proveedor.localeCompare(b.proveedor));
    setStockItems(sortedItems);
  }, [stockItems]);

  // Función para agregar una variedad faltante
  const handleAddVariety = (index: number) => {
    if (newVariety.trim() === '') return; // No agregar variedades vacías
    const updatedStockItems = [...stockItems];
    updatedStockItems[index].variedadesFaltantes.push(newVariety);
    setStockItems(updatedStockItems);
    setNewVariety(''); // Limpiar el input
  };

  // Función para eliminar una variedad faltante
  const handleDeleteVariety = (itemIndex: number, varietyIndex: number) => {
    const updatedStockItems = [...stockItems];
    updatedStockItems[itemIndex].variedadesFaltantes.splice(varietyIndex, 1); // Eliminar la variedad
    setStockItems(updatedStockItems); // Actualizar el estado
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
          {stockItems.map((item, itemIndex) => (
            <tr key={itemIndex}>
              <td className="py-2 px-4 border-b">{item.proveedor}</td>
              <td className="py-2 px-4 border-b">{item.articulo}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {item.variedadesFaltantes.map((variety, varietyIndex) => (
                    <li key={varietyIndex} className="flex justify-between items-center">
                      <span>{variety}</span>
                      <button
                        className="ml-2 text-red-500 hover:underline"
                        onClick={() => handleDeleteVariety(itemIndex, varietyIndex)}
                      >
                        Eliminar
                      </button>
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">
                {selectedItemIndex === itemIndex ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newVariety}
                      onChange={(e) => setNewVariety(e.target.value)}
                      placeholder="Nueva variedad"
                      className="border p-2"
                    />
                    <button
                      onClick={() => handleAddVariety(itemIndex)}
                      className="bg-blue-500 text-white px-4 py-2"
                    >
                      Agregar
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setSelectedItemIndex(itemIndex)}
                    className="bg-green-500 text-white px-4 py-2"
                  >
                    Añadir Variedad
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockList;
