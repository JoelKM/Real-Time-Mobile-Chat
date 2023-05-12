const AppError = require("../common/app-error");
const { newUser, fetchUserBy, update } = require("./model");
const { encryptPassword, checkPassword } = require('./helpers/encrypt');
const { createToken } = require("../common/token");

module.exports = {
    registerUser: async (data) => {
        data.password = await encryptPassword(data.password)
        if(!data.password) throw new AppError(400, "Error encrypting password");
        const user = await newUser(data);
        if(!user) throw new AppError(400, "User was not created");
        return user
    },
    loginUser: async (credentials) => {
        const user = await fetchUserBy("email", credentials.email);
        if(!await checkPassword(credentials.password, user.password)) {
            throw new AppError(403, "Incorrect password")
        }

        credentials = await update(user.id, {loginTimestamp: Date.now()})
        if(user == credentials) {
            throw new AppError(400, "Unexpected login error, please try again")
        }
        
        return createToken(credentials);
    },
    retrieveUser: async (userId) => {
        return await fetchUserBy("id", userId)
    },
}