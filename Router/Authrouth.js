const express = require('express')
const AuthController = require('../controller/authController')
const route = express.Router()

route.get('/',AuthController.getUsers)
route.post('/login', AuthController.login)
route.post('/signUp', AuthController.signUp)
route.get('/checkAuth' , AuthController.checkAuth)
route.put('/:id/selectedUser' , AuthController.checkStatus)


module.exports = route