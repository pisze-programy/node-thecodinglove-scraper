import cron from 'node-cron';
import cheerio from 'cheerio';
import request from 'request';
import PostsModel from '../app/models/posts';

export default class Scrapper {
    static getLastPost (posts) {
        const post = posts.first();

        return {
            id: Scrapper.getPostId(post),
            title: Scrapper.getPostTitle(post),
            url: Scrapper.getPostUrl(post),
            img: Scrapper.getPostImg(post),
            author: Scrapper.getPostAuthor(post)
        };
    }

    static getPostTitle (post) {
        const titleElement = post.find('h3');

        return titleElement.text();
    }

    static getPostUrl (post) {
        const urlElement = post.find('h3').find('a');

        return urlElement.attr('href');
    }

    static getPostImg (post) {
        const imgElement = post.find('img');

        return imgElement.attr('src');
    }

    static getPostId (post) {
        const urlElement = post.find('h3').find('a');
        const url = urlElement.attr('href');
        const trimmed = /post\/(\d+)\//.exec(url);

        return trimmed[1];
    }

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
            id: null,
            title: '',
            url: '',
            img: '',
            author: null
        };
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
                const last = Scrapper.getLastPost(posts);
                const preparePost = Object.assign({}, this.state, last);

                const Posts = new PostsModel(preparePost);

                Posts.findPost({'id': last.id}, (err, post) => {
                    if (error) return console.warn(`Error while connecting to database: ${err.errors}, Message: ${err.message}`);
                    if (post) return console.info(`In database there is post with id: ${last.id}, exiting`);

                    PostsModel.create(Posts, (err) => {
                        if (err) return console.warn(`Error while connecting to database: ${err.errors}, Message: ${err.message}`);
                    });
                });
            })
        });
    }


}
