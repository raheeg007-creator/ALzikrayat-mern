const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

// استدعاء الكونترولرز (مرة واحدة بس لكل ملف)
const { createPhoto, getAllPhotos, deletePhoto, getPhotoById } = require('../controllers/photoController');
const { addComment, getComments } = require('../controllers/commentControllers');

router.get('/', getAllPhotos);
router.post('/', upload.single('image'), createPhoto);

router.get('/:id', getPhotoById);
router.delete('/:id', deletePhoto);

router.get('/:id/comments', getComments);
router.post('/:id/comments', addComment);

module.exports = router;