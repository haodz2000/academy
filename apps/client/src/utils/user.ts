import * as moment from 'moment';

export const getProfile = (email: string) => {
  if (email) {
    return email.split('@')[0];
  }
  return '';
};
