export enum ApiErrorCode {
  TIMEOUT = -1, // 系统繁忙

  SUCCESS = 1, // 成功

  FAIL = 0, // 失败

  NOT_EMPTY = 20000, // 不能为空

  IS_NOT_DATE_STRING = 20001, // 时间字符串格式错误

  IS_BOOLEAN = 20002, // 应该为bool类型

  IS_NOT_OBJECTID_STRING = 20003, // 不是objectId字符串

  STRING_TOO_LONG = 20004, // 字符过长
}
