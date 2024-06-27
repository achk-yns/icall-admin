import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
    const {roles , superviseurs , CreateUser} = useAuth()
    const navigate = useNavigate()
  const [formState, setFormState] = useState({
    NOM: "",
    PRENOM: "",
    EMAIL: "",
    PASSWORD: "",
    ROLE: "",
    SUPERVISEUR: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    CreateUser(formState)
    navigate('/utilisateurs');
};
  return (
    <Container className="p-4 mt-4">
      <Typography variant="h4" className="mb-4">
        Ajouter Un Rendez-vous
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box className="mb-4 mt-4">
          <Typography variant="h6" className="mb-2">
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nom"
                name="NOM"
                value={formState.NOM}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="prenom"
                name="PRENOM"
                value={formState.PRENOM}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="email"
                name="EMAIL"
                value={formState.EMAIL}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="password"
                name="PASSWORD"
                type="password"
                value={formState.MOBILE}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel id="role-select-label">Role : </InputLabel>
                <Select
                labelId="role-select-label"
                    name="ROLE"
                  value={formState.ROLE}
                  onChange={handleChange}
                  label="Role"
                  fullWidth
                >
                  {roles.map((role) => (
                    <MenuItem key={role} value={role}>
                      {role}
                    </MenuItem>
                  ))}
                </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
            <InputLabel id="role-select-label">Superviseur : </InputLabel>
                <Select
                labelId="role-select-label"
                  value={formState.SUPERVISEUR || ""}
                  name="SUPERVISEUR"
                  onChange={handleChange}
                  label="SUPERVISEUR"
                  fullWidth
                >
                  {superviseurs.map((sup) => (
                    <MenuItem key={sup._id} value={sup._id}>
                      {sup.NOM} {sup.PRENOM}
                    </MenuItem>
                  ))}
                </Select>
            </Grid>
          </Grid>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4"
        >
          Ajouter
        </Button>
      </form>
    </Container>
  );
}
