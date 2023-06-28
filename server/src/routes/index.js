const userRouter = require("./users");
const tagsRouter = require("./tags")
const blogRouter = require("./blogs");
// const messageRouter = require("./messages");
// const conversationRouter = require("./conversations");
// const fileRouter = require("./files");

const route = (app) => {
    app.use("/api/users", userRouter);
    app.use("/api/tags", tagsRouter);
    app.use("/api/blogs", blogRouter);
    // app.use("/api/conversations", conversationRouter);
    // app.use("/api/messages", messageRouter);
};

module.exports = route;
