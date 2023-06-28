const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
        },
        avatar: {
            type: String
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        job: {
            type: String
        },
        description: {
            type: String
        },
        followerNumber: {
            type: Number,
            default: 0
        },
        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
    },
    {
        timestamps: true
    }
);

UserSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
    }

    next();
});

UserSchema.methods.comparePassword = async function (password) {
    const result = await bcrypt.compareSync(password, this.password);
    return result;
};

module.exports = mongoose.model("User", UserSchema);
