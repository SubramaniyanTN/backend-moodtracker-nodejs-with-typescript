import { log } from 'console';
import jwt from 'jsonwebtoken';

type AccessTokenGenerateType = {
  type: 'signup';
  data: {
    firstName: string;
    lastName: string;
    emailID: string;
    password: string;
  };
}|{
  type: 'login';
  data: {
    firstName: string;
    lastName: string;
    emailID: string;
    password: string;
  };
};
type RefreshTokenGenerateType = {
  type: 'signup';
  data: {
    firstName: string;
    lastName: string;
    emailID: string;
    password: string;
  };
}|{
  type: 'login';
  data: {
    firstName: string;
    lastName: string;
    emailID: string;
    password: string;
  };
};

export const accessTokenGenerator = (props: AccessTokenGenerateType) => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) throw Error('Please create a JWT secret for access token');
  const accessToken = jwt.sign(props.data, secret, { expiresIn: 60 });
  return accessToken;
};

export const refreshTokenGenerator = (props: RefreshTokenGenerateType) => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!secret) throw Error('Please create a JWT secret for refresh token');
  const refreshToken = jwt.sign(props.data, secret, { expiresIn: '24h' });
  return refreshToken;
};

export const accessTokenVerifier = (token: string) => {
  const secret = process.env.JWT_ACCESS_TOKEN_SECRET;
  if (!secret) throw Error('Please create a JWT secret for access token');
  const verifiedData = jwt.verify(token, secret);
  console.log('VERIFED DATA ??????', verifiedData);
  return verifiedData
};
export const refreshTokenVerifier = (token: string) => {
  const secret = process.env.JWT_REFRESH_TOKEN_SECRET;
  if (!secret) throw Error('Please create a JWT secret for refresh token');
  const verifiedData = jwt.verify(token, secret);
  console.log('VERIFED DATA ??????', verifiedData);
  return verifiedData
};
