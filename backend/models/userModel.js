const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

// static signup method: it returns ( user ) for us
userSchema.statics.signup = async function(email, password)  { // this must not be arrow function because we're using this keyword

    // validation (it's better to do validations, checkings, hashing and creating a user at one place so you have all the user logic together. Note that we didn't do it inside the controller )
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
        throw Error('Email is not valid')
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Please use a stronger password')
    }

    const exists = await this.findOne({email}) // this refers to our model (User)

    if (exists) {
        throw Error('Email already in use') // we dont use res to send an error because we don't have access to it (the response obj)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash}) // this refers to our model (User)

    return user

}

// static login method
userSchema.statics.login = async function(email, password) { // you can call it not only login you can name it whatever you want
  
    if(!email || !password){
        throw Error('All fields must be filled')
    }

           // no need to do the other validations, because it's already inside (static signup method) which means we don't have nonvalidated users in the db.

    const user = await this.findOne({email}) // this refers to our model (User)

    if (!user) {
        throw Error('Invalid Credentials')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Invalid Credentials')
    }

    return user
}


module.exports = mongoose.model('User', userSchema)