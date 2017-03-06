import cron from 'node-cron';
import cheerio from 'cheerio';
import request from 'request';
import PostsModel from '../app/models/posts';

export default class Scrapper {
    /**
     * Get Post Title
     * @param post
     * @return string
     */
    static getPostTitle (post) {
        const titleElement = post.find('h3');

        return titleElement.text();
    }

    /**
     * Get Post URL
     * @param post
     * @return string
     */
    static getPostUrl (post) {
        const urlElement = post.find('h3').find('a');

        return urlElement.attr('href');
    }

    /**
     * Get Post Image
     * @param post
     * @return string
     */
    static getPostImg (post) {
        const imgElement = post.find('img');

        return imgElement.attr('src');
    }

    /**
     * Get Post Id
     *
     * To get Id trim href and get post id
     *
     * @param post
     * @return string
     */
    static getPostId (post) {
        const urlElement = post.find('h3').find('a');
        const url = urlElement.attr('href');
        const trimmed = /post\/(\d+)\//.exec(url);

        return trimmed[1];
    }

    /**
     * Get Post Author
     *
     * If there is no author, return null
     *
     * @param post
     * @return string ? null
     */
    static getPostAuthor (post) {
        const authorElement = post.find('p').find('i').first();

        if (authorElement.length) {
            return authorElement.text();
        }

        return null;
    }

    constructor ({cronSchedule, url}) {
        this.time = cronSchedule;
        this.url = url;

        this.state = {
            post_id: null,
            title: '',
            url: '',
            img: '',
            author: null
        };
    }

    /**
     * Create Post Model (Mongoose model)
     *
     * Collect post object data
     *
     * @param post - Set Cheerio element e.g. $('.post').first()
     * @returns {{id: string, title: string, url: string, img: string, author: string ? null}}
     */
    createPostModel (post) {
        return new PostsModel({
            post_id: Scrapper.getPostId(post),
            title: Scrapper.getPostTitle(post),
            url: Scrapper.getPostUrl(post),
            img: Scrapper.getPostImg(post),
            author: Scrapper.getPostAuthor(post)
        });
    }

    runCron () {
        /**
         * If Class has not schedule time exit method
         */
        if (!this.time) console.warn('Config time schedule for your cron');

        /**
         * Crone schedule
         *
         * Start crone schedule in every ${this.time} - comes from main application file,
         * @param !string expression - Cron expression
         * @param !Function func - Task to be executed
         * @param boolean? immediateStart - Whether to start scheduler immediately after create - @optional
         */
        cron.schedule(this.time, () => {

            /**
             * Simplified HTTP request method
             *
             * @param options - The first argument can be either a url or an options object
             * @param callback
             * info: https://www.npmjs.com/package/request#requestoptions-callback
             *
             * Callback params:
             *
             * error - get error while connect
             * response - get response
             * param html - get html from request
             */
            request(this.url, (error, response, html) => {
                if (error) return console.warn(`Error while requesting a url ${this.url}, Error: ${error}`);

                const $ = cheerio.load(html);
                const posts = $('.post');
                const last = posts.first();

                const LastPost = this.createPostModel(last);

                PostsModel.findOne({post_id: LastPost.post_id}, (error, post) => {
                    if (error) return console.warn(`Error while fetching database data: ${error.error}, Message: ${error.message}`);
                    if (post) return console.info(`In database there is post with id: ${post.post_id}, exiting`);

                    PostsModel.create(LastPost, (error) => {
                        if (error) return console.warn(`Error while saving data to database: ${error.error}, Message: ${error.message}`);
                    });
                });
            });
        });
    }
}
