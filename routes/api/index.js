const router = require("express").Router();
const statRoutes = require("./stats");
const userRoutes = require("./users");

router.use("/stats", statRoutes);
router.use("/users", userRoutes);

module.exports = router;