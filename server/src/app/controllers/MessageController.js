const Message = require("../models/Message");

class MessageController {
    async index(req, res) {
        const conversationId = req.params.conversationId;

        if (!conversationId)
            return res.status(400).json({ success: false, message: "Invalid request, missing params" });

        // Find all messages in the conversation
        if (req.method === "GET") {
            try {
                const messages = await Message.find({ _conversationId: conversationId });

                await Message.updateMany({ _conversationId: conversationId }, { isRead: true });

                res.status(200).json({ success: true, messages });
            } catch (error) {
                res.status(500).json({ success: false, message: "Something went wrong" });
            }
        }

        // Create new message when sender text
        else if (req.method === "POST") {
            const { sender, text } = req.body;

            try {
                if (!sender || !text)
                    return res.status(400).json({ success: false, message: "Invalid request, missing params" });

                const newMessage = new Message({ _conversationId: conversationId, sender, text });

                await newMessage.save();

                res.status(200).json({ success: true, newMessage });
            } catch (error) {
                res.status(500).json({ success: false, message: "Something went wrong" });
            }
        } else if (req.method === "DELETE") {
            const { messageId } = req.body;

            try {
                await Message.findByIdAndDelete(messageId);

                res.status(200).json({ success: true, message: "Message has been deleted" });
            } catch (error) {
                res.status(500).json({ success: false, message: "Something went wrong" });
            }
        }
    }
}

module.exports = new MessageController();
