
const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: function () {
        return this.type === 'post'; 
      },
    },
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog',
      default: null, 
    },
    type: {
      type: String,
      enum: ['post', 'comment'],
      default: 'post',
    },
    blogPic: { type: String,default: null }, 

  },
  { timestamps: true } 
);

blogSchema.virtual('comments', {
  ref: 'Blog',
  localField: '_id',
  foreignField: 'parentId',
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
