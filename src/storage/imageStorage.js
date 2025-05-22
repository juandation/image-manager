const fs = require('fs/promises');
const path = require('path');

const FILE = path.join(__dirname, 'images.json');

async function loadImages() {
  try {
    const data = await fs.readFile(FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveImages(images) {
  await fs.writeFile(FILE, JSON.stringify(images, null, 2));
}

module.exports = { loadImages, saveImages };