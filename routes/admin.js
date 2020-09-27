const router = require('express').Router();
const adminController = require('../controllers/admin');

router.get('/',adminController.getAdminSite);

router.get('/add_post', adminController.getAdminNewPost); 

router.post('/add_post',adminController.addNewPost);

router.post('/login',adminController.loginAdmin);

router.post('/create_admin',adminController.createAdmin);

router.post('/logout',adminController.logoutAdmin);

router.post('/delete/:id',adminController.deletePost);

router.post('/edit/:id',adminController.editPost);

router.get('/edit/post/:id',adminController.getEditPost);

module.exports = router;