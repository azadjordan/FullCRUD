const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    // verify authentication
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    const token = authorization.split(" ")[1] // we get the token from the authorization header

    // verify the token
    try {
        const {_id} = jwt.verify(token, process.env.SECRET) // check if they are authenticated and grab the id from the token
                // if they are not authenticated here an error will be sent
        req.user = await User.findOne({ _id }).select('_id') // after they are authenticated, the req object will have _id property on it. (btw we can name it req.abc not just req.user)
        next()

    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}


module.exports = requireAuth