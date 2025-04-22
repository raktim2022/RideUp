const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captain.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Register captain
router.post('/register', [
    body('fullName.firstName').isLength({min: 2}).withMessage('First name must be at least 2 characters'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({min: 5}).withMessage('Password must be at least 5 characters'),
    body('phoneNumber').not().isEmpty().withMessage('Phone number is required'),
    body('vehicle.color').not().isEmpty().withMessage('Color is required'),
    body('vehicle.plateNumber').not().isEmpty().withMessage('Plate number is required'),
    body('vehicle.capacity').not().isEmpty().withMessage('Capacity is required'),
    body('vehicle.vehicleType').not().isEmpty().withMessage('Vehicle type is required'),
], captainController.register);

// Login captain
router.post('/login', [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').not().isEmpty().withMessage('Password is required'),
], captainController.login);

// Get captain profile
router.get('/profile', authMiddleware.authCaptain, captainController.getCaptainProfile);

// Logout captain
router.get('/logout', authMiddleware.authCaptain, captainController.logout);

module.exports = router;