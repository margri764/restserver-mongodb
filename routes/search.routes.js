const { Router } = require ('express');
const { search } = require ('../controllers/search.controllers');
const router = Router();

router.get('/:colection/:termino', search)



module.exports= router;