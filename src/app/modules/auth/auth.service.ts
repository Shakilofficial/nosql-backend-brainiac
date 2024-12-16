import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
  //checking if user exists
  const user = await User.isUserExistsByCustomId(payload?.id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }
  //checking if the user is already deleted

  if (user.isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is deleted');
  }
  //checking if the user status is blocked

  if (user.status === 'blocked') {
    throw new AppError(httpStatus.FORBIDDEN, 'User is blocked');
  }

  //checking if the password is matched
  /*   const isPasswordMatched = await User.isPasswordMatched(
    payload?.password,
    user.password,
  ); */

  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Wrong Credentials !');
  }
  //access granted send Access Token and Refresh Token
  //create token and send to the client
  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '10d',
  });

  return {
    accessToken,
    needsPasswordChange: user.needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
