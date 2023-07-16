const AppError = require("../common/app-error");
const Chat = require("./model");

module.exports = {
    fetchChats: async (userId) => {
       const chats = await Chat.find({ users: { $elemMatch: { $eq: userId } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });
        if (chats.length<1) {
            throw new AppError(404, "No chats found")
        }
    },
    accessChat: async (members) => {
        let chats = await Chat.find({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: members[0] } } },
                { users: { $elemMatch: { $eq: members[1] } } }
            ]})
            .populate("users", "-password")
            .populate("latestMessage");
        chat = await User.populate(chat, {
            path: "latestMessage.sender",
            select: "name pic email",
            });
        return chat;        
    },
    create: async () => {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [members, userId],
          };
        Chats.create({ })
    },
    update: async () => {

    },
    manageMember: async () => {

    }
}