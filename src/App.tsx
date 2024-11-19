// src/App.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FormEmbarcacion from './components/FormEmbarcacion';
import TablaEmbarcaciones from './components/TableEmbarcacion';
import { Embarcacion } from './Embarcacion';
import './App.css';

const App: React.FC = () => {
  const [embarcaciones, setEmbarcaciones] = useState<Embarcacion[]>([]);
  const [selectedEmbarcacion, setSelectedEmbarcacion] = useState<Embarcacion | null>(null);

  useEffect(() => {
    const fetchEmbarcaciones = async () => {
      try {
        const response = await axios.get<Embarcacion[]>('http://localhost:8019/api/embarcaciones');
        setEmbarcaciones(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchEmbarcaciones();
  }, []);

  const handleSave = (embarcacion: Embarcacion) => {
    if (embarcacion.id) {
      setEmbarcaciones((prev) =>
        prev.map((item) => (item.id === embarcacion.id ? embarcacion : item))
      );
    } else {
      setEmbarcaciones((prev) => [...prev, embarcacion]);
    }
    setSelectedEmbarcacion(null);
  };

  const handleEdit = (embarcacion: Embarcacion) => {
    setSelectedEmbarcacion(embarcacion);
  };

  const handleDelete = (id: number) => {
    setEmbarcaciones((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>{selectedEmbarcacion ? 'Editar Embarcación' : 'Agregar Embarcación'}</h1>
      <FormEmbarcacion embarcacion={selectedEmbarcacion} onSave={handleSave} />
      <TablaEmbarcaciones embarcaciones={embarcaciones} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default App;