module.exports = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }
    
    else
    {
        if(req.headers.referer.includes("share")) {
            next()
        }
        else {
            console.log(req);
            res.status(401).json({
                errors: [{
                    msg: "Please log in."
                }]
            })
        }
    }
}