const jwt = require("jsonwebtoken");
require("dotenv").config();

async function auth(req, res, next) {
    try {
        const token = req.headers["token"];
        const decodedToken = await jwt.verify(token, process.env.Jwt_SECRETKEY);
        const {_id , ROLE } = decodedToken;
        if (_id){
            req.userId =_id;
            req.ROLE  = ROLE;
            next();
        } else {
            res.status(401).send("Not authorized. Please log in to access this resource.");
        }
    } catch (error) {
        res.status(401).send({ error: "Authentication failed. Please try again." });
    }
}

module.exports = auth;
