// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import Cookies from 'cookies';
import { JwtCookieToken } from '@libs/constants/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(404).send('Not Found!');
  }
  const cookies = new Cookies(req, res);
  cookies.set(JwtCookieToken, undefined, {
    maxAge: 0,
    httpOnly: true,
    domain: process.env.COOKIE_DOMAIN || undefined,
  });
  return res.redirect(303, '/');
};

export default handler;
