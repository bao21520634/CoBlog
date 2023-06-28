const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserFollowBlockSchema = new Schema(
    {
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        _followerId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserFollowBlock", UserFollowBlockSchema);
