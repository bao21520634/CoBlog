const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const OTPTokenSchema = new Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: 3600,
        default: Date.now(),
    },
});

OTPTokenSchema.pre("save", async function (next) {
    if (this.isModified("token")) {
        const hashedToken = await bcrypt.hash(this.token, 12);
        this.token = hashedToken;
    }

    next();
});

OTPTokenSchema.methods.compareToken = async function (token) {
    const result = await bcrypt.compareSync(token, this.token);
    return result;
};

module.exports = mongoose.model("OTPToken", OTPTokenSchema);
