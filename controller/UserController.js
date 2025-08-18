const UserModel = require('../model/User')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')


class UserController {
    static register = async (req, res) => {
        try {
            // console.log(req.body)
            const { name, email, password } = req.body
            const existinguser = await UserModel.findOne({ email });
            if (existinguser) {
                return res.status(400).json({ message: "email already exists" });
            }

            const hashPassword = await bcrypt.hash(password, 10)
            const data = await UserModel.create({
                name,
                email,
                password: hashPassword
            })
            res.json({
                data,
                msg: "user insert success"
            })
        } catch (error) {
            console.log(error)
        }
    }
    static login = async (req, res) => {
        try {
            // console.log(req.body)
            const { email, password } = req.body
            const user = await UserModel.findOne({ email })
            console.log(user)
            if (!user) {
                return res.status(400).json({ message: "Invalid Credentials" })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid Credentials" })
            }
            // token creation
            const token = jwt.sign({ ID: user._id }, 'kuchbhi@91')
            // console.log(token)

            // send token in HTTP only cookie
            res.cookie("token",token,{
                httpOnly:true,
            })
            res
                .status(200)
                .json({
                    message: "Login Successful",
                    role:user.role,
                    name:user.name,
                    email:user.email,
                })
        } catch (error) {
            console.log(error)
        }
    }
    static profile = async(req,res)=>{
        try{
            console.log("hello profile")
        }
        catch(error){
            console.log(error)
        }
    }
    static logout = async(req,res)=>{
        try{
            res.clearCookie("token")
            res.status(200).json({message:"logout successfully"})
        }
        catch(error){
            console.log(error)
        }
    }
}

module.exports = UserController