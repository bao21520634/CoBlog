const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        _userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        title: {
            type: String,
        },
        thumbnail: {
            type: String
        },
        content: {
            type: String,
        },
        views: {
            type: Number,
            default: 0
        },
        loves: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Blog", BlogSchema);
