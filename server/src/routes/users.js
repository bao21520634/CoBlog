const express = require("express");
const router = express.Router();
const auth = require("../app/middlewares/AuthMiddleware");

const userController = require("../app/controllers/UserController");
const userFollowBlock = require("../app/controllers/UserFollowBlockController");

router.post("/", auth, userController.index);
router.post("/signin", userController.signin);
router.post("/signup", userController.signup);
router.post("/verify-email", auth, userController.verifyEmail);
router.post("/sendmail-forgot-password", userController.sendMailForForgotPassword);
router.post("/forgot-password", auth, userController.forgotPassword);
router.post("/change-password", auth, userController.changePassword);
router.post("/get-profile", auth, userController.getProfile);
router.post("/update-profile", auth, userController.updateProfile);
router.post("/delete-account", auth, userController.deleteAccount);
router.post("/search-author", auth, userController.searchAuthor);

router.post("/follow-user", auth, userFollowBlock.followUser);
router.post("/unfollow-user", auth, userFollowBlock.unfollowUser);
router.post("/block-user", auth, userFollowBlock.blockUser);
router.post("/unblock-user", auth, userFollowBlock.unblockUser);

module.exports = router;
