import { Router } from 'express';
import multer from 'multer';
import { createPost, getPosts, addComment, likePost } from '../controllers/postController.js';

const router = Router();

// Set up multer to save uploaded files to a directory
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename
    }
});

const upload = multer({ storage: storage });

// POST route for creating a new post with media upload
router.post('/create', upload.array('media'), createPost);

// GET route for getting all posts
router.get('/', getPosts);

// POST route for adding a comment to a post
router.post('/comment/:postId', addComment);

// POST route for liking a post
router.post('/like/:postId', likePost);

export default router;
