-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: lostandfounddb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoryName` (`categoryName`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (3,'Clothing'),(5,'Documents'),(1,'Electronics'),(7,'Jewelry'),(4,'Keys'),(9,'Others'),(6,'Pets'),(8,'Toys'),(2,'Wallets');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `claimrequests`
--

DROP TABLE IF EXISTS `claimrequests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `claimrequests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `foundID` int(11) DEFAULT NULL,
  `status` enum('Pending','Approved','Rejected') DEFAULT 'Pending',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `foundID` (`foundID`),
  CONSTRAINT `claimrequests_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `claimrequests_ibfk_2` FOREIGN KEY (`foundID`) REFERENCES `founditems` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `claimrequests`
--

LOCK TABLES `claimrequests` WRITE;
/*!40000 ALTER TABLE `claimrequests` DISABLE KEYS */;
INSERT INTO `claimrequests` VALUES (1,1,1,'Pending','2025-04-03 12:30:11'),(2,2,2,'Approved','2025-04-03 12:30:11');
/*!40000 ALTER TABLE `claimrequests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `founditems`
--

DROP TABLE IF EXISTS `founditems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `founditems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `founditems_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `founditems_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `founditems`
--

LOCK TABLES `founditems` WRITE;
/*!40000 ALTER TABLE `founditems` DISABLE KEYS */;
INSERT INTO `founditems` VALUES (1,2,1,'Samsung Galaxy','Phone found near coffee shop','Downtown Cafe','2025-04-03 12:30:11'),(2,3,2,'Black Wallet','Wallet with credit cards inside','Library Reception','2025-04-03 12:30:11');
/*!40000 ALTER TABLE `founditems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lostitems`
--

DROP TABLE IF EXISTS `lostitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lostitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `categoryID` int(11) NOT NULL,
  `itemName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  KEY `categoryID` (`categoryID`),
  CONSTRAINT `lostitems_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `lostitems_ibfk_2` FOREIGN KEY (`categoryID`) REFERENCES `categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lostitems`
--

LOCK TABLES `lostitems` WRITE;
/*!40000 ALTER TABLE `lostitems` DISABLE KEYS */;
INSERT INTO `lostitems` VALUES (1,1,1,'iPhone 13','Lost in the park','Central Park','2025-04-03 12:30:11'),(2,2,2,'Leather Wallet','Brown leather wallet with ID inside','Mall Entrance','2025-04-03 12:30:11'),(3,1,4,'Car Keys','Set of car keys with a Tesla logo','Office Parking','2025-04-03 12:30:11');
/*!40000 ALTER TABLE `lostitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `role` enum('User','Admin') DEFAULT 'User',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Alice Johnson','alice@example.com','hashedpassword123',1,'User','2025-04-03 12:30:11'),(2,'Bob Smith','bob@example.com','hashedpassword456',0,'User','2025-04-03 12:30:11'),(3,'Admin User','admin@example.com','hashedpassword789',1,'Admin','2025-04-03 12:30:11');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'lostandfounddb'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-03 14:31:51
