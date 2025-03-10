const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    job_id: { type: String, required: true },
    status: { type: String, enum: ["ongoing", "completed", "failed"], default: "ongoing" },
    stores: [
        {
            store_id: String,
            images: [
                {
                    url: String,
                    perimeter: Number,
                    status: { type: String, enum: ["pending", "processed", "failed"], default: "pending" }
                }
            ]
        }
    ],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
