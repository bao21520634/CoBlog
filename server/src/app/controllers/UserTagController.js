const UserTag = require("../models/UserTag");
const Tag = require("../models/Tag");

class UserTagController {

    async followTag(req, res) {
        const { tagId } = req.body;
        const userId = req.userId;

        const existingFollowedTag = await UserTag.findOne({ _userId: userId, _tagId: tagId });

        if (!existingFollowedTag) {
            const userTag = new UserTag({ _userId: userId, _tagId: tagId });

            await userTag.save();

            const followerNumber = await UserTag.find({ _tagId: tagId }).count();

            const tag = await Tag.findByIdAndUpdate(
                tagId,
                { followerNumber },
                { new: true }
            );

            res.status(200).json({ success: true, message: "Following", tag });
        } else {
            res.status(200).json({ success: true, message: "This tag is already followed" });
        }
    }

    async unfollowTag(req, res) {
        const { tagId } = req.body;
        const userId = req.userId;

        await UserTag.findOneAndDelete({ _userId: userId, _tagId: tagId });

        const followerNumber = await UserTag.find({ _tagId: tagId }).count();

        const tag = await Tag.findByIdAndUpdate(
            tagId,
            { followerNumber },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Unfollowed", tag });
    }

    async interestedTag(req, res) {
        const { tagId } = req.body;
        const userId = req.userId;

        const tag = await UserTag.findOneAndUpdate(
            { _userId: userId, _tagId: tagId },
            {
                $inc: { 'interactions': 1 }
            }
            , { new: true }
        );

        res.status(200).json({ success: true, message: "Viewed", tag });
    }
}

module.exports = new UserTagController();