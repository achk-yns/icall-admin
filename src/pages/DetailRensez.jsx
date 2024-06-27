import React from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { BiArrowBack } from "react-icons/bi";
import FetchRend from "../Fetching/FetchRend";

const DetailRensez = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await FetchRend.getONERendezVous(id);
        setData(result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h4">Details Rendez-vous</Typography>
        <Link
          to={"/Rendez-vous"}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center"
        >
          <BiArrowBack className="mr-2" /> Back
        </Link>
      </div>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Nom:</strong> {data.NOM || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Prenom:</strong> {data.PRENOM || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Mobile:</strong> {data.MOBILE || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Adresse Complete:</strong>{" "}
                {data.ADRESSE_COMPLETE || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">
                <strong>Email:</strong> {data.MAIL || "-"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Additional Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Status:</strong> {data.status || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Comments:</strong> {data.COMMENTAIRES || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Ref Produit:</strong> {data.REF_PRODUIT || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Prime:</strong> {data.PRIME || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Prime:</strong> {data.DATE_PRIS_RDV || "-"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1">
                <strong>Date Visite:</strong>{" "}
                {data.DATE_VISITE ? new Date(data.DATE_VISITE).toLocaleDateString() : "-"}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          component={Link}
          to={`/Rendez-vous/${id}edit/`}
          variant="contained"
          color="primary"
        >
          Edit
        </Button>
      </div>
    </Container>
  );
};

export default DetailRensez;
