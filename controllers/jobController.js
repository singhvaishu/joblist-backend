const Job = require('../models/job');
const Store = require('../models/store');
const { processImage } = require('../utils/imageprocessing');
const { getStoreDetails } = require('../utils/storeMaster');

const { v4: uuidv4 } = require('uuid');
//submit job
exports.submitJob = async (req, res) => {
    const { count, visits } = req.body;

    if (!count || !visits || count !== visits.length) {
        return res.status(400).json({ error: "Invalid request format" });
    }

    const job_id = uuidv4();
    const job = new Job({ job_id, visits });

    await job.save();
    processJob(job_id);

    res.status(201).json({ job_id });
};

async function processJob(job_id) {
    const job = await Job.findOne({ job_id });
    if (!job) return;

    job.visits.forEach(async (visit) => {
        const storeExists = await Store.findOne({ store_id: visit.store_id });

        if (!storeExists) {
            visit.status = 'failed';
            visit.results.push({ error: `Invalid store_id: ${visit.store_id}` });
        } else {
            visit.status = 'processing';

            for (let imageUrl of visit.image_url) {
                const result = await processImage(imageUrl);
                visit.results.push(result);
            }

            visit.status = 'completed';
        }
    });

    await job.save();
}
//status
exports.getJobStatus = async (req, res) => {
    const { jobid } = req.query;
    const job = await Job.findOne({ job_id: jobid });

    if (!job) return res.status(400).json({});

    res.json({ job_id: job.job_id, status: job.visits.some(v => v.status === 'processing') ? 'ongoing' : 'completed' });
};
//job id 
exports.getStoreById = (req, res) => {
    const store_id = req.params.store_id.trim();
    const store = getStoreDetails(store_id);

    if (!store) {
        return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
};

