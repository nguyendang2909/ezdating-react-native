import { AGES } from 'app/constants';
import moment from 'moment';

export const getMinBirthDateTime = (): Date => {
  return moment().subtract(AGES.MIN, 'years').utc().startOf('date').toDate();
};

export const getMaxBirthDateTime = (): Date => {
  return moment().subtract(AGES.MAX, 'years').utc().startOf('date').toDate();
};

export const getAgeFromTime = (time: string): number => {
  return moment().diff(time, 'years');
};
