// src/components/TablaEmbarcaciones.tsx
import React from 'react';
import axios from 'axios';
import { Embarcacion } from '../Embarcacion';

interface TablaEmbarcacionesProps {
  embarcaciones: Embarcacion[];
  onEdit: (embarcacion: Embarcacion) => void;
  onDelete: (id: number) => void;
}

const TablaEmbarcaciones: React.FC<TablaEmbarcacionesProps> = ({ embarcaciones, onEdit, onDelete }) => {
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8019/api/embarcaciones/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Capacidad</th>
          <th>Descripción</th>
          <th>Fecha Programada</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {embarcaciones.map((embarcacion) => (
          <tr key={embarcacion.id}>
            <td>{embarcacion.nombre}</td>
            <td>{embarcacion.capacidad}</td>
            <td>{embarcacion.descripcion}</td>
            <td>{embarcacion.fechaProgramada}</td>
            <td>
              <button onClick={() => onEdit(embarcacion)} className="edit-button">Editar</button>
              <button onClick={() => handleDelete(embarcacion.id)} className="delete-button">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablaEmbarcaciones;