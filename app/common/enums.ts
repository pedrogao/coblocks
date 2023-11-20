// 角色：0-普通，1-管理员，2-超管
export enum Role {
  Common = 0,
  Admin = 1,
  Super = 2,
}

// 权限：0-none，1-read-only，2-read-write
export enum Permission {
  None = 0,
  ReadOnly = 1,
  ReadWrite = 2,
}

// 项目环境，dev-开发，test-测试，prod-生产
export enum Environment {
  Dev = 'dev',
  Test = 'test',
  Prod = 'prod',
}

// 状态：0-正常，1-删除，2-归档
export enum DeleteStatus {
  Normal = 0,
  Deleted = 1,
  Archived = 2,
}

// 状态：0-关闭，1-打开
export enum RoomStatus {
  Closed = 0,
  Opened = 1,
}
