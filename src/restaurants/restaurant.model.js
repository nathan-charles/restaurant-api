import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line
    delete ret._id;
  },
});

export default mongoose.model('Restaurant', schema);
