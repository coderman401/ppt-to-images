/**
 * 
 * Created by Kishan Panchal on 2019.12.27
 * @author Kishan Panchal 
 * @description common functions
 * @version 1.0
 */

const config = require('./config');

/**
 * returns the unique filename with timestamp
 */
const getFileName = () => {
    const d = new Date();
    const timestamp = d.getTime();
    return timestamp;
}



/**
 * get the file extension from file name 
 * 
 * @param {String} path
 */
const getExt = (path) => {
    let ext = config.path;
    ext = ext.extname(path);
    return ext;
}



//exporting all functions
exports.getExt = getExt;
exports.getFileName = getFileName;