// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { GoogleCallbackData } from '@client/types/google';
import { AuthGoogleApi } from '@libs/openapi-generator/generated';
import Cookies from 'cookies';
import { JwtCookieToken } from '@libs/constants/auth';
import * as jwt from 'jsonwebtoken';
import { createApiFactory } from '@client/libs/axios/functions';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.redirect(405, '/405');
  }
  const data = req.body as GoogleCallbackData;
  if (typeof data !== 'object') {
    return res.redirect(400, '/400');
  }
  try {
    const response = await createApiFactory(AuthGoogleApi).login({
      googleLoginDto: { credential: data.credential },
    });
    const cookies = new Cookies(req, res);
    const token = response.data.data.token;
    const decodedToken = jwt.decode(token);
    if (!decodedToken || typeof decodedToken === 'string') {
      return res.status(401).send('UnAuthenticated!');
    }
    cookies.set(JwtCookieToken, token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: ((decodedToken.exp ?? 0) - (decodedToken.iat ?? 0)) * 1000,
      domain: process.env.COOKIE_DOMAIN || undefined,
    });
    return res.redirect(303, '/');
  } catch (e) {
    return res.redirect(401, '/401');
  }
};

export default handler;
