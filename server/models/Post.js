import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    content: String,
    media: [String], // Array of strings (paths to photos/videos)
    comments: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
}, { timestamps: true });

const Post = model('Post', postSchema);

export default Post;
