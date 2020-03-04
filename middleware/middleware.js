module.exports = {
    isInstructor: function (req, res, next) {
        if(req.decodedToken.role === 'instructor'){
            next()
        } else {
            res.status(401).json({ message: "UNAUTHORIZED"})
        }
    },

    noDuplicate: function (req, res, next) {
        if(req.body.class_id){
            next()
        } else {
            res.status(400).json({ message: "class has already been added"})
        }
    }
}