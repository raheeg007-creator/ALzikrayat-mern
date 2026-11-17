const express = require('express');
const router = express.Router();
const { createPhoto, getAllPhotos, deletePhoto } = require('../controllers/photoController');
const upload = require('../middleware/upload');
const {createPhoto, getAllPhotos, deletePhoto, getPhotoById} = require('../controllers/photoController');
const {addcomment, getComments} = require('../controllers/commentController');

router.get('/:id', getPhotoById);
router.post('/:id/comments', addComment);
router.get('/:id/comments', getComments);
router.get('/', getAllPhotos);
router.post('/', upload.single('image'), createPhoto);
router.delete('/:id', deletePhoto);

module.exports = router;