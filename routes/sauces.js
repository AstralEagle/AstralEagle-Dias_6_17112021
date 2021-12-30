const express = require('express');
const router = express.Router();

const control = require('../controllers/sauces');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

router.get('/' ,control.getSauces);
router.get('/:id',auth ,control.getSaucesById);
router.post('/',auth , multer, control.creatSauce);
router.put('/:id',auth, multer, control.editSauceById);
router.delete("/:id",auth ,control.deleteSauceById);
router.delete("/",control.deleteSauce);
router.post('/:id/like' ,auth ,control.likeSauce);



module.exports = router;