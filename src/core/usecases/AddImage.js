class AddImage {
  constructor(service) {
    this.service = service;
  }

  async execute(data) {
    const exists = await this.service.exists(data.url);
    if (exists) throw new Error('Image URL already exists.');

    await this.service.add(data);
  }
}

module.exports = { AddImage };