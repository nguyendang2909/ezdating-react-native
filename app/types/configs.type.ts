import { FC, ReactNode } from 'react';

export declare namespace Config {
  type Route = {
    path: string;
    auth?: boolean;
    childrens?: Route[];
    description?: string;
    layout?: FC<{ children: ReactNode }>;
    // roles?: ERole[];
    // title?: string;
  };
}
