const express = require("express");
const router = express.Router();

const auth = require("../app/middlewares/AuthMiddleware");

const tagController = require("../app/controllers/TagController");
const userTagController = require("../app/controllers/UserTagController");

router.post("/search-tag", auth, tagController.searchTag);
router.post("/create-tag", auth, tagController.createTag);
router.post("/user-tag", auth, tagController.userTag);
router.post("/blog-tag", tagController.blogTag);
router.post("/follow-tag", auth, userTagController.followTag);
router.post("/unfollow-tag", auth, userTagController.unfollowTag);
router.post("/interested-tag", auth, userTagController.interestedTag);

module.exports = router;
