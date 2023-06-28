const express = require("express");
const router = express.Router();

const messageController = require("../app/controllers/MessageController");

router.use("/:conversationId", messageController.index);

module.exports = router;
