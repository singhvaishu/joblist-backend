const Job = require("../models/job");
const { processJob } = require("../utils/imageprocessing");
const { v4: uuidv4 } = require("uuid");

// Submit a new job
exports.submitJob = async (req, res) => {
    try {
        const { count, visits } = req.body;
        if (!count || !visits || count !== visits.length) {
            return res.status(400).json({ error: "Invalid request data" });
        }

        const job_id = uuidv4(); // Generate unique job ID
        const job = new Job({
            job_id,
            status: "ongoing",
            stores: visits.map(store => ({
                store_id: store.store_id,
                images: store.image_url.map(url => ({ url })),
            })),
            failedStores: [],
        });

        await job.save();
        processJob(job_id);

        res.status(201).json({ job_id });
    } catch (error) {
        console.error("Error submitting job:", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get job status
exports.getJobStatus = async (req, res) => {
    try {
        const { jobid } = req.query;
        if (!jobid) {
            return res.status(400).json({ error: "Job ID is required" });
        }

        const job = await Job.findOne({ job_id: jobid });
        if (!job) {
            return res.status(404).json({});
        }

        if (job.status === "failed") {
            return res.status(200).json({
                status: "failed",
                job_id: job.job_id,
                error: job.failedStores,
            });
        }

        res.status(200).json({
            status: job.status, // "completed" / "ongoing"
            job_id: job.job_id,
        });
    } catch (error) {
        console.error("Error fetching job status:", error);
        res.status(500).json({ error: "Server error" });
    }
};
