const AppError = require("../common/app-error");
const User = require("./model");
const { createToken } = require("../common/token");

module.exports = {
    registerUser: async (data) => {
        data.password = await encryptPassword(data.password)
        if(!data.password) throw new AppError(400, "Error encrypting password");
        const userInfo = await newUser(data);
        if(!userInfo) throw new AppError(400, "User was not created");
        return {userInfo}
    },
    authUser: async (credentials) => {
        const email = credentials.email;
        
        const user = await User.findOne({ email });
        if(user && await user.matchesPassword(credentials.password)) {
            throw new AppError(403, "Invalid email or password")
        }

        credentials = await User.findOneAndUpdate({ user.email }, {loginTimestamp: Date.now()})
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