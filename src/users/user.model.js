import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  username: { type: String, unique: true, required: true },
  hash: { type: String, required: true },
  role: { type: String, default: 'user' },
  createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line
    delete ret._id;
    // eslint-disable-next-line
    delete ret.hash;
  },
});

export default mongoose.model('User', schema);
