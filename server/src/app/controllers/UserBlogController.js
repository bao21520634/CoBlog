const UserBlog = require("../models/UserBlog");
const Blog = require("../models/Blog");

const BLOCK = -1;

class UserBlogController {

    async loveBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        const existingUserBlog = await UserBlog.findOne({ _userId: userId, _blogId: blogId });

        if (!existingUserBlog) {
            const userBlog = new UserBlog({ _userId: userId, _blogId: blogId, isLoved: true });

            await userBlog.save();
        } else {
            await UserBlog.findOneAndUpdate(
                {
                    _userId: userId, _blogId: blogId
                },
                {
                    isLoved: true
                },
                { new: true }
            );
        }

        const loveNumber = await UserBlog.find({ _blogId: blogId, isLoved: true }).count();

        await Blog.findByIdAndUpdate(
            blogId,
            {
                loves: loveNumber
            },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Loved" });
    }

    async unloveBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        await UserBlog.findOneAndUpdate({ _userId: userId, _blogId: blogId }, { isLoved: false });

        const loveNumber = await UserBlog.find({ _blogId: blogId, isLoved: true }).count();

        await Blog.findByIdAndUpdate(
            blogId,
            {
                loves: loveNumber
            },
            { new: true }
        );

        res.status(200).json({ success: true, message: "Unloved" });
    }

    async saveBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        const existingUserBlog = await UserBlog.findOne({ _userId: userId, _blogId: blogId });

        if (!existingUserBlog) {
            const userBlog = new UserBlog({ _userId: userId, _blogId: blogId, isSaved: true });

            await userBlog.save();
        } else {
            await UserBlog.findOneAndUpdate(
                {
                    _userId: userId, _blogId: blogId
                },
                {
                    isSaved: true
                },
                { new: true }
            );
        }

        res.status(200).json({ success: true, message: "Saved" });
    }

    async unsaveBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        await UserBlog.findOneAndUpdate({ _userId: userId, _blogId: blogId }, { isSaved: false }, { new: true });

        res.status(200).json({ success: true, message: "Unsaved" });
    }

    async blockBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        const existingUserBlog = await UserBlog.findOne({ _userId: userId, _blogId: blogId });

        if (!existingUserBlog) {
            const userBlog = new UserBlog({ _userId: userId, _blogId: blogId, status: BLOCK });

            await userBlog.save();
        } else {
            await UserBlog.findOneAndUpdate(
                { _userId: userId, _blogId: blogId },
                { status: BLOCK, isLoved: false, isSaved: false }
            );

            const loveNumber = await UserBlog.find({ _blogId: blogId, isLoved: true }).count();

            Blog.findByIdAndUpdate(
                blogId,
                {
                    loves: loveNumber
                },
                { new: true }
            );
        }

        res.status(200).json({ success: true, message: "Block" });
    }

    async unblockBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        await UserBlog.findOneAndUpdate({ _userId: userId, _blogId: blogId }, { status: 0 });

        res.status(200).json({ success: true, message: "Unblock" });
    }
}

module.exports = new UserBlogController();