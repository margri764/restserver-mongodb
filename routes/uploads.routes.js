const { Router } = require ('express');
const {check} = require ('express-validator');
const router = Router();
const { uploadFiles, showImage, updateImageCloudinary } = require('../controllers/uploads.controllers');
const { checkFields, checkFileUp } = require('../middlewares');
const { validColections } = require('../helpers')

router.post('/', checkFileUp ,uploadFiles);

router.put('/:colection/:id',[
    checkFileUp,
    check('id','el id debe ser de mongo').isMongoId(),
    check('colection').custom( colection => validColections(colection, ['users','products'])),
    checkFields
], updateImageCloudinary);
// ], updateImage);

router.get('/:colection/:id',[ 
    check('id','el id debe ser de mongo').isMongoId(),
    check('colection').custom( colection => validColections(colection, ['users','products'])),
    checkFields
], showImage);


module.exports= router;