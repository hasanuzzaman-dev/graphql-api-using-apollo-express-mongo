const Post = require('./models/post.model');
const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World';
        },
        getAllPosts: async () => {
            const posts = await Post.find();
            return posts;
        },

        getPost: async (parent, args, context, info) => {

            const { id } = args;

            return await Post.findOne({ _id: id });

        }
    },

    Mutation: {
        createPost: async (parent, args, context, info) => {
            const { title, description } = args.post;
            const post = new Post({ title, description })
            await post.save();
            return post;
        },

        deletePost: async (parent, args, context, info) => {
            const { id } = args;
            await Post.findOneAndDelete(id);
            return "Ok, post deleted";
        },

        updatePost: async (parent, args, context, info) => {
            const { id } = args;
            const { title, description } = args.post;

            const updatePost = {};
            updatePost.title = (title !== undefined) ? title : updatePost.title;
            updatePost.description = (description !== undefined) ? description : updatePost.description;

            const post = await Post.findOneAndUpdate(
                { _id: id },
                updatePost,
                { new: true }
            );
            return post;
        },
    }
}

module.exports = resolvers;