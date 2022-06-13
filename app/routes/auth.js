const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const authController = require('../controllers/auth');

// router.post(
//   '/signup',
//   [
//     body('name').trim().not().isEmpty(),
//     body('email')
//       .isEmail()
//       .withMessage('Please enter a valid email.')
//       .custom(async (email) => {
//         const user = await User.find(email);
//         if (user[0].length > 0) {
//           return Promise.reject('Email address already exist!');
//         }
//       })
//       .normalizeEmail(),
//     body('password').trim().isLength({ min: 7 }),
//   ],
//   authController.signup
// );

// router.post('/login', authController.login);

// module.exports = router;

let routes = (app) => {
  router.post('/login', authController.login);
  router.post('/signup',
    [
      body('name').trim().not().isEmpty(),
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom(async (email) => {
          const user = await User.find(email);
          if (user[0].length > 0) {
            return Promise.reject('Email address already exist!');
          }
        })
        .normalizeEmail(),
      body('password').trim().isLength({ min: 7 }),
    ],
    authController.signup
  );
  router.get('/getmenu/:role',authController.GetMenubyRole);
  router.post('/getmenulist/:role', authController.GetMenuList);
  router.post('/logout', authController.logout);
  router.post('/refresh', authController.refresh);
  app.use('/api', router);
}
module.exports = routes;