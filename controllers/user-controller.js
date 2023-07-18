const { generateToken } = require('../helpers/jwt');
const { User, Store, ProductService, Type, Transaction } = require('../models')
const midtransClient = require('midtrans-client');
const { OAuth2Client } = require('google-auth-library')

class UserController{
    static async register(req, res, next){
        try {

            const { email, password } = req.body
            const newUser = await User.create({email, password})

            res.status(201).json({
                statusCode: 200,
                message: 'success do register',
                data: newUser
            })

        } catch (error) {
            console.log(error);
        }
    }


    static async login(req, res, next){
        try {

            console.log('masuk kedalam login<<<<<');
            const { email, password } = req.body

            console.log(email, 'isi dari email<<<<<<');

            const userLogin = await User.findOne({
                where: {
                  email
                },
                attributes: { exclude: ['password'] } // Exclude the 'password' field
              });

        

            const access_token = generateToken({
                id: userLogin.id,
                email: userLogin.email,
                role: userLogin.role
            })

            res.status(200).json({
                statusCode: 200,
                message: "login success",
                data: userLogin,
                access_token
            })


        } catch (error) {
            console.log(error);
        }
    }

    static async storeList(req, res, next){
        try {
            console.log('masuk kedalam storeList<<<<<');
            const stores = await Store.findAll()

            res.status(200).json({
                statusCode: 200,
                data: stores
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async listProductService(req, res, next){
        try {
            const { idStore } = req.params

            const store = await Store.findOne({
                where: {
                    id: idStore
                }
            })

            const listProduct = await ProductService.findAll({
                where: {
                    StoreId: idStore
                }
            })


            res.status(200).json({
                statusCode: 200,
                message: 'aman',
                data: {
                    listProduct: listProduct, 
                    store: store
                }
            })
        } catch (error) {
            console.log(error);
        }
    }


    static async listType(req, res, next){
        try {
            console.log('masuk ke list type');
            const types = await Type.findAll()

            console.log(types);
            res.status(200).json({
                statusCode: 200,
                message: 'aman',
                data: types
            })


        } catch (error) {
            console.log(error);
        }
    }

    static async listTransaction(req, res, next){

        try {

            const { email } = req.additionalData
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            console.log(user, '<<<<<<<<<user');
            console.log('masuk list trabsaction<<>>>>');
            const transactions = await Transaction.findAll({
                where: {
                    UserId: user.id
                }
            })

            res.status(200).json({
                statusCode: 200,
                data: transactions
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async createStore(req, res, next){
        try {

            console.log(req.additionalData, '<<<<<><><>');
            const { email } = req.additionalData

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            const { name, location } = req.body
            console.log(user.id);
            const newStore = await Store.create({
                name: name,
                location: location,
                UserId: user.id
            })

            res.status(201).json({
                statusCode: 201,
                data: newStore
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async deleteStore(req, res, next){
        try {
            const { idStore } = req.params
            console.log('masuk kedalam delete store<<<<');

            console.log(idStore, 'isi dari id store<<<<<<');

            // console.log(idStore, 'isi dari id store<<<<<<<');

            const deletedStore = await Store.findOne({
                where: {
                    id: idStore
                }
            })

            // console.log(deletedStore, '<<<<<<<<<isi dari deletedStore');

            // console.log(deletedStore, 'isi dari deletedStore<<<<<<');

            const destroyStore = await Store.destroy({
                where: {
                    id: idStore
                }
            }) 

            console.log(destroyStore, 'isi dari destroy');
            // console.log(destroyStore);

            res.status(200).json({
                message: 'successfully deleted',
                data: deletedStore
            })
        } catch (error) {
            console.log(error);
        }
    }


    static async createProductService(req, res, next){
        try {
            const { email } = req.additionalData
            const { idStore } = req.params

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            const store = await Store.findOne({
                where: {
                    // UserId: user.id,
                    id: idStore,
                    UserId: user.id 
                }
            })

            console.log(store, '<<<<<<isi dari store yang dicari');

            const { name, description, price, TypeId } = req.body

            const newProductService = await ProductService.create({
                name: name,
                description: description,
                price: price,
                TypeId: TypeId,
                StoreId: store.id
            })
            console.log(store, 'isi dari store');


            res.status(201).json({
                statusCode: 200,
                message: 'success create new product service',
                data: newProductService
            })

            //notes: masih kurang typeId



        } catch (error) {
            console.log(error);
        }
        
    }

    static async createTransaction(req, res, next){
        try {


            const { idProduct } = req.params 

            const { email } = req.additionalData

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            console.log(user, ';isi dari user');

            const newTransaction = await Transaction.create({
                UserId: user.id,
                ProductServiceId: idProduct
            })

            console.log(newTransaction, 'isi dari newTransaction');

            const { id } = newTransaction

            console.log(id, 'isi dari id<<');

            const lastTransaction = await Transaction.findOne({
                where: {
                    id: id
                },
                include: [User, ProductService]
            })

            // console.log(lastTransaction, 'isi dari last transaction');

            // Create Snap API instance
            // let snap = new midtransClient.Snap({
            // // Set to true if you want Production Environment (accept real transaction).
            // isProduction : false,
            // serverKey : process.env.MIDTRANS_SERVER_KEY,
            // });
                
            // let parameter = {
            // "transaction_details": {
            //  "order_id": "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
            // "gross_amount": lastTransaction.ProductService.price

            // },
            //  "credit_card":{
            //  "secure" : true
            // },

            // "customer_details": {
            // // "first_name": "budi",
            // // "last_name": "pratama",
            // // "email": "budi.pra@example.com",
            // // "phone": "08111222333"
            // }
            // };
            // const midtransToken = await snap.createTransaction(parameter)

            // console.log(midtransToken, 'isi dari midtransToken<<<<<< linme 320');

            res.status(201).json({
                statusCode: 201,
                data: newTransaction
            })
            


        } catch (error) {
            
        }
    }

    static async editStore(req, res, next){
        try {
            console.log(req.params, '<');

            const { idStore } = req.params
            const store = await Store.findOne({
                where: {
                    id: idStore
                }
            })

            const { name, location, imageUrl } = req.body

            const updatedStore = await Store.update({
                name: name,
                location: location,
                imageUrl: imageUrl
            },{
                where: {
                    id: idStore
                }
            })

            res.status(200).json({
                statusCode: 200,
                message: 'successfully updated store'
            })

            // console.log(req.body, 'isi dari req.body<');
            // console.log(store, 'isi dari store<<<');
        } catch (error) {
            console.log(error);
        }
    }

    static async detailStore(req, res, next){
        try {
            console.log(req.params);
            const { idStores } = req.params
            const detailStore = await Store.findOne({
                where: {
                    id: idStores
                }
            })
            
            
            res.status(200).json({
                statusCode: 200,
                data: detailStore
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async generateMidtrans(req, res, next){
        try {

            // console.log(req.params, 'isi req.params<<<<<');

            const { idProduct } = req.params
            const { userId } = req.additionalData

            const findProductService = await Transaction.findOne({
                where: {
                    ProductServiceId : idProduct
                },
                include: [ProductService, User]
            })

            const user = await User.findOne({
                where: {
                    id: userId
                }
            })

            let snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
            })

            let parameter = {
                transaction_details: {
                    order_id:
                    "TRANSACTION_" + Math.floor(1000000 + Math.random() * 9000000),
                    gross_amount: findProductService.ProductService.price,
                },
                credit_card: {
                    secure: true,
                },
                customer_details: {
                    email: user.email
                }

            }
            const midTransToken = await snap.createTransaction(parameter)

            res.status(200).json({
                statusCode: 200,
                data: midTransToken
            })

        } catch (error) {
            console.log(error);
        }
    }

    static async getMyStore(req, res, next){
        try {
            const { email } = req.additionalData

            const user = await User.findOne({
                where: {
                    email: email
                }
            })

            const myStores = await Store.findAll({
                where: {
                    UserId: user.id
                }
            })
            // console.log(user, 'isi dari user');
            console.log(myStores, 'isi dari mystores');

            res.status(200).json({
                statusCode: 200,
                data: myStores
            })
        } catch (error) {
            console.log(error);
        }
    }

    static async googleLogin(req, res, next){
        try {
            const { google_token } = await req.headers;

            // console.log(google_token);
            const client = new OAuth2Client({
                clientId: process.env.CLIENT_ID,
            })

            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.CLIENT_ID,
            })


            const payload = ticket.getPayload();
            const email = payload.email
            const password = 123456
            role = 'Customer'


            const [user, create] = await User.findOrCreate({
                where: { email },
                default: { 
                    email : email, 
                    password: 123456, 
                    role : role
                },
                hooks: false
            })

            // console.log(user, 'isi dari user<<<<<');


            const access_token = generateToken({
                id: user.id,
                email: user.email
            })

            res.status(200).json({
                statusCode: 200,
                message: "Login success",
                data: {
                    access_token : access_token,
                    email: email
                }
            })

        } catch (error) {
            
        }
    }
    
}


module.exports = UserController