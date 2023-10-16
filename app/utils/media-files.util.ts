import Config from 'app/config';

class MediaFileUtil {
  getUrl(e?: string): string | undefined {
    if (!e) {
      return undefined;
    }
    return `${Config.MEFIA_FILE_URL}/${e}`;
  }
}

export const mediaFileUtil = new MediaFileUtil();
