const { Router } = require ('express');

const { check } = require ('express-validator');
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controllers');
const { checkCategory, checkProduct} = require ('../helpers/db-validators');

const router = Router();

const { checkFields } = require ('../middlewares/check-fields');

const { checkToken } = require ('../middlewares/check-jwt');
const { adminRole } = require('../middlewares/check-role');


//obtener todos los productos - publico
router.get('/',getProduct);

//obtener una categoria por id - publico
router.get('/:id',[

    check('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom( checkProduct),
    checkFields,
],getProductById);



//craer una categoria - privado cualquier persona con token valido
router.post('/',[ 

    checkToken,
    check('name','el nombre es obligatorio').not().isEmpty(),
    check('category','no es un id de Mongo valido').isMongoId(),
    check('category').custom( checkCategory),
    checkFields  
],createProduct );


//actualizar una categoria - privado cualquier persona con token valido
router.put('/:id',[

    checkToken,
    check('category','no es un id de Mongo valido').isMongoId(),
    check('id').custom( checkProduct),
    checkFields
],updateProduct);

//Borrar una categoria - privado solos si tiene role "ADMIN"
router.delete('/:id',[

    checkToken,
    adminRole,
    check('id', 'no es un id de Mongo valido').isMongoId(),
    check('id').custom( checkProduct),
    checkFields,
],deleteProduct);



module.exports= router;