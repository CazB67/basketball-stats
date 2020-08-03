const router = require("express").Router();

const statsController = require("../../controllers/statsController");

router.route("/api/stats")
  .get(statsController.findAll)
  .post(statsController.create);

router.route("/api/stats/:id")
.delete(statsController.remove);

module.exports = router;