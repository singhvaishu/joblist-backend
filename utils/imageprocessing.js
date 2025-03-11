const axios = require('axios');
const sharp = require('sharp');
const { promisify } = require('util');
const sleep = promisify(setTimeout);

async function processImage(imageUrl) {
    try {
        const response = await axios({ url: imageUrl, responseType: 'arraybuffer' });
        const metadata = await sharp(response.data).metadata();
        const perimeter = 2 * (metadata.width + metadata.height);

        await sleep(Math.random() * (400 - 100) + 100); // Simulate GPU delay (0.1s - 0.4s)

        return { image: imageUrl, perimeter };
    } catch (error) {
        return { image: imageUrl, error: 'Image processing failed' };
    }
}

module.exports = { processImage };
