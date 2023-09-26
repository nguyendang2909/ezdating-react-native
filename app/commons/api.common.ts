import { Entity } from 'app/types/entity.type';
import { Buffer } from 'buffer';
import _ from 'lodash';

export class CommonApi {
  protected encodeFromString(value: string): string {
    return Buffer.from(value, 'utf-8').toString('base64');
  }

  protected encodeFromObj(value: Record<string, unknown>): string {
    return this.encodeFromString(JSON.stringify(value));
  }

  protected getCursor<T extends Entity.BaseEntity[]>(
    data: T,
  ): string | undefined {
    if (!data?.length) {
      return undefined;
    }

    throw new Error('Not implemented!');
  }

  protected getCursorByField<T>(
    field: keyof T | (keyof T)[],
    data?: T[],
  ): string | undefined {
    const dataLength = data?.length;

    if (!dataLength) {
      return undefined;
    }

    const lastData = data[dataLength - 1];

    if (_.isArray(field)) {
      if (!field.length) {
        return undefined;
      }

      const obj: Partial<T> = {};
      for (const item of field) {
        obj[item] = lastData[item];
      }

      return this.encodeFromObj(obj);
    }

    const lastField = lastData[field]?.toString();

    return lastField ? this.encodeFromString(lastField) : undefined;
  }
}
