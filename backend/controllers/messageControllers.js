const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
  try {
    var messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      const chat1 = await Chat.findById(req.params.chatId).populate("users", "-password");
      const modifiedMessages = await Promise.all(
        messages.map(async (message) => {
          return {
            sender: message.sender,
            _id: message._id,
            content: message.content,
            chat: chat1,
          };
        })
      );
  
      res.json(modifiedMessages);

  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.sendStatus(400);
  }
  var chat1 = await Chat.findById(chatId).populate('users','-password');
  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender", "name pic");
    message = await User.populate(message, {
      path: "chat.users",
      select: "name pic email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });
    const modifiedMessage ={
        sender:message.sender,
        _id:message._id,
        content:message.content,
        chat:chat1,
    }
    res.json(modifiedMessage);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { allMessages, sendMessage };