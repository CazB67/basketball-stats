module.exports = (req, res, next) => {
   console.log("++++++"+req.body);
    if(req.isAuthenticated()){
        next()
    }else{
        res.status(401).json({
            errors: [{
                msg: "Please log in."
            }]
        })

    }
}