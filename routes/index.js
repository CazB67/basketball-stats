const path = require("path");
const router = require("express").Router();
const auth = require('./api/auth/auth');
const user = require('./api/userRoutes');
const stat = require('./api/statRoutes');
const AuthenticatedMiddleware = require("../middleware/AuthenticatedMiddleWare");

// API Routes
router.use(auth);
router.use(AuthenticatedMiddleware)
router.use(user);
router.use(stat);

module.exports = router;