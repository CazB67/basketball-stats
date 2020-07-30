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
      data.courtTime="2.0"
      data.user_id = req.user._id;
      db.Stat
        .create(data)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
   