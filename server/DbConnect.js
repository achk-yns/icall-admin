const mongoose = require('mongoose');
require("dotenv").config()
mongoose.connect(process.env.MONGOUrl)
.then(()=>console.log("Db connecting..."))
.catch(err => console.log(err))