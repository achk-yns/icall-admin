import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { Button, Container, Typography } from '@mui/material';
import SectionOne from './AddRDV/SectionOne';
import SectionTwo from './AddRDV/SectionTwo';
import SectionThree from './AddRDV/SectionThree';
import { useRendezVous } from '../contexts/RendezVousContext';

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
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      await addRendezVous(formData)
      navigate('/');
    } catch (error) {
      console.error('Error: Server Error');
    }
  };


  return (
    
    <Container className="p-4">
      <Typography variant="h4" className="mb-4">Ajouter Un Rendez-vous</Typography>
      <form onSubmit={handleSubmit}>
        <SectionOne formState={formData} handleChange={handleChange} />
        <SectionTwo formState={formData} handleChange={handleChange} />
        <SectionThree formState={formData} handleChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" className="mt-4">Ajouter</Button>
      </form>
    </Container>
  );
};

export default AddRendez;
