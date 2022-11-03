const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const users = require('../controllers/users');
const multer = require('multer');
const { storage } = require('../cloudinary/index');
const upload = multer(storage``);

router.route();

router
  .route('/register')
  .post(upload.single('image'), catchAsync(users.register));
router
  .route('/login')
  .post(passport.authenticate('local'), catcAsync(users.login));
router.route('/logout').post(catchAsync(users.logout));

router
  .route(':userId')
  .get(
    isUser,
    catchAsync(users.userProfile).put(
      isUser,
      isLoggedIn,
      catchAsync(user.updateUser)
    )
  );

router
  .route('/sendPasswordRequest/:userId')
  .post(catchAsync(users.sendPasswordEmail));

router.route('/passwordReset/:userId/token/:token');

module.exports = router;
