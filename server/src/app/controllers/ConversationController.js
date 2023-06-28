const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

class ConversationController {
    async index(req, res) {
        const { senderId, receiverId } = req.body;

        try {
            let conversation = await Conversation.findOne({
                members: { $all: [senderId, receiverId] },
            });

            if (!conversation) {
                conversation = new Conversation({ members: [senderId, receiverId] });

                await conversation.save();
            }

            res.status(200).json({ success: true, conversation });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async delete(req, res) {
        const { senderId, receiverId } = req.body;

        try {
            const conversation = await Conversation.findOne({
                members: { $all: [senderId, receiverId] },
            });

            if (!conversation) return res.status(404).json({ success: false, message: "Conversation not exists" });

            await Message.deleteMany({ conversationId: conversation._id });
            await Conversation.findByIdAndDelete(conversation._id);

            res.status(200).json({ success: true, message: "Conversation has been deleted" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    // Show all conversation of user
    async show(req, res) {
        try {
            const conversation = await Conversation.find({
                members: { $in: [req.params.userId] },
            });

            res.status(200).json({ success: true, conversation });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
}

module.exports = new ConversationController();
