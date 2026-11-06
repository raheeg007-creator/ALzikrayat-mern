//ننتقل إلى ملف `authRoutes.js`، حيث يتم تعريف مسارات تسجيل المستخدم وتسجيل الدخول. يتم استخدام `express.Router()` لإنشاء كائن راوتر جديد، ويتم استيراد الدوال `register` و `login` من وحدة التحكم `authController`. كما يتم استيراد دوال التحقق من الصحة من وحدة `validation`. يتم تعريف مسار POST لتسجيل المستخدم (`/register`) ومسار POST لتسجيل الدخول (`/login`)، مع تطبيق دوال التحقق من الصحة المناسبة لكل مسار. في النهاية، يتم تصدير الراوتر ليتم استخدامه في التطبيق الرئيسي.
const express=require('express');
const router=express.Router();
const {register,login}=require('../controllers/authController');
const {validate,registerSchema,loginSchema}=require('../middleware/validation');
// تعريف مسار POST لتسجيل المستخدم، مع تطبيق دالة التحقق من الصحة `validate` باستخدام مخطط `registerSchema`.
router.post('/register',validate(registerSchema),register);
router.post('/login',validate(loginSchema),login);
module.exports=router;