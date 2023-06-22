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
            req.members = [req.user._id, req.body.userId];
            const chat = service.accessChat(req.members);

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
            const chat = await service.create(req.members);

            respond(res, true, 201, ...chat);
        } catch (error) {
            next(error)
        }
    },
    groupCreate: async (req, res, next) => {
        try {
            const {name, users} = req.body;
            const chat = await service.create(users, name);

            respond(res, true, 201, ...chat);
        } catch (error) {
            next(error);
        }
    },
    groupEdit: async (req, res, next) => {
        try {
            const {name} = req.body;
            const results = service.update(name);

            respond(res, true, 200, ...results)
        } catch (error) {
            next(error);
        }
    },
    groupAdd: async (req, res, next) => {
        try {
            const { memberId } = req.body;
            const member = service.manageMember("add", memberId);

            respond(res, true, 200, ...member)
        } catch (error) {
            next(error);
        }
    },
    groupRemove: async (req, res, next) => {
        try {
            const { memberId } = req.body;
            const member = service.manageMember("remove", memberId);
            
            respond(res, true, 200, ...member)
        } catch (error) {
            next(error);
        }
    }
}