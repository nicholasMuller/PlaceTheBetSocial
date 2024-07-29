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
  console.log(req.body);
  try {
    const { email, password, username, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
    const user = await User.create({ email, password: hashedPassword, username, createdAt });
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
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports.Login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ message: 'All fields are required' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      return res.json({ message: 'Incorrect password or email' });
    }
    const token = createSecretToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,  // Should be true for security
    });
    res.status(201).json({ message: 'User logged in successfully', success: true });
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
