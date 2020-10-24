/**
 * 
 * Created by Kishan Panchal on 2019.12.30
 * @author Kishan Panchal 
 * @description this file contains convert process
 * @version 1.0
 */



const config = require('../../core/config');
const pptConvert = require('./pptConvert.controller');

const addTask = (request, response) => {
    const file = config.path.join(config.uploadPath, request.body.filename);
    const convert = new pptConvert(file);
    convert.start().then((result) => {
        if (result.split(';') && result.split(';')[0] == 'ok') {
            response.json({'status': true, 'message': result});
        }
    }).catch(err => {
        console.log(err);
        response.json({'status': false, 'message': 'convert fail.'});
    });
};


exports.addTask = addTask;
