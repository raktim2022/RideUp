const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const userController = require('../controllers/user.controller');



router.post('/register', [
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters'),
    body('fullname.firstname').isLength({min: 3}).withMessage('First name must be at least 3 characters'),
    body('fullname.lastname').isLength({min: 3}).withMessage('First name must be at least 3 characters')
], userController.register);

router.post('/login',[
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters')
], userController.login);













module.exports = router;