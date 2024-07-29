const { Signup } = require("../Controllers/authController");
const router = require("express").Router();

router.post("/signup", Signup);

module.exports = router;