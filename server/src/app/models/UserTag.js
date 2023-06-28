const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserTagSchema = new Schema(
    {
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        _tagId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        interactions: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserTag", UserTagSchema);
