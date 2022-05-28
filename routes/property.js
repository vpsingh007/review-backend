const express = require('express');
const router = express.Router();
const {
    create,
    list,
    read
} = require('../controllers/property');

const { requireSignin, adminMiddleware, authMiddleware, canUpdateDeleteBlog } = require('../controllers/auth');

router.post('/property', requireSignin, create);
router.post('/property/list', list);
router.get('/property/:slug', read);
// router.post('/blogs-categories-tags', listAllBlogsCategoriesTags);
// router.get('/blog/:slug', read);
// router.delete('/blog/:slug', requireSignin, adminMiddleware, remove);
// router.put('/blog/:slug', requireSignin, adminMiddleware, update);
// router.get('/blog/photo/:slug', photo);
// router.post('/blogs/related', listRelated);
// router.get('/blogs/search', listSearch);

// // auth user blog crud
// router.post('/user/blog', requireSignin, authMiddleware, create);
// router.get('/:username/blogs', listByUser);
// router.delete('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, canUpdateDeleteBlog, remove);
// router.put('/user/blog/:slug', requireSignin, authMiddleware, canUpdateDeleteBlog, canUpdateDeleteBlog, update);

module.exports = router;
