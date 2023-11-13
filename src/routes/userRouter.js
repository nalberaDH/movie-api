const express = require('express');

const { userRegister, userLogin, randomUserGenerator, getPost } = require('../controllers/usersControllers');

const router = express.Router();


router.post('/user/register', userRegister);
router.post('/user/login', userLogin);

router.get('/user/random', randomUserGenerator);

router.get('/posts', getPost);

module.exports = router;