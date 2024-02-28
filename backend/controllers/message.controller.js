import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        // req.params.id -> /send/:id -> id ki value mill jayegi
        const { id: receiverId } = req.params;

        // routes verify karne time hmne req me user ka data dal diya tha
        // whi se userId hum nikal rahe hai
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participatants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participatants: [senderId, receiverId],
            });
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            conversation.message.push(newMessage._id);
        }

        // TODO: Socket Io functionallity will go here

        // await conversation.save();
        // await newMessage.save();

        // dono saath me run karega
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(200).json(newMessage);
    } catch (error) {
        console.log("Error in Sending message", error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participatants: { $all: [senderId, userToChatId] },
        }).populate("message");

        if (!conversation) {
            return res.status(200).json([]);
        }

        res.status(200).json(conversation.message);
    } catch (error) {
        console.log("Error in getting messages", error.message);
        res.status(500).json({ error: error.message });
    }
};
