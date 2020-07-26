const router = require("express").Router();

const statsController = require("../../controllers/statsController");

router.route("/api/stats")
  .get(statsController.findAll)
  .post(statsController.create);

module.exports = router;