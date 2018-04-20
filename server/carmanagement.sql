/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : carmanagement

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-03-12 20:44:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for applyrecord
-- ----------------------------
DROP TABLE IF EXISTS `applyrecord`;
CREATE TABLE `applyrecord` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `carId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `state` bit(1) NOT NULL,
  `useTime` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carId` (`carId`),
  KEY `userId` (`userId`),
  CONSTRAINT `applyrecord_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `carbaseinfo` (`carId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `applyrecord_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for carbaseinfo
-- ----------------------------
DROP TABLE IF EXISTS `carbaseinfo`;
CREATE TABLE `carbaseinfo` (
  `carId` varchar(255) NOT NULL,
  `buyTime` datetime NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `brand` varchar(255) NOT NULL,
  `VehicleHealth` varchar(255) NOT NULL,
  PRIMARY KEY (`carId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `permissionId` tinyint(4) NOT NULL AUTO_INCREMENT,
  `permission` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`permissionId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for permissionrolelink
-- ----------------------------
DROP TABLE IF EXISTS `permissionrolelink`;
CREATE TABLE `permissionrolelink` (
  `permissionRoleLinkId` int(11) NOT NULL AUTO_INCREMENT,
  `roleId` tinyint(4) NOT NULL,
  `permissionId` tinyint(4) NOT NULL,
  PRIMARY KEY (`permissionRoleLinkId`),
  KEY `roleId` (`roleId`),
  KEY `permissionId` (`permissionId`),
  CONSTRAINT `permissionrolelink_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permissionrolelink_ibfk_2` FOREIGN KEY (`permissionId`) REFERENCES `permission` (`permissionId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `roleId` tinyint(4) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `userId` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `roleId` tinyint(4) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`userId`),
  KEY `key_role_id` (`roleId`),
  CONSTRAINT `key_role_id` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vehicledamagerecord
-- ----------------------------
DROP TABLE IF EXISTS `vehicledamagerecord`;
CREATE TABLE `vehicledamagerecord` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` varchar(255) NOT NULL,
  `damageTime` datetime NOT NULL,
  `userId` varchar(255) NOT NULL,
  `isPay` bit(1) NOT NULL,
  `payMoney` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carId` (`carId`),
  CONSTRAINT `vehicledamagerecord_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `carbaseinfo` (`carId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vehicleloanrecord
-- ----------------------------
DROP TABLE IF EXISTS `vehicleloanrecord`;
CREATE TABLE `vehicleloanrecord` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `carId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `action` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carId` (`carId`),
  CONSTRAINT `vehicleloanrecord_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `carbaseinfo` (`carId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vehiclemaintenancerecords
-- ----------------------------
DROP TABLE IF EXISTS `vehiclemaintenancerecords`;
CREATE TABLE `vehiclemaintenancerecords` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `carId` varchar(255) NOT NULL,
  `maintenanceTime` datetime NOT NULL,
  `maintenancePoint` varchar(255) NOT NULL,
  `maintenanceCost` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carId` (`carId`),
  CONSTRAINT `vehiclemaintenancerecords_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `carbaseinfo` (`carId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for vehicletravelrecord
-- ----------------------------
DROP TABLE IF EXISTS `vehicletravelrecord`;
CREATE TABLE `vehicletravelrecord` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `carId` varchar(255) NOT NULL,
  `time` datetime NOT NULL,
  `legitimate` bit(1) NOT NULL,
  `actionType` bit(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `carId` (`carId`),
  CONSTRAINT `vehicletravelrecord_ibfk_1` FOREIGN KEY (`carId`) REFERENCES `carbaseinfo` (`carId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
