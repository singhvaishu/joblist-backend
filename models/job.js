const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    job_id: { type: String, required: true, unique: true },
    visits: [
        {
            store_id: String,
            image_url: [String],
            visit_time: String,
            status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
            results: [{ image: String, perimeter: Number, error: String }],
        }
    ],
    created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Job', JobSchema);
