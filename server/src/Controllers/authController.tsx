import { Request, Response, NextFunction } from 'express';
import { User, IUser } from '../Models/userModel';
import { createSecretToken } from '../utils/secretToken';
import bcrypt from 'bcryptjs';

interface SignupRequestBody {
  email: IUser['email'];
  password: IUser['password'];
  username: IUser['username'];
  createdAt: IUser['createdAt'];
}

module.exports.Signup = async (
  req: Request<{}, {}, SignupRequestBody>,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body)
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    const user = await User.create({ email, password, username, createdAt });
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,  // Recommended to be true for security
    });
    res
      .status(201)
      .json({ message: 'User signed in successfully', success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
