CREATE DATABASE `smartnotebook` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `note` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(105) DEFAULT NULL,
  `content` text,
  `createdby` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
