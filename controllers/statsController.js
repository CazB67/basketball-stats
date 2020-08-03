const db = require("../models");

module.exports = {
    findAll: function(req, res) {
      db.Stat
        .find({user_id: req.user._id})
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      const data = new db.Stat(req.body)
      console.log(req.body);
      data.setFinalScore();
      data.setTotalPoints();
      data.setTotalRebounds();
      data.user_id = req.user._id;
      db.Stat
        .create(data)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      console.log(req);
      db.Stat
        .findById({ _id: req.params.id })
        .then(dbModel => dbModel.remove())
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
   