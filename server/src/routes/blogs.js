const express = require("express");
const router = express.Router();

const auth = require("../app/middlewares/AuthMiddleware");

const blogController = require("../app/controllers/BlogController");
const userBlogController = require("../app/controllers/UserBlogController");

router.post("/get-blog", auth, blogController.getBlog);
router.post("/search-blog", auth, blogController.searchBlog);
router.post("/create-blog", auth, blogController.createBlog);
router.post("/update-blog", auth, blogController.updateBlog);
router.post("/delete-blog", auth, blogController.deleteBlog);
router.post("/list-blog", auth, blogController.listBlog);
router.post("/list-suggested-blog", auth, blogController.listSuggestedBlog);
router.post("/get-user-blog", auth, blogController.getUserBlog);
router.post("/get-author-blog", auth, blogController.getAuthorBlog);
router.post("/get-loved-blog", auth, blogController.getLovedBlog);
router.post("/get-saved-blog", auth, blogController.getSavedBlog);
router.post("/get-seen-blog", auth, blogController.getSeenBlog);
router.post("/view-blog", blogController.viewBlog);

router.post("/love-blog", auth, userBlogController.loveBlog);
router.post("/unlove-blog", auth, userBlogController.unloveBlog);
router.post("/save-blog", auth, userBlogController.saveBlog);
router.post("/unsave-blog", auth, userBlogController.unsaveBlog);
router.post("/block-blog", auth, userBlogController.blockBlog);
router.post("/unblock-blog", auth, userBlogController.unblockBlog);

module.exports = router;
