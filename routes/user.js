const router = require('express').Router();
const userController = require('../controllers/user');

router.get('/about_us',userController.getAboutUs);

router.get('/',userController.getIndex);

router.get('/post/:id',userController.getPost);

module.exports = router;