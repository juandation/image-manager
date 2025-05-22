class UpdateImage {
  constructor(service) {
    this.service = service;
  }

  async execute(id, newData) {
    await this.service.update(id, newData);
  }
}

module.exports = { UpdateImage };