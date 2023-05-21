const AppError = require("../common/app-error");
const User = require("./model");
const { createToken } = require("../common/token");

module.exports = {
    registerUser: async (data) => {
        const userInfo = await User.create({ ...data });
        if(!userInfo) throw new AppError(400, "User was not created");
        return {
            user: {
                name: userInfo.email,
                email: userInfo.email,
                isAdmin: userInfo.isAdmin
            }
        }
    },
    authUser: async (credentials) => {
        const user = await User.findOne({ email });
        if(user && await user.matchesPassword(credentials.password)) {
            throw new AppError(403, "Invalid email or password")
        }

        const userInfo = await User.findOneAndUpdate({ email: user.email }, {loginTimestamp: Date.now()}, {returnDocument: 'after'})
        if(user == userInfo) {
            throw new AppError(400, "Unexpected login error, please try again")
        }

        return {
            user: {
                name: userInfo.email,
                email: userInfo.email,
                isAdmin: userInfo.isAdmin
            },
            token: await createToken({
                name: userInfo.email,
                email: userInfo.email,
                isAdmin: userInfo.isAdmin
            })
        };
    },
    getUser: async (userId) => {
        const userInfo = await User.findById(userId);
        return {userInfo};
    },
}