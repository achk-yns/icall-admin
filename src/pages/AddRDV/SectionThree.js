import React from 'react';
import { TextField, Typography, Grid, Box, FormControlLabel, Checkbox } from '@mui/material';

const SectionTwo = ({ formState, handleChange }) => {
  return (
    <Box className="mb-4">
      <Typography variant="h6" className="mb-2">House Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Ref Produit"
            name="REF_PRODUIT"
            value={formState.REF_PRODUIT || null}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Surface Habitable"
            name="SURFACE_HABITABLE"
            value={formState.SURFACE_HABITABLE ||null}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.THERMOSTAT || false}
                onChange={handleChange}
                name="THERMOSTAT"
              />
            }
            label="Thermostat"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControlLabel
            control={
              <Checkbox
                checked={formState.TETE_THERMOSTATIQUE || false}
                onChange={handleChange}
                name="TETE_THERMOSTATIQUE"
              />
            }
            label="Tete Thermostatique"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionTwo;
