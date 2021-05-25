/**
  Ruta: '/api/palobj'
 */

const { Router } = require("express");
const { check } = require("express-validator");
const { getObjetivos, newObjetivo, updateobjetivo, deleteObjetivo } = require("../controllers/palobj.controller");
const {validarCampos} = require("../middlewares/validar-campos");


 const router = Router();

 router.get('/',getObjetivos);
 router.post('/',[
  check('anio', 'anio es obligatorio').not().isEmpty(),
  check('tipo', 'tipo es obligatorio').not().isEmpty(),
  check('descripcion', 'descripcion es obligatorio').not().isEmpty(),
  check('codigo', 'codigo es obligatorio').not().isEmpty(),
  validarCampos
], newObjetivo);

router.put('/:id', [
  
  check('anio', 'anio es obligatorio').not().isEmpty(),
  check('tipo', 'tipo es obligatorio').not().isEmpty(),
  check('descripcion', 'descripcion es obligatorio').not().isEmpty(),
  check('codigo', 'codigo es obligatorio').not().isEmpty(),
  validarCampos
], updateobjetivo)

router.delete('/:id', deleteObjetivo)

 module.exports=router;