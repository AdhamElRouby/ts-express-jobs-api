import { Request, Response } from 'express';
import CustomAPIError from '../errors/CustomAPIError';
import { StatusCodes } from 'http-status-codes';
import User, { type UserType } from '../models/User';

export const register = async (req: Request<{},{},UserType>, res: Response) => {
  // save the user in the collection --> middleware to hash the password
  const user = await User.create(req.body);
  // generate token for them --> user special method
  const token = user.createJWT();
  // return the token and user's name
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

export const login = async (req: Request<{},{},{email: string, password: string}>, res: Response) => {
    // get the email and password
    const { email, password } = req.body || {};
    if(!email || !password) {
      throw new CustomAPIError('Bad Request. Please provide email and password', StatusCodes.BAD_REQUEST);
    }
    // find a user && compare password
    const user = await User.findOne({ email });
    const isValidCredentials = user && await user.comparePassword(password);
    if (!isValidCredentials) {
        throw new CustomAPIError('Invalid Credentials', StatusCodes.UNAUTHORIZED);
    }
    // create jwt tokke
    const token = user.createJWT();
    // return the token and user's name
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};
