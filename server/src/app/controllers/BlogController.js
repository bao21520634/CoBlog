const Blog = require("../models/Blog");
const BlogTag = require("../models/BlogTag");
const User = require("../models/User");
const Tag = require("../models/Tag");
const UserBlog = require("../models/UserBlog");
const UserTag = require("../models/UserTag");
const UserFollowBlock = require("../models/UserFollowBlock");

class BlogController {

    async getBlog(req, res) {
        const { blogId } = req.body;

        try {
            let blog = await Blog.findById(blogId);

            if (!blog) return res.status(400).json({ success: false, message: "Zero blog" });

            const userBlog = await UserBlog.findOne({ _blogId: blog._id, _userId: req.userId });

            const isLoved = userBlog?.isLoved ? userBlog.isLoved : false;
            const isSaved = userBlog?.isSaved ? userBlog.isSaved : false;
            const status = userBlog?.status ? userBlog.status : 0;
            blog = { ...blog.toObject(), isLoved, isSaved, status }

            res.status(200).json({ success: true, blog });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async searchBlog(req, res) {
        const { name } = req.body;

        try {
            const regex = new RegExp(name.trim(), 'i')
            const blogListWithoutStatus = await Blog.find({ title: { $regex: regex } }).sort({ loves: -1 });

            const blogList = [];

            if (!blogListWithoutStatus) return res.status(400).json({ success: false, message: "Zero blog" });

            for (var blog of blogListWithoutStatus) {
                const userBlog = await UserBlog.findOne({ _blogId: blog._id, _userId: req.userId });

                const isLoved = userBlog?.isLoved ? userBlog.isLoved : false;
                const isSaved = userBlog?.isSaved ? userBlog.isSaved : false;
                const status = userBlog?.status ? userBlog.status : 0;

                blogList.push({ ...blog.toObject(), isLoved, isSaved, status })
            }

            res.status(200).json({ success: true, blogList });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async createBlog(req, res) {
        const data = req.body;
        const userId = req.userId;

        try {
            const blog = new Blog({ _userId: userId, ...data });

            await blog.save();

            res.status(200).json({ success: true, message: "Blog successfully", blog });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async updateBlog(req, res) {
        const { blogId, ...data } = req.body;

        try {
            const blog = await Blog.findByIdAndUpdate(blogId, data, { new: true });

            res.status(200).json({ success: true, message: "Blog successfully", blog });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async deleteBlog(req, res) {
        const { blogId } = req.body;
        const userId = req.userId;

        try {
            if (!userId) return res.status(400).json({ success: false, message: "Invalid credentials" });

            await Blog.findByIdAndDelete(blogId);

            res.status(200).json({ success: true, message: "Blog has been deleted" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async listBlog(req, res) {
        const { tagId } = req.body;

        const blogTagList = await BlogTag.find({ _tagId: tagId });
        let blogList = [];

        for (var blogTag of blogTagList) {
            const blog = await Blog.findById(blogTag._blogId);
            const userBlog = await UserBlog.findOne({ _blogId: blog._id, _userId: req.userId });
            const blogStatus = userBlog.status;
            const userFollower = await UserFollowBlock.findOne({ _userId: req.userId, _followerId: blog._userId });
            const userStatus = userFollower?.status;

            if (blogStatus !== -1 && userStatus !== -1) {
                blogList.push({ ...blog.toObject(), isLoved: userBlog.isLoved, isSaved: userBlog.isSaved });
            };
        }

        let currentIndex = blogList.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [blogList[currentIndex], blogList[randomIndex]] = [blogList[randomIndex], blogList[currentIndex]];
        }

        res.status(200).json({ success: true, message: "Blogs found", blogList });
    }

    async listSuggestedBlog(req, res) {

        let mostInterestedTagList = await UserTag.find({ _userId: req.userId }).sort({ interactions: -1 }).select("_tagId");

        if (typeof mostInterestedTagList === 'undefined' || mostInterestedTagList.length === 0) {
            mostInterestedTagList = await Tag.find({}).sort({ followerNumber: -1 }).limit(10).select("_id");
        }

        const blogIdList = [];
        const blogIdStringList = [];
        const blogList = [];

        for (var tag of mostInterestedTagList) {
            const blogIdOfBlogTag = await BlogTag.find({ _tagId: tag._tagId ? tag._tagId : tag._id }).distinct('_blogId');

            for (var blogId of blogIdOfBlogTag) {
                if (!blogIdStringList.includes(blogId.toString())) {
                    blogIdList.push(...blogIdOfBlogTag);
                    blogIdStringList.push(blogId.toString());
                }
            }
        }

        for (var blogId of blogIdList) {
            const blog = await Blog.findById(blogId).select("_userId title thumbnail createdAt");
            const userBlog = await UserBlog.findOne({ _blogId: blog._id, _userId: req.userId });
            const blogStatus = userBlog?.status;
            const userFollower = await UserFollowBlock.findOne({ _userId: req.userId, _followerId: blog._userId });
            const userStatus = userFollower?.status;

            if (blogStatus !== -1 && userStatus !== -1) {
                blogList.push({ ...blog.toObject() });
            }
        }

        let currentIndex = blogList.length, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            [blogList[currentIndex], blogList[randomIndex]] = [blogList[randomIndex], blogList[currentIndex]];
        }

        res.status(200).json({ success: true, message: "Suggest list of blog", blogList });
    }

    async getUserBlog(req, res) {
        const userBlogList = await Blog.find({ _userId: req.userId }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, message: "User's blogs", userBlogList });
    }

    async getAuthorBlog(req, res) {
        const { authorId } = req.body;

        const userFollower = await UserFollowBlock.findOne({ _userId: req.userId, _followerId: authorId });

        if (userFollower?.status === -1) {
            res.status(400).json({ success: false, message: "You have block this user" });
        } else {
            if (authorId !== req.userId) {
                const blogList = await Blog.find({ _userId: authorId }).sort({ createdAt: -1 });
                let userBlogList = [];

                for (var blog of blogList) {
                    const userBlog = await UserBlog.findOne({ _blogId: blog._id, _userId: authorId });

                    userBlogList.push({ ...blog.toObject(), isLoved: userBlog?.isLoved, isSaved: userBlog?.isSaved, status: userBlog?.status });
                }

                res.status(200).json({ success: true, message: "User's blogs", userBlogList });
            } else {
                this.getUserBlog(req, res);
            }
        }
    }

    async getSavedBlog(req, res) {
        const userId = req.userId;
        const userBlogList = await UserBlog.find({ _userId: userId, isSaved: true }).sort({ createdAt: -1 });
        let blogList = [];

        for (var userBlog of userBlogList) {
            const blog = await Blog.findById(userBlog._blogId);

            blogList.push({ ...blog.toObject(), isLoved: userBlog.isLoved, isSaved: userBlog.isSaved })
        }

        res.status(200).json({ success: true, blogList });
    }

    async getLovedBlog(req, res) {
        const userId = req.userId;
        const userBlogList = await UserBlog.find({ _userId: userId, isLoved: true }).sort({ createdAt: -1 });
        let blogList = [];

        for (var userBlog of userBlogList) {
            const blog = await Blog.findById(userBlog._blogId);

            blogList.push({ ...blog.toObject(), isLoved: userBlog.isLoved, isSaved: userBlog.isSaved })
        }

        res.status(200).json({ success: true, blogList });
    }

    async getSeenBlog(req, res) {
        const userId = req.userId;
        const userBlogList = await UserBlog.find({ _userId: userId }).sort({ createdAt: -1 });
        let blogList = [];

        for (var userBlog of userBlogList) {
            const blog = await Blog.findById(userBlog._blogId);

            blogList.push({ ...blog.toObject(), isLoved: userBlog.isLoved, isSaved: userBlog.isSaved })
        }

        res.status(200).json({ success: true, blogList });
    }


    async viewBlog(req, res) {
        const { blogId } = req.body;

        try {
            await Blog.findByIdAndUpdate(blogId, {
                $inc: { views: 1 },
            }, { new: true });

            res.status(200).json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }
}

module.exports = new BlogController();
