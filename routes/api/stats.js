const router = require("express").Router();
const statsController = require("../../controllers/statsController");

router.route("/").post(statsController.create);
  
  //.get(statsController.findAll)
  
  

// router
//   .route("/:id")
//   .get(statsController.findById)

module.exports = router;