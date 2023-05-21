const service = require('./service');
const respond = require('../common/response-format');

module.exports = {
    new: async (req, res, next) => {
        try {
            const user = req.body;
            const data = await service.registerUser(user);
            respond(res, true, 201, {...data})
        } catch (error) {
            next(error);
        }
    },
    login : async (req, res, next) => {
        try {
            const credentials = req.body;
            const data = await service.authUser(credentials);
            respond(res, true, 200, {...data})
        } catch (error) {
            next(error)
        }
    },
    resetPassword: async (req, res, next) => {
        //TO DO
    },
    updatePassword: async (req, res, next) => {
        //TO DO
    },
    getSingle: async (req, res, next) => {
        try {
            const userId = req.params.id;
            const data = await service.getUser(userId);
            respond(res, true, 200, {...data})
        } catch (error) {
            next(error);
        }
    },
    logout: async (req, res, next) => {
        try {
            //TO DO
        } catch (error) {
            next(error)
        }
    }
}