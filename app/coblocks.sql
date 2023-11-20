CREATE TABLE `t_user` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '用户名',
  `password` varchar(200) NOT NULL DEFAULT '' COMMENT '密码',
  `role` tinyint(4) NOT NULL DEFAULT '0' COMMENT '角色：0-普通，1-管理员，2-超管',

  `delete_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-正常，1-删除，2-归档',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';

CREATE TABLE `t_project` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  `name` varchar(32) NOT NULL DEFAULT '' COMMENT '项目名称',
  `environment` varchar(16) NOT NULL COMMENT '项目环境，dev-开发，test-测试，prod-生产',
  `description` varchar(200) NOT NULL DEFAULT '' COMMENT '项目描述',

  `creator_id` bigint(20) unsigned NOT NULL COMMENT '创建人',
  `delete_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-正常，1-删除，2-归档',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目表';

CREATE TABLE `t_project_api_key` (
  `id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '自增ID',
  `project_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '房间ID',
  `room_list` json COMMENT '房间列表',
  `permission` tinyint(4) NOT NULL DEFAULT '0' COMMENT '权限：0-none，1-read-only，2-read-write',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态：0-打开，1-关闭',

  `creator_id` bigint(20) unsigned NOT NULL COMMENT '创建人',
  `delete_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-正常，1-删除，2-归档',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `idx_project_id` (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目api_key表';

CREATE TABLE `t_room` (
  `id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '房间ID',
  `name` varchar(200) NOT NULL DEFAULT '' COMMENT '房间名',
  `project_id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '项目ID',
  `status` tinyint(1) DEFAULT '1' COMMENT '状态：0-关闭，1-打开',
  `creator_id` bigint(20) unsigned NOT NULL COMMENT '创建人',
  `delete_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-正常，1-删除，2-归档',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_name_creator_id` (`name`,`creator_id`),
  KEY `idx_project_id_status` (`project_id`,`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房间表';

CREATE TABLE `t_room_doc` (
  `id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '自增ID',
  `room_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '房间ID',
  `doc` text COMMENT '文档数据',

  `creator_id` bigint(20) unsigned NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_room_id` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房间文档表';

CREATE TABLE `t_room_metadata` (
  `id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '自增ID',
  `room_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '房间ID',
  `metadata` json COMMENT '元信息',

  `creator_id` bigint(20) unsigned NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `idx_room_id` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房间元信息表';

CREATE TABLE `t_room_hook` (
  `id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '自增ID',
  `room_id` bigint(20) unsigned NOT NULL DEFAULT '0' COMMENT '房间ID',
  `header` json COMMENT '请求头',
  `body` json COMMENT '请求体',
  `url` varchar(200) NOT NULL DEFAULT '' COMMENT 'url',
  `method` varchar(10) NOT NULL DEFAULT '' COMMENT '请求方法',
  `type` varchar(20) NOT NULL DEFAULT '' COMMENT 'hook类型',

  `creator_id` bigint(20) unsigned NOT NULL COMMENT '创建人',
  `delete_status` tinyint(4) NOT NULL DEFAULT '0' COMMENT '状态：0-正常，1-删除，2-归档',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `delete_time` datetime DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `idx_room_id_delete_status` (`room_id`, `delete_status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='房间hook表';

