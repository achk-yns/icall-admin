import React, { useEffect, useState } from 'react'
import SectionOne from './AddRDV/SectionOne'
import SectionTwo from './AddRDV/SectionThree'
import SectionThree from './AddRDV/SectionTwo'
import { useNavigate, useParams } from 'react-router-dom';
import { useRendezVous } from '../contexts/RendezVousContext';
import FetchRend from '../Fetching/FetchRend';
import { Button, Container, Typography } from '@mui/material';
export default function EditeRDV() {
  const { NOM } = useParams();
  const navigate = useNavigate();
  const {updateRendezVous} = useRendezVous()
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
  
  useEffect(()=>{
    const FetchOne =async()=>{
      const data = FetchRend.getONERendezVous(NOM)
      setFormData(data)
    };
    FetchOne();
  },[])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit =async (e)=>{
    e.preventDefault()
    const data = await updateRendezVous(NOM,formData);
    navigate("/")
  }
  return (
    <Container className="p-4">
    <Typography variant="h4" className="mb-4">Modifer Un Rendez-vous</Typography>
    <form onSubmit={handleSubmit}>
      <SectionOne formState={formData} handleChange={handleChange} />
      <SectionTwo formState={formData} handleChange={handleChange} />
      <SectionThree formState={formData} handleChange={handleChange} />
      <Button type="submit" variant="contained" color="primary" className="mt-4">Modifier</Button>
    </form>
  </Container>
  )
}
