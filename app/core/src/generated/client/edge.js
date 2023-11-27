
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
} = require('./runtime/edge')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.6.0
 * Query Engine version: e95e739751f42d8ca026f6b910f5a2dc5adeaeee
 */
Prisma.prismaVersion = {
  client: "5.6.0",
  engine: "e95e739751f42d8ca026f6b910f5a2dc5adeaeee"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ProjectScalarFieldEnum = {
  id: 'id',
  name: 'name',
  environment: 'environment',
  description: 'description',
  creator_id: 'creator_id',
  delete_status: 'delete_status',
  create_time: 'create_time',
  update_time: 'update_time',
  delete_time: 'delete_time'
};

exports.Prisma.ProjectAPIKeyScalarFieldEnum = {
  id: 'id',
  project_id: 'project_id',
  api_key: 'api_key',
  room_list: 'room_list',
  permission: 'permission',
  status: 'status',
  creator_id: 'creator_id',
  delete_status: 'delete_status',
  create_time: 'create_time',
  update_time: 'update_time',
  delete_time: 'delete_time'
};

exports.Prisma.RoomScalarFieldEnum = {
  id: 'id',
  name: 'name',
  project_id: 'project_id',
  status: 'status',
  creator_id: 'creator_id',
  delete_status: 'delete_status',
  create_time: 'create_time',
  update_time: 'update_time',
  delete_time: 'delete_time'
};

exports.Prisma.RoomDocScalarFieldEnum = {
  id: 'id',
  room_id: 'room_id',
  doc: 'doc',
  creator_id: 'creator_id',
  create_time: 'create_time',
  update_time: 'update_time'
};

exports.Prisma.RoomHookScalarFieldEnum = {
  id: 'id',
  room_id: 'room_id',
  header: 'header',
  body: 'body',
  url: 'url',
  method: 'method',
  type: 'type',
  creator_id: 'creator_id',
  delete_status: 'delete_status',
  create_time: 'create_time',
  update_time: 'update_time',
  delete_time: 'delete_time'
};

exports.Prisma.RoomMetadataScalarFieldEnum = {
  id: 'id',
  room_id: 'room_id',
  metadata: 'metadata',
  creator_id: 'creator_id',
  create_time: 'create_time',
  update_time: 'update_time'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  password: 'password',
  role: 'role',
  delete_status: 'delete_status',
  create_time: 'create_time',
  update_time: 'update_time',
  delete_time: 'delete_time'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};


exports.Prisma.ModelName = {
  Project: 'Project',
  ProjectAPIKey: 'ProjectAPIKey',
  Room: 'Room',
  RoomDoc: 'RoomDoc',
  RoomHook: 'RoomHook',
  RoomMetadata: 'RoomMetadata',
  User: 'User'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/pedrogao/projects/coblocks2/app/core/src/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "../../../.env",
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../../../prisma",
  "clientVersion": "5.6.0",
  "engineVersion": "e95e739751f42d8ca026f6b910f5a2dc5adeaeee",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "mysql",
  "postinstall": false,
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "Z2VuZXJhdG9yIGNsaWVudCB7CiAgcHJvdmlkZXIgPSAicHJpc21hLWNsaWVudC1qcyIKICBvdXRwdXQgICA9ICIuLi9zcmMvZ2VuZXJhdGVkL2NsaWVudCIKfQoKZGF0YXNvdXJjZSBkYiB7CiAgcHJvdmlkZXIgPSAibXlzcWwiCiAgdXJsICAgICAgPSBlbnYoIkRBVEFCQVNFX1VSTCIpCn0KCi8vLyBUaGlzIG1vZGVsIG9yIGF0IGxlYXN0IG9uZSBvZiBpdHMgZmllbGRzIGhhcyBjb21tZW50cyBpbiB0aGUgZGF0YWJhc2UsIGFuZCByZXF1aXJlcyBhbiBhZGRpdGlvbmFsIHNldHVwIGZvciBtaWdyYXRpb25zOiBSZWFkIG1vcmU6IGh0dHBzOi8vcHJpcy5seS9kL2RhdGFiYXNlLWNvbW1lbnRzCm1vZGVsIFByb2plY3QgewogIGlkICAgICAgICAgICAgQmlnSW50ICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpIEBkYi5VbnNpZ25lZEJpZ0ludAogIG5hbWUgICAgICAgICAgU3RyaW5nICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigzMikKICBlbnZpcm9ubWVudCAgIFN0cmluZyAgICBAZGIuVmFyQ2hhcigxNikKICBkZXNjcmlwdGlvbiAgIFN0cmluZyAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMjAwKQogIGNyZWF0b3JfaWQgICAgQmlnSW50ICAgIEBkYi5VbnNpZ25lZEJpZ0ludAogIGRlbGV0ZV9zdGF0dXMgSW50ICAgICAgIEBkZWZhdWx0KDApIEBkYi5UaW55SW50CiAgY3JlYXRlX3RpbWUgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpIEBkYi5EYXRlVGltZSgwKQogIHVwZGF0ZV90aW1lICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKSBAZGIuRGF0ZVRpbWUoMCkKICBkZWxldGVfdGltZSAgIERhdGVUaW1lPyBAZGIuRGF0ZVRpbWUoMCkKCiAgQEBtYXAoInRfcHJvamVjdCIpCn0KCi8vLyBUaGlzIG1vZGVsIG9yIGF0IGxlYXN0IG9uZSBvZiBpdHMgZmllbGRzIGhhcyBjb21tZW50cyBpbiB0aGUgZGF0YWJhc2UsIGFuZCByZXF1aXJlcyBhbiBhZGRpdGlvbmFsIHNldHVwIGZvciBtaWdyYXRpb25zOiBSZWFkIG1vcmU6IGh0dHBzOi8vcHJpcy5seS9kL2RhdGFiYXNlLWNvbW1lbnRzCm1vZGVsIFByb2plY3RBUElLZXkgewogIGlkICAgICAgICAgICAgQmlnSW50ICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpIEBkYi5VbnNpZ25lZEJpZ0ludAogIHByb2plY3RfaWQgICAgQmlnSW50ICAgIEBkZWZhdWx0KDApIEBkYi5VbnNpZ25lZEJpZ0ludAogIGFwaV9rZXkgICAgICAgU3RyaW5nICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyMDApCiAgcm9vbV9saXN0ICAgICBKc29uPwogIHBlcm1pc3Npb24gICAgSW50ICAgICAgIEBkZWZhdWx0KDApIEBkYi5UaW55SW50CiAgc3RhdHVzICAgICAgICBCb29sZWFuPyAgQGRlZmF1bHQodHJ1ZSkKICBjcmVhdG9yX2lkICAgIEJpZ0ludCAgICBAZGIuVW5zaWduZWRCaWdJbnQKICBkZWxldGVfc3RhdHVzIEludCAgICAgICBAZGVmYXVsdCgwKSBAZGIuVGlueUludAogIGNyZWF0ZV90aW1lICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKSBAZGIuRGF0ZVRpbWUoMCkKICB1cGRhdGVfdGltZSAgIERhdGVUaW1lICBAZGVmYXVsdChub3coKSkgQGRiLkRhdGVUaW1lKDApCiAgZGVsZXRlX3RpbWUgICBEYXRlVGltZT8gQGRiLkRhdGVUaW1lKDApCgogIEBAaW5kZXgoW3Byb2plY3RfaWRdLCBtYXA6ICJpZHhfcHJvamVjdF9pZCIpCiAgQEBtYXAoInRfcHJvamVjdF9hcGlfa2V5IikKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgUm9vbSB7CiAgaWQgICAgICAgICAgICBCaWdJbnQgICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkgQGRiLlVuc2lnbmVkQmlnSW50CiAgbmFtZSAgICAgICAgICBTdHJpbmcgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDIwMCkKICBwcm9qZWN0X2lkICAgIEJpZ0ludCAgICBAZGIuVW5zaWduZWRCaWdJbnQKICBzdGF0dXMgICAgICAgIEJvb2xlYW4/ICBAZGVmYXVsdCh0cnVlKQogIGNyZWF0b3JfaWQgICAgQmlnSW50ICAgIEBkYi5VbnNpZ25lZEJpZ0ludAogIGRlbGV0ZV9zdGF0dXMgSW50ICAgICAgIEBkZWZhdWx0KDApIEBkYi5UaW55SW50CiAgY3JlYXRlX3RpbWUgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpIEBkYi5EYXRlVGltZSgwKQogIHVwZGF0ZV90aW1lICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKSBAZGIuRGF0ZVRpbWUoMCkKICBkZWxldGVfdGltZSAgIERhdGVUaW1lPyBAZGIuRGF0ZVRpbWUoMCkKCiAgQEB1bmlxdWUoW25hbWUsIGNyZWF0b3JfaWRdLCBtYXA6ICJpZHhfbmFtZV9jcmVhdG9yX2lkIikKICBAQG1hcCgidF9yb29tIikKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgUm9vbURvYyB7CiAgaWQgICAgICAgICAgQmlnSW50ICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkgQGRiLlVuc2lnbmVkQmlnSW50CiAgcm9vbV9pZCAgICAgQmlnSW50ICAgQGRiLlVuc2lnbmVkQmlnSW50CiAgZG9jICAgICAgICAgU3RyaW5nPyAgQGRiLlRleHQKICBjcmVhdG9yX2lkICBCaWdJbnQgICBAZGIuVW5zaWduZWRCaWdJbnQKICBjcmVhdGVfdGltZSBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQGRiLkRhdGVUaW1lKDApCiAgdXBkYXRlX3RpbWUgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEBkYi5EYXRlVGltZSgwKQoKICBAQGluZGV4KFtyb29tX2lkXSwgbWFwOiAiaWR4X3Jvb21faWQiKQogIEBAbWFwKCJ0X3Jvb21fZG9jIikKfQoKLy8vIFRoaXMgbW9kZWwgb3IgYXQgbGVhc3Qgb25lIG9mIGl0cyBmaWVsZHMgaGFzIGNvbW1lbnRzIGluIHRoZSBkYXRhYmFzZSwgYW5kIHJlcXVpcmVzIGFuIGFkZGl0aW9uYWwgc2V0dXAgZm9yIG1pZ3JhdGlvbnM6IFJlYWQgbW9yZTogaHR0cHM6Ly9wcmlzLmx5L2QvZGF0YWJhc2UtY29tbWVudHMKbW9kZWwgUm9vbUhvb2sgewogIGlkICAgICAgICAgICAgQmlnSW50ICAgIEBpZCBAZGVmYXVsdChhdXRvaW5jcmVtZW50KCkpIEBkYi5VbnNpZ25lZEJpZ0ludAogIHJvb21faWQgICAgICAgQmlnSW50ICAgIEBkYi5VbnNpZ25lZEJpZ0ludAogIGhlYWRlciAgICAgICAgSnNvbj8KICBib2R5ICAgICAgICAgIEpzb24/CiAgdXJsICAgICAgICAgICBTdHJpbmcgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDIwMCkKICBtZXRob2QgICAgICAgIFN0cmluZyAgICBAZGVmYXVsdCgiIikgQGRiLlZhckNoYXIoMTApCiAgdHlwZSAgICAgICAgICBTdHJpbmcgICAgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDIwKQogIGNyZWF0b3JfaWQgICAgQmlnSW50ICAgIEBkYi5VbnNpZ25lZEJpZ0ludAogIGRlbGV0ZV9zdGF0dXMgSW50ICAgICAgIEBkZWZhdWx0KDApIEBkYi5UaW55SW50CiAgY3JlYXRlX3RpbWUgICBEYXRlVGltZSAgQGRlZmF1bHQobm93KCkpIEBkYi5EYXRlVGltZSgwKQogIHVwZGF0ZV90aW1lICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKSBAZGIuRGF0ZVRpbWUoMCkKICBkZWxldGVfdGltZSAgIERhdGVUaW1lPyBAZGIuRGF0ZVRpbWUoMCkKCiAgQEBpbmRleChbcm9vbV9pZCwgZGVsZXRlX3N0YXR1c10sIG1hcDogImlkeF9yb29tX2lkX2RlbGV0ZV9zdGF0dXMiKQogIEBAbWFwKCJ0X3Jvb21faG9vayIpCn0KCi8vLyBUaGlzIG1vZGVsIG9yIGF0IGxlYXN0IG9uZSBvZiBpdHMgZmllbGRzIGhhcyBjb21tZW50cyBpbiB0aGUgZGF0YWJhc2UsIGFuZCByZXF1aXJlcyBhbiBhZGRpdGlvbmFsIHNldHVwIGZvciBtaWdyYXRpb25zOiBSZWFkIG1vcmU6IGh0dHBzOi8vcHJpcy5seS9kL2RhdGFiYXNlLWNvbW1lbnRzCm1vZGVsIFJvb21NZXRhZGF0YSB7CiAgaWQgICAgICAgICAgQmlnSW50ICAgQGlkIEBkZWZhdWx0KGF1dG9pbmNyZW1lbnQoKSkgQGRiLlVuc2lnbmVkQmlnSW50CiAgcm9vbV9pZCAgICAgQmlnSW50ICAgQGRiLlVuc2lnbmVkQmlnSW50CiAgbWV0YWRhdGEgICAgSnNvbj8KICBjcmVhdG9yX2lkICBCaWdJbnQgICBAZGIuVW5zaWduZWRCaWdJbnQKICBjcmVhdGVfdGltZSBEYXRlVGltZSBAZGVmYXVsdChub3coKSkgQGRiLkRhdGVUaW1lKDApCiAgdXBkYXRlX3RpbWUgRGF0ZVRpbWUgQGRlZmF1bHQobm93KCkpIEBkYi5EYXRlVGltZSgwKQoKICBAQGluZGV4KFtyb29tX2lkXSwgbWFwOiAiaWR4X3Jvb21faWQiKQogIEBAbWFwKCJ0X3Jvb21fbWV0YWRhdGEiKQp9CgovLy8gVGhpcyBtb2RlbCBvciBhdCBsZWFzdCBvbmUgb2YgaXRzIGZpZWxkcyBoYXMgY29tbWVudHMgaW4gdGhlIGRhdGFiYXNlLCBhbmQgcmVxdWlyZXMgYW4gYWRkaXRpb25hbCBzZXR1cCBmb3IgbWlncmF0aW9uczogUmVhZCBtb3JlOiBodHRwczovL3ByaXMubHkvZC9kYXRhYmFzZS1jb21tZW50cwptb2RlbCBVc2VyIHsKICBpZCAgICAgICAgICAgIEJpZ0ludCAgICBAaWQgQGRlZmF1bHQoYXV0b2luY3JlbWVudCgpKSBAZGIuVW5zaWduZWRCaWdJbnQKICBuYW1lICAgICAgICAgIFN0cmluZyAgICBAdW5pcXVlKG1hcDogImlkeF9uYW1lIikgQGRlZmF1bHQoIiIpIEBkYi5WYXJDaGFyKDMyKQogIHBhc3N3b3JkICAgICAgU3RyaW5nICAgIEBkZWZhdWx0KCIiKSBAZGIuVmFyQ2hhcigyMDApCiAgcm9sZSAgICAgICAgICBJbnQgICAgICAgQGRlZmF1bHQoMCkgQGRiLlRpbnlJbnQKICBkZWxldGVfc3RhdHVzIEludCAgICAgICBAZGVmYXVsdCgwKSBAZGIuVGlueUludAogIGNyZWF0ZV90aW1lICAgRGF0ZVRpbWUgIEBkZWZhdWx0KG5vdygpKSBAZGIuRGF0ZVRpbWUoMCkKICB1cGRhdGVfdGltZSAgIERhdGVUaW1lICBAZGVmYXVsdChub3coKSkgQGRiLkRhdGVUaW1lKDApCiAgZGVsZXRlX3RpbWUgICBEYXRlVGltZT8gQGRiLkRhdGVUaW1lKDApCgogIEBAbWFwKCJ0X3VzZXIiKQp9Cg==",
  "inlineSchemaHash": "845cf448ca35270ba60e46045427e2e2724bff0d1ac2101ac889a8a258c7b4bd",
  "noEngine": false
}
config.dirname = '/'

config.runtimeDataModel = JSON.parse("{\"models\":{\"Project\":{\"dbName\":\"t_project\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"environment\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"ProjectAPIKey\":{\"dbName\":\"t_project_api_key\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":\"0\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"api_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"room_list\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"permission\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"Room\":{\"dbName\":\"t_room\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"project_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"default\":true,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"name\",\"creator_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"name\",\"creator_id\"]}],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"RoomDoc\":{\"dbName\":\"t_room_doc\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"room_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"doc\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"RoomHook\":{\"dbName\":\"t_room_hook\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"room_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"header\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"body\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"url\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"method\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"RoomMetadata\":{\"dbName\":\"t_room_metadata\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"room_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"metadata\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Json\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"},\"User\":{\"dbName\":\"t_user\",\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"BigInt\",\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":\"\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_status\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"default\":0,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"update_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"delete_time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false,\"documentation\":\"This model or at least one of its fields has comments in the database, and requires an additional setup for migrations: Read more: https://pris.ly/d/database-comments\"}},\"enums\":{},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.getQueryEngineWasmModule = undefined

config.injectableEdgeEnv = () => ({
  parsed: {
    DATABASE_URL: typeof globalThis !== 'undefined' && globalThis['DATABASE_URL'] || typeof process !== 'undefined' && process.env && process.env.DATABASE_URL || undefined
  }
})

if (typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined) {
  Debug.enable(typeof globalThis !== 'undefined' && globalThis['DEBUG'] || typeof process !== 'undefined' && process.env && process.env.DEBUG || undefined)
}

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

