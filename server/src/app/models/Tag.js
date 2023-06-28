const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TagSchema = new Schema(
    {
        name: {
            type: String,
        },
        followerNumber: {
            type: Number,
            default: 0
        },
        views: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    });

module.exports = mongoose.model("Tag", TagSchema);
