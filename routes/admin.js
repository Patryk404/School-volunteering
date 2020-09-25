const router = require('express').Router();
const adminController = require('../controllers/admin');

router.get('/',adminController.getAdminSite);

router.post('/login',adminController.loginAdmin);

module.exports = router;