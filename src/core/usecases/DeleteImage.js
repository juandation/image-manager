class DeleteImage {
  constructor(service) {
    this.service = service;
  }

  async execute(id) {
    await this.service.delete(id);
  }
}

module.exports = { DeleteImage };