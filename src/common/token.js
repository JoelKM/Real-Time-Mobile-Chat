const jwt = require('jsonwebtoken');
const { fetchUserBy } = require('../user/model');
const { AppError } = require('../../../allwell-aut/server/src/config/app-error');

module.exports = {
    createToken: async (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET);
    },
    checkToken: async (req, res, next) => {
        try {
            const token = req.headers['authorization'].split('')[1];
            if (token == null) throw new AppError(401, "Invalid token")
            const stored = await fetchUserBy()
        } catch (error) {
            next(error)
        }
    }
}