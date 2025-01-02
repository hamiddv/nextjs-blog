import { Schema, model, models, Document, Types } from 'mongoose';

interface IBlog extends Document {
    title: string;
    content: string;
    user: Types.ObjectId;
}

const BlogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);

export default Blog;
