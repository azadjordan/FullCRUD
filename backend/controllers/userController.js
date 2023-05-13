const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => { // we're gonna use it in both controllers (loginUser and signupUser) // _id is going to be part of the payload of the jwt
    return jwt.sign({_id: _id}, process.env.SECRET, {expiresIn: '3d'})    
}

// we created signup user first!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! if you want to relearn 

// login user
const loginUser = async(req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.login(email, password)

        //create a token
        const token = createToken(user._id)

        res.status(200).json({email, token}) 

    } catch (error) { // here we catch the error from static signup method
       
        res.status(400).json({error: error.message}) // also the errors from mongoose if there was any
    }
}

// signup user
const signupUser = async(req,res) => {
    const {email, password} = req.body

    try {
        const user = await User.signup(email, password)

        //create a token
        const token = createToken(user._id)

      // BEFORE jwt >>>  res.status(200).json({email, user}) // here we send the new doc that's created in mongodb
      // After jwt: (we pass the token not the user)
      res.status(200).json({email, token}) // (headers, payload and secret) all 3 strings are encoded in token

    } catch (error) { // here we catch the error from static signup method
       
        res.status(400).json({error: error.message}) // also the errors from mongoose if there was any
    }

}

module.exports = {signupUser, loginUser}