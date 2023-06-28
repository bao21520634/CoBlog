const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const BlogTagSchema = new Schema(
    {
        _blogId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        _tagId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("BlogTag", BlogTagSchema);
