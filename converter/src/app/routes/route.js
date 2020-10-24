/**
 * 
 * Created by Kishan Panchal on 2019.12.26
 * @author Kishan Panchal 
 * @description routing file...
 * @version 1.0
 */

const express = require('express');
const router = express.Router(); // initiating express router

const upload = require('../controllers/upload.controller');
router.post('/upload', upload.doPost);

const convert = require('../controllers/convert.controller');
router.post('/convert', convert.addTask);

// exporting the router //
module.exports = router;