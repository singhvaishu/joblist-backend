const mongoose = require('mongoose');

const StoreSchema = new mongoose.Schema({
    area_code: { type: String, required: true },
    store_name: { type: String, required: true },
    store_id: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Store', StoreSchema);
