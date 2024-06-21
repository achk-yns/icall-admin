const express = require('express');
const app = express();
require("./DbConnect");
const RendezVous = require("./Services/RendezVous");
const UsersRoute = require("./Services/Users");
require("dotenv").config();
const PORT =process.env.PORT || 3000;
const session = require("express-session");
const cors = require("cors");

app.use(express.static("./public"));
app.use(cors());
app.use(express.json()); // <-- Updated JSON parsing middleware
app.use(express.urlencoded({extended:true}));

app.use(
  session({
    secret: 'IcallSecretKey',
    resave: false,
    saveUninitialized: false,
  })
);

app.use("/users", UsersRoute);
app.use("/rendez-vous",  RendezVous);

app.use((req, res) => {
  res.status(404).send({message : "Page Not Found "});
});

app.listen(PORT, () => {
  console.log("listening...Port:" + PORT);
});
