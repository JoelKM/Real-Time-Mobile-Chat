const jwt = require('jsonwebtoken');
const { AppError } = require('./app-error');
const { fetchUserBy } = require('../user/model');

module.exports = {
    createToken: async (payload) => {
        return jwt.sign(payload, process.env.JWT_SECRET);
    },
    checkToken: async (req, res, next) => {
        try {
            const token = req.headers['authorization'].split('')[1];
            if (token == null) throw new AppError(401, "Authorization token required");
            const user = jwt.verify(token, process.env.JWT_SECRET);
            if (user == null) throw new AppError(401, "Invalid token");
            const stored = await fetchUserBy("id", user.id);
            if (user.loginTimestamp != stored.loginTimestamp) throw new AppError(403, "Expired token")
            req.user = user;
            next();
        } catch (error) {
            next(error)
        }
    }
}