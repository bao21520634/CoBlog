const express = require("express");
const router = express.Router();

const conversationController = require("../app/controllers/ConversationController");

router.post("/", conversationController.index);
router.post("/delete", conversationController.delete);
router.get("/:userId", conversationController.show);

module.exports = router;
