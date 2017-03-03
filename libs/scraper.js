import cron from 'node-cron';

export default class Scrapper {
    constructor ({cronSchedule, url}) {
        this.time = cronSchedule;
        this.url = url;
    }

    runCron () {
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
            console.log('Cron is working right now');
        });
    }
}
