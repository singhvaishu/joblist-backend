const Job = require("../models/job");


const processJob = async (job_id) => {
    try {
        console.log(`Processing job: ${job_id}`);

        const job = await Job.findOne({ job_id });
        if (!job) {
            console.error(`Job ${job_id} not found.`);
            return;
        }

        for (const store of job.stores) {
            for (const image of store.images) {

                await new Promise((resolve) => setTimeout(resolve, 1000));

                image.status = "processed";
                image.perimeter = Math.random() * 100;
            }
        }

        job.status = "completed";
        await job.save();

        console.log(`Job ${job_id} processed successfully.`);
    } catch (error) {
        console.error(`Error processing job ${job_id}:`, error);
        await Job.updateOne({ job_id }, { status: "failed" });
    }
};

module.exports = { processJob };
