import { Schema, model, models, Document, Types } from 'mongoose';

interface IBlog extends Document {
    id: string; // افزودن فیلد id به اینترفیس
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
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

BlogSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

const Blog = models.Blog || model<IBlog>('Blog', BlogSchema);

export default Blog;
