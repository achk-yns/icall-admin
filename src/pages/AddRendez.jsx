import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../contexts/authContext';

const AddRendez = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { token } = useAuth();

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
    DATE: null
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date, name) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      if (token) {
        fetch(`${process.env.REACT_APP_API_URL}rendez-vous/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token: token
          },
          body: JSON.stringify(formData)
        })
          .then((response) => response.json())
          .then((data) => {
            navigate('/');
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }
    } catch (error) {
      console.error('Error: Server Error');
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container mt-4 shadow-lg p-5" style={{ paddingRight: '20px' }}>
      {currentStep === 1 && (
        <>
          <h1 className="text-2xl font-semibold">Personal Information</h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="NOM">Nom:</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="NOM"
                id="NOM"
                value={formData.NOM}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="PRENOM">Prenom:</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="PRENOM"
                id="PRENOM"
                value={formData.PRENOM}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="MAIL">Email:</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="MAIL"
              id="MAIL"
              value={formData.MAIL}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="ADRESSE_COMPLETE">Adresse:</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="ADRESSE_COMPLETE"
              id="ADRESSE_COMPLETE"
              value={formData.ADRESSE_COMPLETE}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="MOBILE">Mobile:</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="MOBILE"
                id="MOBILE"
                value={formData.MOBILE}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="STATUT">Status:</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="STATUT"
                id="STATUT"
                value={formData.STATUT}
                onChange={handleChange}
                style={{
                  backgroundColor:
                    formData.STATUT === "injecte" ? "green" :
                      formData.STATUT === "annule" ? "red" : "yellow",
                  color: "black"
                }}
              >
                <option value="passage">Passage</option>
                <option value="annule">Annule</option>
                <option value="installe">Installe</option>
                <option value="attente">Attente</option>
                <option value="confirme">Confirme</option>
                <option value="injecte">Injecte</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="COMMENTAIRES">Commentaire:</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="COMMENTAIRES"
              id="COMMENTAIRES"
              onChange={handleChange}
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h1 className="text-2xl font-semibold">House Details</h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium" htmlFor="SURFACE_HABITABLE">Surface Habitable:</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="SURFACE_HABITABLE"
                id="SURFACE_HABITABLE"
                value={formData.SURFACE_HABITABLE}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium" htmlFor="THERMOSTAT">Thermostat:</label>
              <input
                type="checkbox"
                className="mt-1 block"
                name="THERMOSTAT"
                id="THERMOSTAT"
                checked={formData.THERMOSTAT}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="REF_PRODUIT">Ref Produit:</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="REF_PRODUIT"
              id="REF_PRODUIT"
              value={formData.REF_PRODUIT}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="DATE_VISITE">Date de VISITE:</label>
            <DatePicker
              selected={formData.DATE_VISITE}
              onChange={(date) => handleDateChange(date, 'DATE_VISITE')}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              id="DATE_VISITE"
              name="DATE_VISITE"
              required
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="DATE_PRIS_RDV">Date Prise de RDV:</label>
            <DatePicker
              selected={formData.DATE_PRIS_RDV}
              onChange={(date) => handleDateChange(date, 'DATE_PRIS_RDV')}
              dateFormat="dd/MM/yyyy"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              id="DATE_PRIS_RDV"
              name="DATE_PRIS_RDV"
            />
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h1 className="text-2xl font-semibold">Additional Information</h1>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="INSTALLATEUR">Installateur:</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="INSTALLATEUR"
              id="INSTALLATEUR"
              value={formData.INSTALLATEUR}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="SOURCE">Source:</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="SOURCE"
              id="SOURCE"
              value={formData.SOURCE}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="PRIME">Prime:</label>
            <input
              type="number"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="PRIME"
              id="PRIME"
              value={formData.PRIME}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium" htmlFor="RETOUR_INSTALLATEUR">Retour Installateur:</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="RETOUR_INSTALLATEUR"
              id="RETOUR_INSTALLATEUR"
              onChange={handleChange}
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </>
      )}

      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-500 text-white rounded-md shadow-sm"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {currentStep < 3 && (
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
            onClick={nextStep}
          >
            Next
          </button>
        )}
        {currentStep === 3 && (
          <button
            type="button"
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-sm"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default AddRendez;
