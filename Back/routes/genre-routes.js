const express = require("express");
const genreController = require("../controllers/genre-controller");
const authMiddleware = require("../middleware/auth-middleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const router = express.Router();

// router.get("", genreController.getGenres);
// router.post("", genreController.addGenre);
// router.delete("/:value", genreController.deleteGenre);
// router.patch("", genreController.updateGenre);

router.get("", authMiddleware, genreController.getGenres);
router.post("", authMiddleware, roleMiddleware(["ADMIN"]), genreController.addGenre);
router.delete("/:value", authMiddleware, roleMiddleware(["ADMIN"]), genreController.deleteGenre);
router.patch("/:value", authMiddleware, roleMiddleware(["ADMIN"]), genreController.updateGenre);

module.exports = router;
