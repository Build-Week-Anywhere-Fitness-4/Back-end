module.exports = {
    isInstructor: function (req, res, next) {
        if(req.decodedToken.role === 'instructor'){
            next()
        } else {
            res.status(401).json({ message: "UNAUTHORIZED"})
        }
    }
}