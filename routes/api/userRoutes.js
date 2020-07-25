// I dont reckon this is used

const router = require("express").Router();
const userController = require("../../controllers/userController");

router.route("/users")
  .get(userController.find)
  .post(userController.create);
  
router.route("/users/:id")
  .get(userController.findById)
  .put(userController.findByIdAndUpdate)
  .delete(userController.delete)

router.route("/current-user")
.get(userController.findCurrentUser)
module.exports = router;