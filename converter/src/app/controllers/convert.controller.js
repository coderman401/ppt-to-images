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
            const res = result.split(';');
            let images = [];
            for (let i = 1; i <= res[2]; i++) {
                images.push(`http://localhost:8080/slideshows/${res[1]}_${i}.jpg`);
            }
            response.json({ 'status': true, 'message': result, 'total_page': res[2], 'images': images });
        }
    }).catch(err => {
        console.log(err);
        response.json({ 'status': false, 'message': 'convert fail.' });
    });
};


exports.addTask = addTask;
