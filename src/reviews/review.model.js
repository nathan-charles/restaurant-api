import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  restaurant: { type: String, required: true },
  comments: { type: String, required: true },
  rating: { type: Number, default: 5 },
  author: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line
    delete ret._id;
  },
});

export default mongoose.model('Review', schema);
