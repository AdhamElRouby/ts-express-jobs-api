import { InferSchemaType, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';

interface IUserMethods {
  createJWT(): string;
  comparePassword(password: string): Promise<boolean>
}

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    maxLength: 50,
    minLength: 3,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minLength: 6,
  },
});

userSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.createJWT = function (): string {
  return jwt.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_LIFETIME as SignOptions['expiresIn'] }
  );
};

userSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
}

export type UserType = InferSchemaType<typeof userSchema> & IUserMethods;

const User = model<UserType>('User', userSchema);

export default User;
