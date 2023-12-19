const mongoose = require('mongoose');
const AuthScheema = mongoose.Schema({
    email: {
        type: String,
        require: (true , "Email must  required")
    },
    password: {
        type: String,
        require: (true  , "Password must  required")
    },
   
    userType:{
        type : String,
        enum: ["admin", "user"],
    },
    firstName:{
        type:String,
        require: (true , "FirstName must  required")

    },
    lastName:{
        type:String,
        require: (true , "LastName must  required")
    },




})

const AuthModel = mongoose.model('/users', AuthScheema)

module.exports = AuthModel