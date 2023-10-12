const express = require("express");
const postController = require("../controllers/post-controller");
const authMiddleware = require("../middleware/auth-middleware");
const multer = require("multer");

const router = express.Router();

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
		const __projectDest = __dirname.slice(0, __dirname.indexOf("Back") + "Back".length);
		callback(null, __projectDest + "\\uploads");
	},
	filename: function (req, file, callback) {
		const fileFormat = file.originalname.slice(file.originalname.lastIndexOf("."));
		// const filename = `file_${req.user.username}_${crypto.randomUUID()}${fileFormat}`;
		const filename = `file_${req.user.username}_${file.originalname}`;
		callback(null, filename);
	},
});

const uploadImg = multer({
	storage: storage,
	limits: {
		fileSize: 10485760, // 10 MB
	},
});

upload = multer({ storage: multer.memoryStorage() });

// uploadImg.any(),

router.get("/", authMiddleware, postController.getPosts);
router.get("/:id", postController.getPost);
router.post("/", authMiddleware, uploadImg.single("image"), postController.addPost);
router.get("/like/:id", authMiddleware, postController.likePost);
router.get("/dislike/:id", authMiddleware, postController.dislikePost);
router.get("/favorite/:id", authMiddleware, postController.setPostFavorite);

router.delete("/:id", postController.deletePost);
router.patch("/:id", postController.updatePost);

module.exports = router;
