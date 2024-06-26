import React from 'react';
import { TextField, Typography, Grid, Box } from '@mui/material';

const SectionOne = ({ formState, handleChange }) => {
  return (
    <Box className="mb-4">
      <Typography variant="h6" className="mb-2">Personal Information</Typography>
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
            label="Prenom"
            name="PRENOM"
            value={formState.PRENOM}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mobile"
            name="MOBILE"
            value={formState.MOBILE}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Adresse Complete"
            name="ADRESSE_COMPLETE"
            value={formState.ADRESSE_COMPLETE}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="MAIL"
            value={formState.MAIL}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionOne;
