import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useSelector } from "react-redux";

const AddRendez = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const { user, token, loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    status: "invalid",
    COMMENTAIRE: "",
    NOM: "",
    PRENOM: "",
    TELEPHONE: "",
    ADRESSE: "",
    MAIL: "",
    SURFACE_HABITABLE: "",
    REVENUE_FISCAL: "",
    TRAVAUX_A_PREVOIR: "",
    PRECARITE: "",
    NOMBRE_HABITANTS_DECLARE_FISCALEMENT: "",
    AVIS_FISCAL: "",
    REF_FISCAL: "",
    MODE_DE_CHAUFFAGE: "",
    TYPE_DE_CHAUDIERE: "",
    ANNEE_CHAUDIERE: "",
    ANNEE_CONSTRUCTION: "",
    PROPRIETAIRE_DEPUIS: "",
    ISO_A_1e: "",
    OK_POUR_ENLEVER_ANCIENNE_ISO: false,
    SUPERFICIE_COMBLES: "",
    ACCES_COMBLES: "",
    DPE_EFFECTUER: false,
    CODE_SECURITE_TRANSMETTRE_CLIENT: "",
    TYPE_VITRAGE: "",
    SOUS_SOL: false,
    VIDE_SANITAIRE: false,
    CAVE: false,
    MITOYEN: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);

    fetch(`http://localhost:3001/rendez-vous/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token":token
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    navigate("/");
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="container mt-4 shadow-lg p-5 " style={{paddingRight:"20px"}}>
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
              <label className="block text-sm font-medium">Prenom:</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="PRENOM"
                value={formData.PRENOM}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Email:</label>
            <input
              type="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="MAIL"
              value={formData.MAIL}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Adresse:</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="ADRESSE"
              value={formData.ADRESSE}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Telephone:</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="TELEPHONE"
                value={formData.TELEPHONE}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status:</label>
              <select
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="status"
                value={formData.status}
                style={{
                  backgroundColor:
                    formData.status === "valid"
                      ? "green"
                      : formData.status === "invalid"
                      ? "red"
                      : "yellow",
                  color: "white",
                }}
                onChange={handleChange}
              >
                <option value="valid" style={{ backgroundColor: "white", color: "black" }} className="bg-white text-dark">
                  Valid
                </option>
                <option value="invalid" style={{ backgroundColor: "white", color: "black" }} className="bg-red text-dark">
                  Invalid
                </option>
                <option value="pending" style={{ backgroundColor: "white", color: "black" }} className="bg-yellow text-dark">
                  Pending
                </option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Commentaire:</label>
            <textarea
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="COMMENTAIRE"
              onChange={handleChange}
              cols="30"
              rows="5"
            ></textarea>
          </div>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h1 className="text-2xl font-semibold">House Details Form</h1>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Surface Habitable:</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="SURFACE_HABITABLE"
                value={formData.SURFACE_HABITABLE}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Revenue Fiscal:</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="REVENUE_FISCAL"
                value={formData.REVENUE_FISCAL}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">Travaux à Prévoir:</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="TRAVAUX_A_PREVOIR"
                value={formData.TRAVAUX_A_PREVOIR}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Précarité:</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="PRECARITE"
                value={formData.PRECARITE}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block text-sm font-medium">
                Nombre Habitants Déclaré Fiscalement:
              </label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="NOMBRE_HABITANTS_DECLARE_FISCALEMENT"
                value={formData.NOMBRE_HABITANTS_DECLARE_FISCALEMENT}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Avis Fiscal:</label>
              <input
                type="number"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                name="AVIS_FISCAL"
                value={formData.AVIS_FISCAL}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium">Ref Fiscal:</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              name="REF_FISCAL"
              value={formData.REF_FISCAL}
              onChange={handleChange}
            />
          </div>
        </>
      )}

      {currentStep === 3 && (
        <>
          <h1 className="text-2xl font-semibold">Additional Details Form</h1>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.OK_POUR_ENLEVER_ANCIENNE_ISO}
                  onChange={handleChange}
                  name="OK_POUR_ENLEVER_ANCIENNE_ISO"
                />
              }
              label="Ok Pour Enlever Ancienne Iso"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.DPE_EFFECTUER}
                  onChange={handleChange}
                  name="DPE_EFFECTUER"
                />
              }
              label="DPE Effectuer"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.SOUS_SOL}
                  onChange={handleChange}
                  name="SOUS_SOL"
                />
              }
              label="Sous Sol"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.VIDE_SANITAIRE}
                  onChange={handleChange}
                  name="VIDE_SANITAIRE"
                />
              }
              label="Vide Sanitaire"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.CAVE}
                  onChange={handleChange}
                  name="CAVE"
                />
              }
              label="Cave"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.MITOYEN}
                  onChange={handleChange}
                  name="MITOYEN"
                />
              }
              label="Mitoyen"
            />
          </FormGroup>
        </>
      )}

      <div className="mt-4 flex justify-between">
        {currentStep > 1 && (
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md shadow-sm"
            onClick={prevStep}
          >
            Previous
          </button>
        )}
        {currentStep < 3 ? (
          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-sm"
            onClick={nextStep}
          >
            Next
          </button>
        ) : (
          <button
            type="submit"
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
