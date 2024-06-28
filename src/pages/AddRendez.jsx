import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Typography } from '@mui/material';
import SectionOne from './AddRDV/SectionOne';
import SectionTwo from './AddRDV/SectionTwo';
import SectionThree from './AddRDV/SectionThree';
import { useRendezVous } from '../contexts/RendezVousContext';
import ToastService from '../ToastService';

const AddRendez = () => {
  const navigate = useNavigate();
  const {addRendezVous} = useRendezVous()
  
  const [formData, setFormData] = useState({
    status: 'injecte',
    COMMENTAIRES: '',
    NOM: '',
    PRENOM: '',
    MOBILE: '',
    ADRESSE_COMPLETE: '',
    MAIL: '',
    REF_PRODUIT: '',
    SURFACE_HABITABLE: '',
    THERMOSTAT: false,
    TETE_THERMOSTATIQUE: false,
    INSTALLATEUR: '',
    SOURCE: '',
    PRIME: '',
    RETOUR_INSTALLATEUR: '',
    DATE_VISITE: null,
    DATE_PRIS_RDV: null,
    createdRv: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'MOBILE') {
      const cleanedValue = value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
      if (cleanedValue.length <= 9) {
        setFormData({
          ...formData,
          [name]: cleanedValue,
        });
      }
    } else {
      setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    }
  };

  const handleSubmit = async (e) => {
      await addRendezVous(formData);
    
  };


  return (
    
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Ajouter Un Rendez-vous</Typography>
      <form onSubmit={handleSubmit} className='mt-5'>
        <SectionOne formState={formData} handleChange={handleChange} />
        <SectionTwo formState={formData} handleChange={handleChange} />
        <SectionThree formState={formData} handleChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" className="mt-4">Ajouter</Button>
      </form>
    </Container>
  );
};

export default AddRendez;
