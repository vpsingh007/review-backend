const express = require('express');
const router = express.Router();

// controllers
const { requireSignin, adminMiddleware, authMiddleware } = require('../controllers/auth');
const { create, list, read, remove } = require('../controllers/review');

// validators
const { runValidation } = require('../validators');
const { createReviewValidator } = require('../validators/review');

// only difference is methods not name 'get' | 'post' | 'delete'
// router.post('/tag', createReviewValidator, runValidation, requireSignin, adminMiddleware, create);
router.post('/review', createReviewValidator, requireSignin, authMiddleware, create);
// router.get('/tags', list);
// router.get('/tag/:slug', read);
// router.delete('/tag/:slug', requireSignin, adminMiddleware, remove);

module.exports = router; 
