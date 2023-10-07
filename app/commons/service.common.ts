import { APP_CONFIG } from 'app/config/config.app';
import moment from 'moment';

export class CommonService {
  staleTime: number;

  constructor() {
    this.staleTime = APP_CONFIG.STALE_TIME.DEFAULT;
  }

  public isStale(time: string): boolean {
    if (moment().diff(moment(time), 'milliseconds') < this.staleTime) {
      return false;
    }

    return true;
  }
}
