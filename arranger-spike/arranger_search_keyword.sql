SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `arranger`;
CREATE DATABASE `arranger` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `arranger`;

DROP TABLE IF EXISTS `search_keyword`;
CREATE TABLE `search_keyword` (
  `keyword` varchar(400) DEFAULT NULL,
  `bio_data_id` bigint(20) DEFAULT NULL,
  `unique_id` varchar(500) NOT NULL,
  `search_keyword_id` bigint(20) NOT NULL,
  `data_category` varchar(200) NOT NULL,
  `source_code` varchar(100) DEFAULT NULL,
  `display_data_category` varchar(200) DEFAULT NULL,
  `owner_auth_user_id` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;