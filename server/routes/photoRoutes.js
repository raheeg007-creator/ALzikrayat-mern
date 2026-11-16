const express = require('express');
const router = express.Router();
const { createPhoto, getAllPhotos, deletePhoto } = require('../controllers/photoController');
const upload = require('../middleware/upload');

router.get('/', getAllPhotos);
router.post('/', upload.single('image'), createPhoto);
router.delete('/:id', deletePhoto);

module.exports = router;