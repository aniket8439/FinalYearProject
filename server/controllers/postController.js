import Post from '../models/Post.js';

export async function createPost(req, res) {
    try {
        const { user, content } = req.body;
        const media = req.files.map(file => file.path);
        const post = await Post.create({ user, content, media });
        res.status(201).json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create post' });
    }
}

export async function getPosts(req, res) {
    try {
        const posts = await Post.find().populate('user', 'name').populate('comments.user', 'name');
        res.json({ posts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to get posts' });
    }
}

export async function addComment(req, res) {
    try {
        const { postId } = req.params;
        const { user, text } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        post.comments.push({ user, text });
        await post.save();
        res.json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add comment' });
    }
}

export async function likePost(req, res) {
    try {
        const { postId } = req.params;
        const { userId } = req.body;
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        if (post.likes.includes(userId)) {
            return res.status(400).json({ error: 'Post already liked' });
        }
        post.likes.push(userId);
        await post.save();
        res.json({ post });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to like post' });
    }
}
