const express = require ('express');
const router = express.Router();
const multer = require ('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/posters')
    },
    filename: function (req, file, cb) {
        let timestamp = Date.now();
        cb(null, file.fieldname + '-' + timestamp + path.extname(file.originalname));
    }     

}); 

const upload = multer({storage: storage});

const controller = require ('../controllers/movies');

router.get('/', controller.allmovies);

router.get('/create', controller.formToCreate); 

router.post('/create', upload.single('poster'), controller.storeInDB); 

router.get('/details/:id', controller.details);

router.post('/delete/:id', controller.delete);      

router.get('/edit/:id', controller.formToEdit); 

router.post('/update/:id', upload.single('poster'), controller.update); 

module.exports= router;