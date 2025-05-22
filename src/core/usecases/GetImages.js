class GetImages {
  constructor(service) {
    this.service = service;
  }

  async execute() {
    const images = await this.service.getAll();
    return images.sort((a, b) => new Date(b.date) - new Date(a.date));
  }
}

module.exports = { GetImages };