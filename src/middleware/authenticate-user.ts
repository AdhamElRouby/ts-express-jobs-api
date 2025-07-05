import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomAPIError from '../errors/CustomAPIError';
import jwt, { type JwtPayload } from 'jsonwebtoken';

export interface UserPayload extends JwtPayload {
  userId: string;
  name: string;
}

const authenticateUser: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : ''; // Bearer {token}
  if (!token) {
    throw new CustomAPIError('Access token required', StatusCodes.UNAUTHORIZED);
  }
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as UserPayload;
    req.user = { ...decoded };
    next();
  } catch (err) {
    throw new CustomAPIError('Invalid or expired token', StatusCodes.FORBIDDEN);
  }
};

export default authenticateUser;
