import Config from 'app/config';

class MediaFileUtil {
  getUrl(e?: string): string | undefined {
    return e ? `${Config.MEDIA_FILE_URL}/${e}` : undefined;
  }
}

export const mediaFileUtil = new MediaFileUtil();
