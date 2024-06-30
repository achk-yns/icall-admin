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
import { FaUser, FaPhoneAlt, FaHome, FaEnvelope, FaTag, FaDollarSign, FaCalendarAlt, FaRegCommentDots } from "react-icons/fa";

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
    <Container className="p-6 font-sans">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h4" className="font-bold text-gray-800">
          Details Rendez-vous
        </Typography>
        <Link
          to={"/Rendez-vous"}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center transition duration-300 ease-in-out"
        >
          <BiArrowBack className="mr-2" /> Back
        </Link>
      </div>

      <Card className="mb-6 shadow-lg  ">
        <CardContent>
          <Typography variant="h5" gutterBottom className="font-semibold text-gray-700">
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaUser style={{ fontSize: 20 }} className="text-blue-500" />
                  <h5 className="mx-3">Nom et Prenom :</h5>
                </div>
                <i>{data.NOM || "-"} {data.PRENOM || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaPhoneAlt style={{ fontSize: 20 }} className="text-green-500" />
                  <h5 className="mx-3">Mobile :</h5>
                </div>
                <i>{data.MOBILE || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaHome style={{ fontSize: 20 }} className="text-yellow-500" />
                  <h5 className="mx-3">Adresse Complete :</h5>
                </div>
                <i>{data.ADRESSE_COMPLETE || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} className="flex items-center">
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaEnvelope style={{ fontSize: 20 }} className="text-purple-500" />
                  <h5 className="mx-3">Email :</h5>
                </div>
                <i>{data.MAIL || "-"}</i>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardContent>
          <Typography variant="h5" gutterBottom className="font-semibold text-gray-700">
            Additional Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaTag style={{ fontSize: 20 }} className="text-pink-500" />
                  <h5 className="mx-3">Status :</h5>
                </div>
                <i>{data.STATUT || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaTag style={{ fontSize: 20 }} className="text-pink-500" />
                  <h5 className="mx-3">Ref Produit :</h5>
                </div>
                <i>{data.REF_PRODUIT || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaDollarSign style={{ fontSize: 20 }} className="text-yellow-500" />
                  <h5 className="mx-3">Prime :</h5>
                </div>
                <i>{data.PRIME || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaCalendarAlt style={{ fontSize: 20 }} className="text-blue-500" />
                  <h5 className="mx-3">Date de Prise :</h5>
                </div>
                <i>{data.DATE_PRIS_RDV || "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaCalendarAlt style={{ fontSize: 20 }} className="text-blue-500" />
                  <h5 className="mx-3">Date Visite :</h5>
                </div>
                <i>{data.DATE_VISITE ? new Date(data.DATE_VISITE).toLocaleDateString() : "-"}</i>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" className="flex items-center text-gray-600">
                <div className="flex items-center mx-3">
                  <FaRegCommentDots style={{ fontSize: 20 }} className="text-green-500" />
                  <h5 className="mx-3">Comments :</h5>
                </div>
                <i>{data.COMMENTAIRES || "-"}</i>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          component={Link}
          to={`/Rendez-vous/${id}/edit`}
          variant="contained"
          color="primary"
          className="bg-blue-500 hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Edit
        </Button>
      </div>
    </Container>
  );
};

export default DetailRensez;
