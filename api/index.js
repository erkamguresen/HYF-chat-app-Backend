const express = require('express');
const channelRoutes = require('./routes/channels');
const messageRoutes = require('./routes/messages');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const authenticateUser = require('./middleware/authenticate');

// const rateLimit = require('express-rate-limit');

// const app = express();

const router = express.Router();

//Rate limit is used to prevent brute force attacks
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });

// router.use(limiter);
// router.set('trust proxy', 1);

router.use((req, res, next) => {
  console.log('api! index');
  next();
});

router.get('/', (req, res) => {
  res.send('api!');
});

//register
router.use('/register', registerRoute);

// login
router.use('/login', loginRoute);

// authentication with token
router.use(authenticateUser);

// use routes
router.use('/channels', channelRoutes);
router.use('/', messageRoutes);

module.exports = router;
