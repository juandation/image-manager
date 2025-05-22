const { loadImages, saveImages } = require('@storage/imageStorage');
const { v4: uuidv4 } = require('uuid');

class ImageService {
  async getAll() {
    return await loadImages();
  }

  async add(image) {
    const images = await loadImages();
    const newImage = { ...image, id: uuidv4() };
    images.push(newImage);
    await saveImages(images);
  }

  async exists(url) {
    const images = await loadImages();
    return images.some(img => img.url === url);
  }

  async delete(id) {
    const images = await loadImages();
    const filtered = images.filter(img => img.id !== id);
    await saveImages(filtered);
  }

  async update(id, newData) {
    const images = await loadImages();
    const index = images.findIndex(img => img.id === id);
    if (index >= 0) {
      images[index] = { ...newData, id };
      await saveImages(images);
    }
  }

  async findById(id) {
    const images = await loadImages();
    return images.find(img => img.id === id);
  }
}

module.exports = { ImageService };