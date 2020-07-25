const router = require("express").Router();
const statRoutes = require("./statRoutes");
const userRoutes = require("./userRoutes");

router.use("/statRoutes", statRoutes);
router.use("/userRoutes", userRoutes);

module.exports = router;