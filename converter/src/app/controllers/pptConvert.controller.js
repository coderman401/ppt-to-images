/**
 * 
 * Created by Kishan Panchal on 2019.12.30
 * @author Kishan Panchal 
 * @description this  file converts ppt slides into images
 * @version 1.0
 */

const config = require('../../core/config');
const common = require('../../core/common');
const shell = require('shelljs');

class pptConvert {
    /**
     * initialized the constructer.
     * 
     * @param {string} file 
     */
    constructor(file) {
        this.file = file;
    }

    start() {
        return new Promise(resolve => {
            const fileSrc = this.file;
            const ext = common.getExt(fileSrc);

            convertToPDF(fileSrc, ext).then((pdfFile) => {
                pdfToImages(pdfFile).then((str) => {
                    resolve(str);
                }).catch((error) => {
                    console.log('Error: ', error);
                });
            }).catch((err) => {
                console.log('Error converting pdf', err);
            });
        });
    }
}

// exporting Video Converter Modules
module.exports = pptConvert;

/**
 * Convert PPT file into a PDF file.
 * 
 * @param {string} file ppt file name with full path.
 */
function convertToPDF(file, ext) {
    return new Promise((resolve, reject) => {
        const office = process.env.PPT_TO_PDF_PATH;
        const outdir = config.uploadPath.replace(/\\/g, '/').slice(0, -1);
        if (!config.fs.existsSync(file))
            reject(Error('File Not Found'));

        if (ext === '.ppt' || ext === '.pptx' || ext == '.pps' || ext == '.ppsx') {
            const commandOffice = `"${office}" --headless --convert-to pdf --outdir "${outdir}" "${file}"`;
            console.log('commandOffice', commandOffice);
            shell.exec(commandOffice, (err, stdout, stderr) => {
                const pdf = file.replace(ext, '.pdf');
                if (err) {
                    reject(Error(err))
                }
                resolve(pdf);
            });
        } else {
            reject(Error('Only selected extensions are allowed'));
        }
    });
}

/**
 * Convert PDF file pages to images.
 * 
 * @param {string} pdfFile pdf file name with full path
 */
function pdfToImages(pdfFile) {
    return new Promise((resolve, reject) => {
        const gs = process.env.GS_PATH;
        const fileName = config.path.basename(pdfFile);
        const ext = common.getExt(fileName);
        const image = pdfFile.replace(ext, '');

        if (config.fs.existsSync(pdfFile)) {
            getPdfInfo(pdfFile).then((response) => {
                const num = parseInt(response);
                const commandGS = `"${gs}" -dBATCH -dNOPAUSE -sDEVICE=jpeg -dJPEGQ=75 -r300 -sOutputFile="${image}_%d.jpg" "${pdfFile}"`;
                console.log('commandGS', commandGS);
                shell.exec(commandGS, (error, stdout, stderr) => {
                    if (error) {
                        resolve('err;convert fail');
                    }
                    const msg = `ok;${fileName.replace(ext, '')};${num}`;
                    deletePdf(pdfFile); // after successful convert process(ppt => pdf, pdf => image) it deletes the converted pdf file.
                    resolve(msg);
                });
            });
        } else {
            resolve('Can\'t find PDF file');
        }
    });
}

/**
 * get the number of pages in pdf.
 * 
 * @param {string} pdfFile pdf file name with path
 */
function getPdfInfo(pdfFile) {
    return new Promise((resolve, reject) => {
        if (!config.fs.existsSync(pdfFile)) {
            resolve('can\'t find pdf file');
            return;
        }

        const cpdf = process.env.CPDF_PATH;
        const commandInfo = `"${cpdf}" -pages "${pdfFile}"`;

        shell.exec(commandInfo, (error, stdout, stderr) => {
            if (error) {
                resolve(error);
            }
            resolve(stdout);
        });
    });
}
/**
 * delete converted pdf file...
 * 
 * @param {string} pdf pdf file name with path
 */
function deletePdf(pdf) {
    console.log('delete');
    if (config.fs.existsSync(pdf)) {
        console.log('pdf', pdf);
        config.fs.unlinkSync(pdf);
    }
}