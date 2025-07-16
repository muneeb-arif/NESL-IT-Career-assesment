const express = require('express');
const router = express.Router();
const { login, deletePost } = require('./controller');
const { authorize } = require('./middleware');

router.post('/login', login);
router.delete('/posts/:id', authorize(['admin']), deletePost);

module.exports = router;

