import bcrypt from 'bcrypt';
import { default as conn } from '../repositories/mongo.repository.js';
import { LogDanger } from '../../utils/magic.js';

const db = conn.connMongo;

export const Create = async (req) => {
  try {
    const newUser = new db.User(req.body);

    const userExists = await db.User.findOne({ email: newUser.email });
    if (userExists) return LogDanger('That user already exists');

    newUser.password = bcrypt.hashSync(newUser.password, 6);

    if (req.file) {
      newUser.avatar = req.file.path;
    }

    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    LogDanger('User register failed', error);
    return await { error: { code: 123, message: error } };
  }
};
