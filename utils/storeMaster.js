const fs = require("fs");
const path = require("path");
const csvParser = require("csv-parser");

let storeMasterData = {}; // Store in memory

const loadStoreMaster = () => {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, "../StoreMasterAssignment.csv");

        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on("data", (row) => {
                const { StoreID, StoreName, AreaCode } = row;
                if (StoreID) {
                    storeMasterData[StoreID] = { store_name: StoreName, area_code: AreaCode };
                }
            })
            .on("end", () => {
                console.log("✅ Store Master loaded successfully!");
                resolve();
            })
            .on("error", (err) => reject(err));
    });
};

const getStoreDetails = (storeId) => storeMasterData[storeId] || null;

module.exports = { loadStoreMaster, getStoreDetails };
