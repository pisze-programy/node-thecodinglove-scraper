const PostModel = require('../models/posts');

class Posts {
    GetPosts = (req, res) => {
        PostModel.find({})
            .limit(5)
            .exec((err, posts) => {
                if (err) return res.json({error: err.errors, Response: {message: err.message}});
                if (!posts) return res.json({error: true, Response: {message: 'Error while fetching posts'}});

                res.status(200).json(posts);
        });
    };

    Random = (req, res) => {
        PostModel
            .count()
            .exec((err, count) => {
                if (err) return res.json({error: err.errors, Response: {message: err.message}});
                if (!count) return res.json({error: true, Response: {message: 'Error while fetching posts'}});

                const random = Math.floor(Math.random() * count);

                PostModel
                    .findOne()
                    .skip(random)
                    .exec((err, post) => {
                        if (err) return res.json({error: err.errors, Response: {message: err.message}});

                        res.status(200).json(post);
                });
        });
    };
}

module.exports = Posts;
