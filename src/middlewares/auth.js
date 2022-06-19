const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]

    if(!token){
        return res.send({
            message: 'Access denied!'
        })
    }

    try {
        const verified = jwt.verify(token, 'IniPrivateKeyBatch35')
        req. user = verified
        next()

    } catch (error) {
        res.send({
            message: 'Invalid Token'
        })
    }
}