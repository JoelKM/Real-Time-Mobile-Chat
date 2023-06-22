const AppError = require("../common/app-error");
const Chat = require("./model");

module.exports = {
    fetchChats,
    accessChat,
    create,
    update,
    manageMember,
}