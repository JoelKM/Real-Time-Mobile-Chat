const service = require('./service');
const respond = require('../common/response-format');

module.exports = {
    getChats: async (req, res, next) => {
        try {
            const userId = req.user._id;
            const chats = await fetchChats(userId);
            respond(res, true, 200, chats);
        } catch (error) {
            next(error);
        }
    },
    searchChat: async (req, res, next) => {
        try {
            const chat = service.accessChat()
            if (chat.length>0) {
                respond(res, true, 200, ...chat[0])
            } else {
                next();
            }
        } catch (error) {
            next(error);
        }
    },
    openChat: async (req, res, next) => {
        try {
            const chat = await service.create();
        } catch (error) {
            next(error)
        }
    }
    groupCreate: async (req, res, next) => {
        try {
            const chat = awair service.create();
        } catch (error) {
            next(error);
        }
    },
    groupEdit: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },
    groupAdd: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    },
    groupRemove: async (req, res, next) => {
        try {
            
        } catch (error) {
            next(error);
        }
    }
}