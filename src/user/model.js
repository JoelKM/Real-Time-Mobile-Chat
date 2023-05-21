const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: true },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      }
    },
    { timestaps: true }
);

userSchema.methods.matchesPassword = async (storedPassword) => {
    return await bcrypt.compare(storedPassword, this.password);
};


  
userSchema.pre("save", async (next) => {
    if (!this.isModified) {
        next();
    }

    this.password = await bcrypt.hash(password, 10);
});

const User = mongoose.model('user', usersSchema);

module.exports = User;