import app from 'express';
import Controllers from '../controllers';

const Router = app.Router();

/**
 * Public instance
 */
Router.route('/').post((req, res) => {
    return res.json({
        success: 'https://github.com/Krbz/node-thecodinglove-scraper',
        author: 'https://github.com/Krbz'
    });
});

/**
 * Base route for collecting all posts from database
 * Route - /posts
 * Method - GET
 */
Router.route('/posts').post(new Controllers.Posts().GetPosts);
/**
 * Base route for collecting random post from database
 * Route - /random
 * Method - GET
 */
Router.route('/random').get(new Controllers.Posts().Random);

export default Router;
