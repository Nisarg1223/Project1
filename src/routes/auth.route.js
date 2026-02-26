const express = require("express");

const Router = express.Router();
const authController = require('../controllers/auth.controller.js')
Router.post("/register",authController.registercontroller)


Router.post('/login',authController.logincontroller)

module.exports = Router