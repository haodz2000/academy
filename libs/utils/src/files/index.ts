import * as crypto from 'crypto';
import axios from 'axios';
import * as fs from 'fs';

export const getFileHash = (length = 16) => {
  return crypto
    .randomBytes(length)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

export const downloadFileFromUrl = async (url: string): Promise<Buffer> => {
  const response = await axios.get(url, {
    responseType: 'arraybuffer',
  });
  return Buffer.from(response.data, 'binary');
};
