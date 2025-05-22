const express = require('express');
const logger = require('../utils/logger');
const { CreateImageSchema } = require('@dto/CreateImageDTO');
const { AddImage } = require('@usecases/AddImage');
const { GetImages } = require('@usecases/GetImages');
const { DeleteImage } = require('@usecases/DeleteImage');
const { UpdateImage } = require('@usecases/UpdateImage');
const { ImageService } = require('@services/ImageService');

const router = express.Router();
const imageService = new ImageService();
const addImage = new AddImage(imageService);
const getImages = new GetImages(imageService);
const deleteImage = new DeleteImage(imageService);
const updateImage = new UpdateImage(imageService);

router.get('/', (req, res) => res.redirect('/images'));

router.get('/images', async (req, res) => {
	const images = await getImages.execute();
	res.render('images/index', { images });
});

router.get('/images/add', (req, res) => {
	res.render('images/add');
});

router.post('/images', async (req, res) => {
	logger.logRequest(req, res, () => {});
	const parsed = CreateImageSchema.safeParse(req.body);
	if (!parsed.success) {
		logger.logError(parsed.error, req);
		req.session.message = {
			type: 'error',
			text: parsed.error.issues[0].message
		};
		return res.redirect('/images/add');
	}

	try {
		await addImage.execute(parsed.data);
		res.redirect('/images');
	} catch (err) {
		logger.logError(err, req);
		req.session.message = { type: 'error', text: err.message };
		res.redirect('/images/add');
	}
});

router.post('/images/delete', async (req, res) => {
	logger.logRequest(req, res, () => {});
	await deleteImage.execute(req.body.id);
	res.redirect('/images');
});

router.get('/images/edit', async (req, res) => {
	logger.logRequest(req, res, () => {});
	const image = await imageService.findById(req.query.id);
	if (!image) return res.redirect('/images');
	res.render('images/edit', { image });
});

router.post('/images/update', async (req, res) => {
	logger.logRequest(req, res, () => {});
	const parsed = CreateImageSchema.safeParse(req.body);
	if (!parsed.success) {
		logger.logError(parsed.error, req);
		req.session.message = {
			type: 'error',
			text: parsed.error.issues[0].message
		};
		return res.redirect(`/images/edit?id=${req.body.id}`);
	}

	try {
		await updateImage.execute(req.body.id, parsed.data);
		res.redirect('/images');
	} catch (err) {
		logger.logError(err, req);
		req.session.message = { type: 'error', text: err.message };
		res.redirect(`/images/edit?id=${req.body.id}`);
	}
});

module.exports = router;
