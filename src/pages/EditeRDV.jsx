import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/authContext";
import ToastService from "../ToastService";
import { Button, DatePicker, Form, Input, Select, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Option } = Select;

const EditRendez = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();
  const [formData, setFormData] = useState(null); // Initialize with null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRendezVous = async () => {
      try {
        const response = await fetch(`http://localhost:4000/rendez-vous/${id}`, {
          headers: { token },
        });
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rendez-vous:", error);
        ToastService.error("Erreur lors du chargement du rendez-vous");
      }
    };

    fetchRendezVous();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (name, date) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: date,
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpload = ({ fileList }) => {
    setFormData((prevData) => ({
      ...prevData,
      images: fileList,
    }));
  };

  const handleSubmitForm = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "images") {
          value.forEach((file) =>
            formDataToSend.append("images", file.originFileObj)
          );
        } else if (key === "MOBILE") {
          formDataToSend.append(key, "+33" + value);
        } else if (value !== null) {
          formDataToSend.append(key, value);
        }
      });

      const response = await fetch(`http://localhost:4000/rendez-vous/${id}`, {
        method: "PUT",
        headers: { token },
        body: formDataToSend,
      });

      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);

      await response.json();
      ToastService.success("Rendez-vous mis à jour avec succès");
      navigate("/rendez-vous");
    } catch (error) {
      console.error("Error updating rendez-vous:", error);
      ToastService.error("Erreur lors de la mise à jour du rendez-vous");
    }
  };

  const chauffageOptions = [
    { label: "Radiateur Hydraulique", value: "hydraulique" },
    { label: "Radiateur Electrique", value: "electrique" },
    { label: "Radiateur Mixte", value: "mixte" },
  ];

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      layout="vertical"
      initialValues={formData} // Set initial values from fetched data
      onFinish={handleSubmitForm}
    >
      <Form.Item
        name="Type_Chauffage"
        label="Type de chauffage"
       
      >
        <Select
          placeholder="Type de chauffage"
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
          
        >
          <Select
            placeholder="Civilité"
            onChange={(value) => handleSelectChange("CIVILITE", value)}
          >
            <Option value="mr">Monsieur</Option>
            <Option value="mrs">Madame</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="NOM"
          label="Nom"
          
        >
          <Input name="NOM" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          name="PRENOM"
          label="Prénom"
         
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
          ]}
        >
          <Input name="MAIL" onChange={handleChange} />
        </Form.Item>
        <Form.Item
          name="MOBILE"
          label="Téléphone"
          rules={[
            { len: 9, message: "Le numéro doit contenir 9 chiffres" },
          ]}
        >
          <Input
            name="MOBILE"
            addonBefore="+33"
            maxLength={9}
            onChange={handleChange}
            type="tel"
            style={{ width: "100%" }}
          />
        </Form.Item>
      </div>

      <div className="flex mt-3 text-neutral-400 justify-between">
        <Form.Item
          name="DATE_VISITE"
          label="Date de visite"
         
        >
          <DatePicker onChange={(date) => handleDateChange("DATE_VISITE", date)} />
        </Form.Item>
        <Form.Item
          name="DATE_PRIS_RDV"
          label="Date de prise"

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
      
      >
        <Input name="ADRESSE_COMPLETE" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        name="SURFACE_HABITABLE"
        label="Surface habitable (m²)"
        
      >
        <Input name="SURFACE_HABITABLE" onChange={handleChange} type="number" />
      </Form.Item>

      <Form.Item
        name="REF_PRODUIT"
        label="Référence produit"
       
      >
        <Input name="REF_PRODUIT" onChange={handleChange} />
      </Form.Item>

      <Form.Item
        name="COMMENTAIRES"
        label="Commentaires"
       value={formData.COMMENTAIRES}
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
        <Button type="primary" htmlType="submit">
          Mettre à jour le rendez-vous
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditRendez;
