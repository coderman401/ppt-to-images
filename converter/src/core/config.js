/**
 * 
 * Created by Kishan Panchal on 2019.12.27
 * @author Kishan Panchal 
 * @description config file contains all common configuration varibale
 * @version 1.0
 */

const fs = require('fs');
const path = require('path');

const uploadPath = path.join(__dirname, '../uploads/');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath);
}

const config = {
    // modules
    fs: fs,
    path: path,
    // vars
    current_time : new Date().getTime(),
    ext: ['.jpg', '.png', '.gif', '.jpeg', '.ppt', '.pptx', '.pps', '.ppsx', '.swf', '.wmv', '.asf', '.asx', '.rm', '.rmvb', '.mpg', '.mpeg', '.mpe', '.3gp', '.mov', '.mp4', '.m4v', '.avi', '.dat', '.mkv', '.flv', '.vob', '.mp3', '.wma', '.zip' ],
    uploadPath : uploadPath,
};

//exporting config
module.exports = config;