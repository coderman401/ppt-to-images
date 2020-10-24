/**
 * 
 * Created by Kishan Panchal - 2019.12.26
 * @author Kishan Panchal 
 * @url "" 
 * @version 1.0
 */

 // importing modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const route = require('./app/routes/route'); // importing router
require('dotenv').config({path: path.join(__dirname, '.env')}); //env configuration
const app = express(); // initialized express app

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/', route);
app.use('/slideshows', express.static(path.join(__dirname, 'uploads')))

// process.env.
let port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is up and running on port numner ${port}`)
});
