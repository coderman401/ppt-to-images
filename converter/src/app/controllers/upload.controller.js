/**
 * 
 * Created by Kishan Panchal on 2019.12.30
 * @author Kishan Panchal 
 * @description this file contains process of upload file and preview 
 * @version 1.0
 */

const config = require('../../core/config');
const common = require('../../core/common');

const doPost = (request, response, next) => {

    let fileStream;
    let name = request.headers['name'];
    const uploadPath = config.uploadPath;

    if (!config.fs.existsSync(uploadPath)) {
        config.fs.mkdirSync(uploadPath);
    }

    let ext = common.getExt(name);
    let fileName = common.getFileName() + ext;
    let file = uploadPath + fileName;
    fileStream = config.fs.createWriteStream(file, {
        flags: 'w'
    });

    request.pipe(fileStream);

    // when the request is finished, and all its data is written
    fileStream.on('close', function () {
        // can do something else with the uploaded file here
        response.json({ 'status': 'ok', 'file': fileName, 'meassage': 'file uploaded successfully' });
        response.end();
        return;
    });

    // in case of I/O error - finish the request
    fileStream.on('error', function (err) {
        console.log("fileStream error", err);
        response.writeHead(500, "File error");
        response.end();
    });
};

exports.doPost = doPost;
