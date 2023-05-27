const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true }
    },
    { timestaps: true }
);
/*
userSchema.methods.encryptPassword = async function () {
    console.log(this);
    return this.model('user').findById(this.id);

    user.password = await bcrypt.hash(user.password, 10);
    return await this.model('user').findByIdandUpdate(user._id, {password: user.password})
};
*/
userSchema.methods.matchesPassword = async function (sentPassword) {
    return await bcrypt.compare(sentPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model('user', userSchema);

module.exports = User;