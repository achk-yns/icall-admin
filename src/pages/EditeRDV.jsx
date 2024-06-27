import React, { useEffect, useState } from 'react';
import SectionOne from './AddRDV/SectionOne';
import SectionTwo from './AddRDV/SectionTwo';
import SectionThree from './AddRDV/SectionThree';
import { useNavigate, useParams } from 'react-router-dom';
import { useRendezVous } from '../contexts/RendezVousContext';
import FetchRend from '../Fetching/FetchRend';
import { Button, Container, Typography } from '@mui/material';
import { useAuth } from '../contexts/authContext';
import ToastService from '../ToastService';
import { ToastContainer } from 'react-toastify';

export default function EditeRDV() {
  const { id } = useParams();
  const { token } = useAuth();
  const { updateRendezVous } = useRendezVous();
  const navigate = useNavigate()
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

  useEffect(() => {
    const FetchOne = async () => {
      try {
        const data = await FetchRend.getONERendezVous(id, token);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching rendezvous:', error);
        ToastService.error('Erreur lors de la récupération du rendez-vous');
      }
    };
    FetchOne();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'MOBILE') {
      const cleanedValue = value.replace(/\D/g, ''); // Supprime tous les caractères non numériques
      if (cleanedValue.length <= 9) {
        setFormData({
          ...formData,
          [name]: cleanedValue.startsWith('+33') ? cleanedValue : '+33' + cleanedValue,
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
    try {
      e.preventDefault()
      const data = await updateRendezVous(id, formData);
      if(data===true){
        navigate("/")
      }
    } catch (error) {
      return false
    }
  };

  return (
    <Container className="p-4">
      <ToastContainer />
      <Typography variant="h4" className="mb-4">Modifier un Rendez-vous</Typography>
      <form onSubmit={handleSubmit}>
        <SectionOne formState={formData} handleChange={handleChange} />
        <SectionTwo formState={formData} handleChange={handleChange} />
        <SectionThree formState={formData} handleChange={handleChange} />
        <Button type="submit" variant="contained" color="primary" className="mt-4">Modifier</Button>
      </form>
    </Container>
  );
}
