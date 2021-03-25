const { Router } = require ('express');
const {check} = require ('express-validator');
const { login } = require('../controllers/auth.controllers');
const { checkFields } = require ('../middlewares/check-fields');

const router = Router();

router.post('/login',[
    check('email','el correo no es valido').isEmail(),
    check('password','El password es obligatorio, mas de 6 letras').isLength({min:6}),
    checkFields
],login);  



module.exports= router;