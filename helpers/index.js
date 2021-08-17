
const dbValidators = require('./db-validators');
const generarJwt = require('./generar-jwt');
const googleVerify = require('./google-verify');
const uploadFiles = require('./upload-files');




module.exports={
    ...dbValidators,
    ...generarJwt,
    ...googleVerify,
    ...uploadFiles
}
