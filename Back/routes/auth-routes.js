const express = require("express");
const authController = require("../controllers/auth-controller");
const { body } = require("express-validator");
const authMiddleware = require("../middleware/auth-middleware");
// const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

router.post(
	"/registration",
	body("username").isLength({ min: 6, max: 16 }),
	body("email").isEmail(),
	body("password").isLength({ min: 8, max: 20 }),
	authController.registration
);
router.get("/activate/:link", authController.activate);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.get("/refresh", authController.refresh);
router.get("/users", authMiddleware, authController.getUsers);
//
//
// router.get("/users", roleMiddleware(["ADMIN"]), authController.getUsers);

module.exports = router;
