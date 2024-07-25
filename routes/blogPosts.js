const express = require('express');
const router = express.Router();

// BlogPost model
const BlogPost = require('../models/BlogPost');

// @route GET api/blogPosts
// @desc Get All BlogPosts
router.get('/', (req, res) => {
  BlogPost.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ noPostsFound: 'No posts found' }));
});

// @route POST api/blogPosts
// @desc Create A BlogPost
router.post('/', (req, res) => {
  const newPost = new BlogPost({
    title: req.body.title,
    content: req.body.content
  });

  newPost.save().then(post => res.json(post));
});

// @route DELETE api/blogPosts/:id
// @desc Delete A BlogPost
router.delete('/:id', (req, res) => {
  BlogPost.findById(req.params.id)
    .then(post => post.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ postNotFound: 'No post found' }));
});

module.exports = router;
