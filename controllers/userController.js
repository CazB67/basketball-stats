const db = require("../models");

module.exports = {
    find: function(req, res) {
      db.User
        .find({})
        .then((results) => {
            res.json({
            data: results,
        })
        })
        },
    create: function(req, res) {
        db.User
        .create(req.body)
            },

    findById: function(req, res) {
        db.User
          .findById(req.params.id)
          .then((result) => {
              res.json({
              data: result
            })
        })
        },
        findByIdAndUpdate: function(req, res) {
            db.User
            findByIdAndUpdate(req.params.id, 
                {
                    $push: {
                        email: req.body.email,
                        name: req.body.name,
                        password: req.body.password,
                    },
                },
                { new: true, runValidators: true }
            ).then((updated) => {
                res.json({
                    data: updated,
                });
            });
            
        
        },
        delete: function(req, res) {
            db.User
            findByIdAndDelete(req.params.id).then((deleted) => {
                res.json({
                    data: true
                })
            })
        },

        findCurrentUser: function(req, res) {
            console.log("----" + req.user);
            return res.json({
                data: req.user,
            });
        
        }
};