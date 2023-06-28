const UserFollowBlock = require("../models/UserFollowBlock");
const User = require("../models/User");

const BLOCK = -1;
const FOLLOW = 1;

class UserFollowBlockController {

    async followUser(req, res) {
        const { followerId } = req.body;
        const userId = req.userId;

        const isFollowedFollower = await UserFollowBlock.findOne({ _userId: userId, _followerId: followerId });

        if (!isFollowedFollower) {
            const userFollower = new UserFollowBlock({ _userId: userId, _followerId: followerId, status: FOLLOW });

            await userFollower.save();

            const followerNumber = await UserFollowBlock.find({ _followerId: followerId, status: FOLLOW }).count();

            await User.findByIdAndUpdate(
                followerId,
                { followerNumber },
                { new: true }
            );

            res.status(200).json({ success: true, message: "Following" });
        } else {
            res.status(500).json({ success: true, message: "This user is already followed" });
        }
    }

    async unfollowUser(req, res) {
        const { followerId } = req.body;
        const userId = req.userId;

        await UserFollowBlock.findOneAndDelete({ _userId: userId, _followerId: followerId });

        const followerNumber = await UserFollowBlock.find({ _followerId: followerId, status: FOLLOW }).count();

        await User.findByIdAndUpdate(
            followerId,
            { followerNumber },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Unfollowed" });
    }

    async blockUser(req, res) {
        const { followerId } = req.body;
        const userId = req.userId;

        const existingFollowedFollower = await UserFollowBlock.findOne({ _userId: userId, _followerId: followerId });

        if (!existingFollowedFollower) {
            const userFollower = new UserFollowBlock({ _userId: userId, _followerId: followerId, status: BLOCK });

            await userFollower.save();
        } else {
            await UserFollowBlock.findOneAndUpdate({ _userId: userId, _followerId: followerId }, { status: BLOCK });
        }

        const followerNumber = await UserFollowBlock.find({ _followerId: followerId, status: FOLLOW }).count();

        await User.findByIdAndUpdate(
            followerId,
            { followerNumber },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Blocked" });
    }

    async unblockUser(req, res) {
        const { followerId } = req.body;
        const userId = req.userId;

        await UserFollowBlock.findOneAndDelete({ _userId: userId, _followerId: followerId });

        res.status(200).json({ success: true, message: "Unblock" });
    }
}

module.exports = new UserFollowBlockController();