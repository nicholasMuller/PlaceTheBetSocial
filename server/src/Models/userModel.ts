import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  createdAt: Date;
}

const userSchema: Schema = new Schema({
  email: {
    type: String,
    required: [true, 'Your email address is required'],
    unique: true,
  },
  username: {
    type: String,
    required: [true, 'Your username is required'],
  },
  password: {
    type: String,
    required: [true, 'Your password is required'],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.pre<IUser>('save', async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model<IUser>('User', userSchema);
export { User, IUser };
