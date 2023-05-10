const service = require('./service');

module.exports = {
    new: async (req, res, next) => {
        try {
            let user = req.body;
            //TO DO: LOGIC AND RES
        } catch (error) {
            next(error);
        }
    },
    login : async (req, res, next) => {
        try {
            const credentials = req.body;
            const data = await loginUser(credentials);
            //TO DO: RES
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
            const user = await service.retrieveUser(userId);
            //TO DO: RES
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