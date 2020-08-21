/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace NodeJS {
    interface Global {
      token: string; // token
      isDev: boolean; // 开发环境
    }
  }
}

export {};
