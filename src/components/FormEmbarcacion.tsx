// src/components/FormEmbarcacion.tsx
import React, { useState, useEffect } from 'react';
import { Embarcacion } from '../Embarcacion';
import axios from 'axios';

interface FormularioEmbarcacionProps {
  embarcacion: Embarcacion | null;
  onSave: (embarcacion: Embarcacion) => void;
}

const FormEmbarcacion: React.FC<FormularioEmbarcacionProps> = ({ embarcacion, onSave }) => {
  const [formData, setFormData] = useState<Embarcacion>({
    id: 0,
    nombre: '',
    capacidad: 0,
    descripcion: '',
    fechaProgramada: ''
  });

  useEffect(() => {
    if (embarcacion) {
      setFormData(embarcacion);
    }
  }, [embarcacion]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await axios.put(`http://localhost:8019/api/embarcaciones/${formData.id}`, formData);
      } else {
        await axios.post('http://localhost:8019/api/embarcaciones', formData);
      }
      onSave(formData);
      setFormData({
        id: 0,
        nombre: '',
        capacidad: 0,
        descripcion: '',
        fechaProgramada: ''
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{formData.id ? 'Editar Embarcación' : 'Agregar Embarcación'}</h2>
      <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} placeholder="Nombre" required />
      <input type="number" name="capacidad" value={formData.capacidad} onChange={handleChange} placeholder="Capacidad" required />
      <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} placeholder="Descripción" required />
      <input type="date" name="fechaProgramada" value={formData.fechaProgramada} onChange={handleChange} required />
      <button type="submit">{formData.id ? 'Actualizar' : 'Guardar'}</button>
    </form>
  );
};

export default FormEmbarcacion;