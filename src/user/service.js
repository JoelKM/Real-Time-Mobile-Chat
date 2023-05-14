const AppError = require("../common/app-error");
const { newUser, fetchUserBy, update } = require("./model");
const { encryptPassword, checkPassword } = require('./helpers/encrypt');
const { createToken } = require("../common/token");

module.exports = {
    registerUser: async (data) => {
        data.password = await encryptPassword(data.password)
        if(!data.password) throw new AppError(400, "Error encrypting password");
        const userInfo = await newUser(data);
        if(!userInfo) throw new AppError(400, "User was not created");
        return {userInfo}
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
        const token = await createToken(credentials);
        const userInfo = credentials;
        return {userInfo, token};
    },
    retrieveUser: async (userId) => {
        const userInfo = await fetchUserBy("id", userId);
        return {userInfo}
    },
}