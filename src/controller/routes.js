const Router = require('express');
const router = Router();
const controller = require('../controller/auth');

//middleware
const validInfo = require('../middleware/validinfo');
const authorize = require('../middleware/authorization');
const vikas = require('../middleware/checkadmin');

//routes
router.post('/register', validInfo, controller.userregister); //register
router.post('/login', validInfo, controller.userlogin); //login
router.get('/wholedata', authorize, controller.getdata); // all data see
router.get('/:user_name', controller.getspecificdata);
router.get(
  '/get/alldata',
  authorize,
  vikas(['admin']),
  controller.confilctalldata
);
router.post('/add', controller.add);

module.exports = router;
