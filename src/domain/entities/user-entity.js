import mongoose from 'mongoose';

const user = (db) => {
  const userSchema = new db.Schema(
    {
      userName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      date: { type: Number, required: true },
      avatar: { type: String },
      nationality: { type: String, required: true },
      language: { type: String, required: true },
      homeUniversity: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'university' },
      ],
      destinationUniversity: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'university' },
      ],
      followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
      chats: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chat' }],
      posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }],
    },
    {
      timestamps: true,
    }
  );
  return db.model('user', userSchema);
};

export default user;
