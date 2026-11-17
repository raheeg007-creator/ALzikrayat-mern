const Photo = require('../models/Photo');
const fs = require('fs');
const path = require('path');
const Comment = require('../models/Comment');//مسح صورة مع التعليقات المرتبطة بها

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

exports.deletePhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });

    // 1. التأكد إن اللي بيحذف هو صاحب الصورة (من الهيدر)
    const userId = req.header('x-user-id');
    if (!userId || photo.userId.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this photo' });
    }

    // 2. مسح ملف الصورة من فولدر uploads
    const filePath = path.join(__dirname, '../uploads', photo.fileName);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // 3. مسح كل تعليقات الصورة دي
    await Comment.deleteMany({ photoId: photo._id });

    // 4. مسح الصورة من الداتابيز
    await photo.deleteOne();

    res.json({ message: 'Photo deleted successfully' });
  } catch (err) { next(err); }
};