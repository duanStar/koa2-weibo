/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50540
 Source Host           : localhost:3306
 Source Schema         : koa2_weibo_db

 Target Server Type    : MySQL
 Target Server Version : 50540
 File Encoding         : 65001

 Date: 23/09/2021 23:01:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for atrelations
-- ----------------------------
DROP TABLE IF EXISTS `atrelations`;
CREATE TABLE `atrelations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '用户 Id',
  `blogId` int(11) NOT NULL COMMENT '微博 Id',
  `isRead` tinyint(1) NOT NULL DEFAULT 0 COMMENT '是否已读',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `blogId`(`blogId`) USING BTREE,
  CONSTRAINT `atrelations_ibfk_1` FOREIGN KEY (`blogId`) REFERENCES `blogs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of atrelations
-- ----------------------------
INSERT INTO `atrelations` VALUES (1, 2, 3, 1, '2021-08-02 05:51:16', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (2, 2, 4, 1, '2021-08-02 05:51:40', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (3, 1, 5, 0, '2021-08-02 07:08:46', '2021-08-02 07:08:46');
INSERT INTO `atrelations` VALUES (4, 2, 5, 1, '2021-08-02 07:08:46', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (5, 2, 6, 1, '2021-08-02 07:09:01', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (6, 1, 6, 0, '2021-08-02 07:09:01', '2021-08-02 07:09:01');
INSERT INTO `atrelations` VALUES (7, 2, 6, 1, '2021-08-02 07:09:01', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (8, 2, 7, 1, '2021-08-02 07:10:41', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (9, 2, 8, 1, '2021-08-02 07:21:24', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (10, 1, 8, 0, '2021-08-02 07:21:24', '2021-08-02 07:21:24');
INSERT INTO `atrelations` VALUES (11, 2, 8, 1, '2021-08-02 07:21:24', '2021-08-02 07:38:01');
INSERT INTO `atrelations` VALUES (12, 2, 10, 0, '2021-08-02 07:58:35', '2021-08-02 07:58:35');

-- ----------------------------
-- Table structure for blogs
-- ----------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '用户Id',
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '微博内容',
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片地址',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of blogs
-- ----------------------------
INSERT INTO `blogs` VALUES (1, 1, '我是张三', '', '2021-08-02 05:21:53', '2021-08-02 05:21:53');
INSERT INTO `blogs` VALUES (2, 2, '我是李四', '', '2021-08-02 05:22:07', '2021-08-02 05:22:07');
INSERT INTO `blogs` VALUES (3, 2, '你好 // @李四 - lisi : 我是李四', '', '2021-08-02 05:51:16', '2021-08-02 05:51:16');
INSERT INTO `blogs` VALUES (4, 1, '你好 // @李四 - lisi : 我是李四', '', '2021-08-02 05:51:40', '2021-08-02 05:51:40');
INSERT INTO `blogs` VALUES (5, 2, 'Hello // @张三 - zs : 你好 // @李四 - lisi : 我是李四', '', '2021-08-02 07:08:46', '2021-08-02 07:08:46');
INSERT INTO `blogs` VALUES (6, 1, '哈哈哈 // @李四 - lisi : Hello // @张三 - zs : 你好 // @李四 - lisi : 我是李四', '', '2021-08-02 07:09:01', '2021-08-02 07:09:01');
INSERT INTO `blogs` VALUES (7, 1, '针不戳 // @李四 - lisi : 我是李四', '', '2021-08-02 07:10:41', '2021-08-02 07:10:41');
INSERT INTO `blogs` VALUES (8, 1, '哈哈哈哈 // @李四 - lisi : Hello // @张三 - zs : 你好 // @李四 - lisi : 我是李四', '', '2021-08-02 07:21:24', '2021-08-02 07:21:24');
INSERT INTO `blogs` VALUES (9, 1, '单元测试自动创建微博_1627890218439', '/xxxx.png', '2021-08-02 07:43:38', '2021-08-02 07:43:38');
INSERT INTO `blogs` VALUES (10, 1, '单元测试自动创建的微博 @李四 - lisi', NULL, '2021-08-02 07:58:35', '2021-08-02 07:58:35');
INSERT INTO `blogs` VALUES (11, 1, '单元测试自动创建微博_1627891117461', '/xxxx.png', '2021-08-02 07:58:37', '2021-08-02 07:58:37');

-- ----------------------------
-- Table structure for userrelations
-- ----------------------------
DROP TABLE IF EXISTS `userrelations`;
CREATE TABLE `userrelations`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL COMMENT '用户Id',
  `followerId` int(11) NOT NULL COMMENT '被关注用户Id',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  INDEX `followerId`(`followerId`) USING BTREE,
  CONSTRAINT `userrelations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `userrelations_ibfk_2` FOREIGN KEY (`followerId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of userrelations
-- ----------------------------
INSERT INTO `userrelations` VALUES (1, 1, 1, '2021-08-02 05:20:30', '2021-08-02 05:20:30');
INSERT INTO `userrelations` VALUES (2, 2, 2, '2021-08-02 05:20:38', '2021-08-02 05:20:38');
INSERT INTO `userrelations` VALUES (4, 2, 1, '2021-08-02 06:15:34', '2021-08-02 06:15:34');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名 唯一',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `nickName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '昵称',
  `gender` decimal(10, 0) NOT NULL DEFAULT 3 COMMENT '性别(1=>女性，2=>男性，3=>保密)',
  `picture` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像',
  `city` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '城市',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `userName`(`userName`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'zs', 'cc20020f8d1b845d9c2ba531e7932a9f', '张三', 1, 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg', '北京', '2021-08-02 05:20:30', '2021-08-02 05:21:46');
INSERT INTO `users` VALUES (2, 'lisi', 'cc20020f8d1b845d9c2ba531e7932a9f', '李四', 1, 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=550723927,1346838877&fm=27&gp=0.jpg', '北京', '2021-08-02 05:20:38', '2021-08-02 05:22:01');

SET FOREIGN_KEY_CHECKS = 1;
