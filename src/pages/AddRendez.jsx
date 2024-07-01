import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import ToastService from "../ToastService";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Option } = Select;

const initialFormData = {
  COMMENTAIRES: "",
  NOM: "",
  PRENOM: "",
  MOBILE: "",
  ADRESSE_COMPLETE: "",
  MAIL: "",
  REF_PRODUIT: "",
  SURFACE_HABITABLE: "",
  THERMOSTAT: false,
  TETE_THERMOSTATIQUE: false,
  INSTALLATEUR: "",
  SOURCE: "",
  PRIME: "",
  RETOUR_INSTALLATEUR: "",
  DATE_VISITE: null,
  DATE_PRIS_RDV: null,
  Type_Chauffage: "",
  CIVILITE: "",
  images: [],
};

const AddRendez = () => {

  const navigate = useNavigate();
  const { token } = useAuth();
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "MOBILE") {
      const mobileValue = value.replace(/\D/g, '').slice(0, 9);
      setFormData((prevData) => ({ ...prevData, [name]: mobileValue }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({ ...prevData, [name]: date }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpload = ({ fileList }) => {
    setFormData((prevData) => ({ ...prevData, images: fileList }));
  };

  const handleSubmitForm = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) => formDataToSend.append("images", file.originFileObj));
        } 
        else if(key === "MOBILE"){
          formDataToSend.append(key, "+33" + value);
        }else if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch('http://localhost:4000/rendez-vous/', {
        method: 'POST',
        headers: { token },
        body: formDataToSend,
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      await response.json();
      ToastService.success("Rendez-vous ajouté avec succès");
      navigate("/rendez-vous");
    } catch (error) {
      console.error("Error adding rendez-vous:", error);
      ToastService.error("Erreur lors de l'ajout du rendez-vous");
    }
  };

  const chauffageOptions = [
    { label: "Radiateur Hydraulique", value: "hydraulique" },
    { label: "Radiateur Electrique", value: "electrique" },
    { label: "Radiateur Mixte", value: "mixte" },
  ];

  return (
    
        <Form layout="vertical">
          <Form.Item
            name="Type_Chauffage"
            label="Type de chauffage"
            rules={[{ required: true, message: "Type de chauffage est requis" }]}
          >
            <Select
              placeholder="Type de chauffage"
              displayEmpty
              getPopupContainer={(trigger) => trigger.parentNode}
              onChange={(value) => handleSelectChange("Type_Chauffage", value)}
            >
             
              {chauffageOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <div className="flex mt-4 text-neutral-400">
            <Form.Item
              name="CIVILITE"
              label="Civilité"
              rules={[{ required: true, message: "Civilité est requise" }]}
            >
              <Select
                placeholder="Civilité"
                getPopupContainer={(trigger) => trigger.parentNode}
                onChange={(value) => handleSelectChange("CIVILITE", value)}
              >
                <Option value="mr">Monsieur</Option>
                <Option value="mrs">Madame</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="NOM"
              label="Nom"
              placeholder="john"
              rules={[{ required: true, message: "Nom est requis" }]}
            >
              <Input name="NOM" onChange={handleChange} />
            </Form.Item>

            <Form.Item
              name="PRENOM"
              label="Prénom"
              placeholder="Alex"
              rules={[{ required: true, message: "Prénom est requis" }]}
            >
              <Input name="PRENOM" onChange={handleChange} />
            </Form.Item>
            
          </div>

          <div className="flex mt-4 text-neutral-400">
            <Form.Item
              name="MAIL"
              label="Email"
              rules={[
                { type: "email", message: "Email invalide" },
                { required: true, message: "Email est requis" },
              ]}
            >
              <Input name="MAIL" onChange={handleChange} />
            </Form.Item>
            <Form.Item
              name="MOBILE"
              label="Téléphone"
              rules={[
                { required: true, message: "Téléphone est requis" },
                { len: 9, message: "Le numéro doit contenir 9 chiffres" }
              ]}
            >
              <Input
                name="MOBILE"
                addonBefore="+33"
                maxLength={9}
                onChange={handleChange}
                value={formData.MOBILE}
                type="tel"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          <div className="flex mt-3 text-neutral-400 justify-between">
            <Form.Item
              name="DATE_VISITE"
              label="Date de visite"
              rules={[{ required: true, message: "Date de visite est requise" }]}
            >
              <DatePicker onChange={(date) => handleDateChange("DATE_VISITE", date)} />
            </Form.Item>
            <Form.Item
              name="DATE_PRIS_RDV"
              label="Date de prise"
              rules={[{ required: true, message: "Date de prise rendez-vous est requise" }]}
            >
              <DatePicker onChange={(date) => handleDateChange("DATE_PRIS_RDV", date)} />
            </Form.Item>
          </div>

          <div className="text-neutral-400 border-b-2 my-4 text-center">
            <h3>Adresse de Livraison</h3>
          </div>

          <Form.Item
            name="ADRESSE_COMPLETE"
            label="Adresse complète"
            rules={[{ required: true, message: "Adresse complète est requise" }]}
          >
            <Input name="ADRESSE_COMPLETE" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="SURFACE_HABITABLE"
            label="Surface habitable (m²)"
            rules={[{ required: true, message: "Surface habitable est requise" }]}
          >
            <Input name="SURFACE_HABITABLE" onChange={handleChange} type="number" />
          </Form.Item>

          <Form.Item
            name="REF_PRODUIT"
            label="Référence produit"
            rules={[{ required: true, message: "Référence produit est requise" }]}
          >
            <Input name="REF_PRODUIT" onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="COMMENTAIRES"
            label="Commentaires"
            rules={[{ required: true, message: "Commentaires sont requis" }]}
          >
            <Input.TextArea name="COMMENTAIRES" onChange={handleChange} rows={4} />
          </Form.Item>

          <Form.Item>
            <Upload.Dragger
              name="images"
              multiple
              beforeUpload={() => false}
              onChange={handleUpload}
              accept="image/*"
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Cliquez ou faites glisser des images dans cette zone pour les télécharger
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={handleSubmitForm}>
              Ajouter le rendez-vous
            </Button>
          </Form.Item>
        </Form>
  );
};

export default AddRendez;