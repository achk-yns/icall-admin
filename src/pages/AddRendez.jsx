import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Checkbox,
  FormControlLabel,
  Container,
} from "@mui/material";
import { ChevronLeft as ChevronLeftIcon } from "@mui/icons-material";
import { useDropzone } from "react-dropzone";
import { useRendezVous } from "../contexts/RendezVousContext";
import ToastService from "../ToastService";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from 'antd';

const { Option } = Select;

const AddRendez = () => {
  const navigate = useNavigate();
  const { addRendezVous } = useRendezVous();

  const [formData, setFormData] = useState({
    status: "injecte",
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
    createdRv: null,
    documents: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "MOBILE") {
      const cleanedValue = value.replace(/\D/g, "");
      setFormData({
        ...formData,
        [name]: cleanedValue.slice(0, 9),
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
    console.log(formData);
  };

 
  const onDrop = (acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      documents: [...prevData.documents, ...acceptedFiles],
    }));
  };

  const props = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      onDrop(e.dataTransfer.files)
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleSubmitForm = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "documents") {
          value.forEach((file) => {
            formDataToSend.append("documents", file);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });

      await addRendezVous(formDataToSend);
      ToastService.success("Rendez-vous ajouté avec succès");
      navigate("/rendez-vous");
    } catch (error) {
      console.error("Error adding rendez-vous:", error);
      ToastService.error("Erreur lors de l'ajout du rendez-vous");
    }
  };
  const options = [
    { label: "Radiateur Hydraulique", value: "hydraulique" },
    { label: "Radiateur Electrique", value: "electrique" },
    { label: "Radiateur Mixte", value: "mixte" },
  ];
  
  return (
    <div className="lx:w-50 flex justify-center">
      <div className="basis-2/6 bg-slate-100 mt-4 mx-3 items-center justify-center p-4">
        <Form layout="vertical" onFinish={handleSubmitForm}>
          {/* Parti Chauffage Row 1 */}
          <Form.Item
            name="Type_Chauffage"
            label="Type de chauffage"
            rules={[{ required: true, message: "Type de chauffage est requis" }]}
          >
            <Select placeholder="Type de chauffage" allowClear>
              {options.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          {/* PARTIE 2  CVILITE NOM ET PRENOM  */}
          <div className="flex mt-4 text-neutral-400">
            <Form.Item
              name="CIVILITE"
              label="Civilité"
              rules={[{ required: true, message: "Civilité est requise" }]}
            >
              <Select placeholder="Civilité" allowClear>
                <Option value="mr">Monsieur</Option>
                <Option value="mrs">Madame</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="PRENOM"
              label="Prénom"
              rules={[{ required: true, message: "Prénom est requis" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="NOM"
              label="Nom"
              rules={[{ required: true, message: "Nom est requis" }]}
            >
              <Input />
            </Form.Item>
          </div>

          {/* partie 3 Email et telephone avec PREFIX */}
          <div className="flex mt-4 text-neutral-400">
            <Form.Item
              name="EMAIL"
              label="Email"
              rules={[
                { type: "email", message: "Email invalide" },
                { required: true, message: "Email est requis" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="MOBILE"
              label="Téléphone"
              rules={[{ required: true, message: "Téléphone est requis" }]}
            >
              <Input
                addonBefore="+33"
                maxLength={12}
                onChange={handleChange}
                value={
                  formData.MOBILE
                    ? formData.MOBILE.startsWith("+33")
                      ? formData.MOBILE.slice(3)
                      : formData.MOBILE
                    : ""
                }
                onBlur={(event) => {
                  if (event.target.value === "" && formData.MOBILE) {
                    handleChange({
                      target: { name: "MOBILE", value: "+33" + formData.MOBILE },
                    });
                  }
                }}
                type="number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </div>

          {/* Partie 4 des dates  */}
          <div className="flex mt-3 text-neutral-400 justify-between">
            <Form.Item
              name="DATE_VISITE"
              label="Date de visite"
              rules={[{ required: true, message: "Date de visite est requise" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name="DATE_PRIS_RDV"
              label="Date de prise rendez-vous"
              rules={[{ required: true, message: "Date de prise rendez-vous est requise" }]}
            >
              <DatePicker />
            </Form.Item>
          </div>

          <div className="text-neutral-400 border-b-2 my-4 text-center">
            <h3>Adresse de Livraison </h3>
          </div>
          
          {/* Partie 4 Adresse */}
          <Form.Item
            name="ADRESSE_COMPLETE"
            label="Adresse"
            rules={[{ required: true, message: "Adresse est requise" }]}
          >
            <Input.TextArea />
          </Form.Item>

          <div className="flex mt-4 text-neutral-400">
            <Form.Item
              name="CODE_POSTAL"
              label="Code postal"
              rules={[{ required: true, message: "Code postal est requis" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="VILLE"
              label="Ville"
              rules={[{ required: true, message: "Ville est requise" }]}
            >
              <Input />
            </Form.Item>
          </div>     

          <Form.Item
            name="COMMENTAIRES"
            label="Commentaires"
          >
            <Input.TextArea />
          </Form.Item>
          
          <div className="mt-3">
            <h3>Charger des documents :</h3>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Cliquez ou glissez les fichiers à télécharger
              </p>
              <p className="ant-upload-hint">
                Support pour un seul ou plusieurs fichiers de chargement.
              </p>
            </Dragger>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button
              type="primary"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              htmlType="submit"
            >
              Enregistrer
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddRendez;
