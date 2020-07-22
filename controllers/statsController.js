const db = require("../models");

module.exports = {
    findAll: function(req, res) {
      db.Stat
        .find(req.query)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    create: function(req, res) {
      console.log(req.body);
      const data = new db.Stat(req.body)
      data.setFinalScore();
      db.Stat
        .create(data)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
   