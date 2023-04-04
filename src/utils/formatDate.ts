import moment from 'moment';
import { Moment } from 'moment';

const dateFormat: string = 'YYYY-MM-DD';

export const formatDate = (date: Date): string => {
    return moment(date).format(dateFormat);
  }