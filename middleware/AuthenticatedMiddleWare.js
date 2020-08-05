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
            return res.redirect("/login")
            
        }
    }
}