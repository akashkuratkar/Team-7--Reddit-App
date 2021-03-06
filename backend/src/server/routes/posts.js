const express = require('express');
const router = express.Router();

const { auth, checkAuth } = require( '../utils/passport' )
auth();
const { addPostText, addPostImage, addPostLink, getPosts, getPostbyID, getPostCommunity,
searchPostsCriteria, sortDashPostsByUpvotes } = require('../controllers/posts');

// keep adding end-points here
router.post('/link', checkAuth, addPostLink);
router.post('/text', checkAuth, addPostText);
router.post('/image', checkAuth, addPostImage);
router.get('/community',checkAuth, getPostCommunity);
router.get('/', checkAuth, getPosts);
router.get('/', checkAuth, getPostbyID);
router.get('/searchPostsCriteria', checkAuth, searchPostsCriteria);
router.post('/sortDashPostsByUpvotes', checkAuth, sortDashPostsByUpvotes);

module.exports = router;
