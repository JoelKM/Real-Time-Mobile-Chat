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
    createChat: async (users, name) => {
        let chatData;
        if(name) {
            chatData = {
                chatName: name,
                isGroupChat: true,
                users: users,
                groupAdmin: users[users.length-1]
              };
        } else {
            chatData = {
                chatName: "sender",
                isGroupChat: true,
                users: users,
                groupAdmin: users[users.length-1]
              };
        }
        
        return await Chat.create(chatData);
    },
    update: async (groupId, name) => {

        const updated = await Chat.findByIdAndUpdate(groupId, {name}, {new: true})
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        if(!updated) {
            throw new AppError(400, "The group chatt was not updated");
        }
    },
    manageMember: async (groupId, userId, option) => {
        const userExists = await Chat.find({
            _id: groupId,
            users: { $elemMatch: { $eq: userId }}
        })

        if (option = "remove" && userExists) {
            const removed = await Chat.findByIdAndUpdate(
                chatId,
                {
                  $pull: { users: userId },
                },
                {
                  new: true,
                })
                .populate("users", "-password")
                .populate("groupAdmin", "-password");

            if (!removed) {
                throw new AppError(400, "Something went wrong");
            }

            return removed;
        }

        if (option = "add" && !userExists) {
            const added = await Chat.findByIdAndUpdate(
                chatId,
                {
                  $push: { users: userId },
                },
                {
                  new: true,
                }
              )
                .populate("users", "-password")
                .populate("groupAdmin", "-password");

            if (!added) {
                throw new AppError(400, "Something went wrong")
            }
            return added
        }
        
        throw new AppError(400, "Invalid option for this user");
    }
}