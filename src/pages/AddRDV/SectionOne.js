import React from "react";
import {
  TextField,
  Typography,
  Grid,
  Box,
  InputAdornment,
} from "@mui/material";

const SectionOne = ({ formState, handleChange }) => {
  return (
    <Box className="mb-4">
      <Typography variant="h6" className="mb-5" style={{marginBottom:20}}>
        Personal Information
      </Typography>
      <Grid container spacing={2} className="mt-5">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nom"
            name="NOM"
            value={formState.NOM || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Prenom"
            name="PRENOM"
            value={formState.PRENOM || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Mobile"
            name="MOBILE"
            value={
              formState.MOBILE
                ? formState.MOBILE.startsWith("+33")
                  ? formState.MOBILE.slice(3)
                  : formState.MOBILE
                : ""
            }
            onChange={handleChange}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+33</InputAdornment>
              ),
            }}
            onBlur={(event) => {
              if (event.target.value === "" && formState.MOBILE) {
                handleChange({
                  target: { name: "MOBILE", value: "+33" + formState.MOBILE },
                });
              }
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Adresse Complete"
            name="ADRESSE_COMPLETE"
            value={formState.ADRESSE_COMPLETE || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            name="MAIL"
            value={formState.MAIL || ""}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SectionOne;
