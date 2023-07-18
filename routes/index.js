const express = require('express')
const UserController = require('../controllers/user-controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const Router = express.Router()



//User
Router.post('/register', UserController.register)
Router.post('/login', UserController.login)
Router.post('/googleLogin', UserController.googleLogin)


Router.get('/stores', UserController.storeList)
Router.get('/mystores/',authentication, UserController.getMyStore)
Router.get('/stores/:idStores', UserController.detailStore)
Router.get('/productService/:idStore',authentication, UserController.listProductService)
Router.get('/types', UserController.listType)
Router.get('/transactions',authentication, UserController.listTransaction)
Router.post('/stores/create', authentication, UserController.createStore)
Router.post('/products/:idStore',authentication, UserController.createProductService)
Router.post('/transactions/:idProduct',authentication, UserController.createTransaction)
Router.delete('/delete/stores/:idStore',authentication, UserController.deleteStore)
Router.put('/stores/:idStore', authentication, UserController.editStore)
Router.post('/generate-midtrans-token/:idProduct', authentication, UserController.generateMidtrans)


module.exports = Router

