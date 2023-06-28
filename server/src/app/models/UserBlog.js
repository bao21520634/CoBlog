const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserBlogSchema = new Schema(
    {
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        _blogId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: Number,
            default: 0
        },
        isLoved: {
            type: Boolean,
            default: false
        },
        isSaved: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("UserBlog", UserBlogSchema);
