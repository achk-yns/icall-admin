import React from 'react';
import { TextField, Typography, Grid, Box } from '@mui/material';

const SectionThree = ({ formState, handleChange }) => {
  return (
    <Box className="mb-4 mt-4">
      <Typography variant="h6" className="mb-2">Additional Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Installateur"
            name="INSTALLATEUR"
            value={formState.INSTALLATEUR}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Source"
            name="SOURCE"
            value={formState.SOURCE}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Prime"
            name="PRIME"
            value={formState.PRIME}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Retour Installateur"
            name="RETOUR_INSTALLATEUR"
            value={formState.RETOUR_INSTALLATEUR}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date Visite"
            name="DATE_VISITE"
            type="date"
            value={formState.DATE_VISITE}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Date Pris RDV"
            name="DATE_PRIS_RDV"
            type="date"
            value={formState.DATE_PRIS_RDV}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            label="Created RV"
            name="createdRv"
            type="date"
            value={formState.createdRv}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />
        </Grid> */}
        <Grid item xs={12}>
          <TextField
            label="Commentaires"
            name="COMMENTAIRES"
            value={formState.COMMENTAIRES}
            onChange={handleChange}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionThree;
