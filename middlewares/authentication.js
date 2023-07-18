const { verivyToken } = require("../helpers/jwt");
const { User } = require('../models')


const authentication = async (req, res, next) => {
    try {
        const {access_token} = req.headers;


        console.log(access_token, 'isi dari access_token didalam authentication<<>>');
        if(!access_token){
            throw {name: "unauthenticated"}
        }
    
        const payload = verivyToken(access_token)


        let user = {}
        user = await User.findOne({where : {id: payload.id}})
        
    
        if(!user){
            throw {name: "unauthenticated"}
        }

    
        req.additionalData = {
            userId: user.id,
            email: user.email,
            role: user.role
        }


        next()
    } catch (error) {
        console.log('masuk error disini nih')
        next(error)
    }

}

module.exports = authentication


