const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();

const { login, googleSignIn } = require('../controllers/auth.controllers');

const { checkFields } = require ('../middlewares');



router.post('/login',[
    check('email','el correo no es valido').isEmail(),
    check('password','El password es obligatorio, mas de 6 letras').not().isEmpty(),
    checkFields
],login);  

router.post('/google',[
    check('idToken','el id_token es necesario').not().isEmpty(),
    checkFields
],googleSignIn);  

module.exports= router;