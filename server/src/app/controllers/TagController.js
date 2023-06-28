const Tag = require("../models/Tag");
const UserTag = require("../models/UserTag");
const BlogTag = require("../models/BlogTag");

class TagController {

    async searchTag(req, res) {
        const { name } = req.body;

        try {
            const regex = new RegExp(name.trim(), 'i')
            const listSearchTagWithoutFollowed = await Tag.find({ name: { $regex: regex } }).sort({ followerNumber: -1 });

            if (!listSearchTagWithoutFollowed) return res.status(400).json({ success: false, message: "Zero tag" });

            const tagList = [];

            for (var tagWithoutFollowed of listSearchTagWithoutFollowed) {
                const isFollowed = await UserTag.findOne({ _tagId: tagWithoutFollowed._id, _userId: req.userId }) ? true : false;

                tagList.push({
                    ...tagWithoutFollowed.toObject(),
                    isFollowed
                });
            }

            res.status(200).json({ success: true, tagList });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async createTag(req, res) {
        const { name, blogId } = req.body;

        try {
            let existingTagName = await Tag.findOne({ name });

            if (!existingTagName) {
                const newTag = new Tag({ name });

                await newTag.save();

                existingTagName = newTag;
            } else {
                let existingBlogTag = await BlogTag.findOne({ _blogId: blogId, _tagId: existingTagName._id });

                if (!existingBlogTag) {
                    const newBlogTag = new BlogTag({ _blogId: blogId, _tagId: existingTagName._id });

                    newBlogTag.save();
                }
            }

            res.status(200).json({ success: true, message: "Tag successfully" });
        } catch (error) {
            res.status(500).json({ success: false, message: "Something went wrong" });
        }
    }

    async userTag(req, res) {
        const userTagList = await UserTag.find({ _userId: req.userId });
        const tagList = [];

        for (var userTag of userTagList) {
            const tag = await Tag.findById(userTag._tagId);

            tagList.push(tag);
        }

        res.status(200).json({ success: true, tagList });
    }

    async blogTag(req, res) {
        const { blogId } = req.body;

        const blogTagList = await BlogTag.find({ _blogId: blogId });
        let tagList = [];

        for (var userTag of blogTagList) {
            const tag = await Tag.findById(userTag._tagId);

            tagList.push(tag);
        }

        res.status(200).json({ success: true, tagList });
    }
}

module.exports = new TagController();
