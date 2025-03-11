const express = require("express");
const { submitJob, getJobStatus, getStoreById } = require("../controllers/jobController");


const router = express.Router();

router.post("/submit", submitJob);
router.get("/status", getJobStatus);
router.get('/stores/:store_id', getStoreById);
module.exports = router;
