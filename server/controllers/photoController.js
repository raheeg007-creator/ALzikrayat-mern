const Photo = require('../models/Photo');

// رفع صورة جديدة
exports.createPhoto = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'Please upload a file' });

    const { title, description } = req.body;
    const userId = req.header('x-user-id'); // هناخد الـ id من الهيدر

    const photo = await Photo.create({
      userId,
      title,
      description,
      fileName: req.file.filename
    });

    res.status(201).json(photo);
  } catch (err) { next(err); }
};

// جلب كل الصور
exports.getAllPhotos = async (req, res, next) => {
  try {
    // populate عشان يجيب بيانات صاحب الصورة مع الصورة
    const photos = await Photo.find().populate('userId', 'firstName lastName');
    res.json(photos);
  } catch (err) { next(err); }
};

// حذف صورة
exports.deletePhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    // التأكد إن اللي بيحذف هو صاحب الصورة
    const userId = req.header('x-user-id');
    if (photo.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await photo.deleteOne();
    res.json({ message: 'Photo deleted' });
  } catch (err) { next(err); }
}
exports.getPhotoById = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id).populate('userId', 'firstName lastName');
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    res.json(photo);
  } catch (err) { next(err); }
}