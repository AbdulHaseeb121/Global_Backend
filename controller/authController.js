const { CourseResponse } = require("../helpers/helpers")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const AuthModel = require("../models/authModel")

const AuthController = {
    signUp: async (req, res) => {
        try {
            const { email, password,   firstName, lastName ,   } = req.body
            const obj = { email, password,   firstName , lastName, }
            const errArr = []
            if (!obj.email) {
                errArr.push("Email is required")
            }
            if (!obj.password) {
                errArr.push("Password is required")
            }
            if (!obj.firstName) {
                errArr.push("FirstName is required")
            }
            if (!obj.lastName) {
                errArr.push("LastName is required")
            }
           
            if (errArr.length > 0) {
                res.send(CourseResponse(false, "Validation Error", errArr))
            }

            const checkUser = await AuthModel.findOne({ email: obj.email })
            if (checkUser) {
                res.send(CourseResponse(false, "User Already Exist", null))
                return;
            }
            obj.password = await bcrypt.hash(obj.password, 10)
            const user = new AuthModel(obj)
            const result = await user.save()
            if (result) {
                res.send(CourseResponse(true, "Data Added Successfully", result))
            }

        }
        catch (error) {
            res.status(404).send(CourseResponse(false, error, null))
        }
    },
    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const obj = { email, password }
            const userExist = await AuthModel.findOne({ email: obj.email })
            if (userExist) {
                let correctPassword = await bcrypt.compare(obj.password, userExist.password)
                if (correctPassword) {
                    const token = jwt.sign({ ...userExist }, process.env.SECRET_KEY)
                    res.send(CourseResponse(true, "Data Added Successfully", { user: userExist, token: token }))
                }
            }

            else {
                res.status(404).send(CourseResponse(false, error, null))
            }
        }
        catch (error) {
            res.send(CourseResponse(false, error, null))
        }
    },
    checkAuth: (req, res) => {
        try {
            const token = req.headers.authorization.replace('Bearer ', '')
            jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
                console.log(decode._doc)
                if (err) {
                    res.status(401).send(CourseResponse(false, ' UnAuthorize ', err))
                } else {
                    res.status(200).send(CourseResponse(true, "Authorization", decode._doc))
                }
            })
        } catch (error) {
            res.status(401).send(CourseResponse(false, "Data Not Found", error))
        }
    },

    AdminProtected: async (req, res, next) => {
        try{
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token,process.env.SECRET_KEY,(err, decode) => {
                if (err) {
                    res.status(401).send(CourseResponse(false, ' UnAuthorize ', err))
                } else {
                    if (decode._doc.userType == "admin") {
                        next()
                    }else{
                        res.status(401).send(CourseResponse(false,"You Have No Rights For This Action" , err))
                    }
        
                }
            })
        }catch(error){
         res.status(400).send(CourseResponse(false, "Data Not Found", error));
        }
    },

    getUsers: async (req, res) => {
        try {
            const result = await AuthModel.find()
            if (!result) {
                res.status(404).send(CourseResponse(false, "Users Not found"))
            } else {
                res.status(200).send(CourseResponse(true, "", result))
            }
        }
        catch (error) {
            res.status(400).send(CourseResponse(false, "Internal Server Error", error));
        }
    }

}

module.exports = AuthController