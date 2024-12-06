CREATE DATABASE  IF NOT EXISTS `my_database` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `my_database`;
-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: my_database
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `createdUserId` int DEFAULT NULL,
  `documentStatus` tinyint(1) NOT NULL DEFAULT '1',
  `updatedAt` datetime(3) NOT NULL,
  `updatedUserId` int DEFAULT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `User_email_key` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john.doe@example.com','John Doe','2024-12-05 10:42:43.547',NULL,1,'2024-12-05 10:42:43.547',NULL,'$argon2id$v=19$m=65536,t=3,p=4$YKNa+d/qZcACKQScIKNf6A$20Z35BBQ01jgtQg6MR3/AaYThmIx9boPTXUzreT8trg'),(2,'arunjithsurendran22@gmail.com','arunjith','2024-12-05 10:43:38.093',NULL,1,'2024-12-05 10:43:38.093',NULL,'$argon2id$v=19$m=65536,t=3,p=4$PZXnaLX6KCB8S6NUrYAJjQ$b44q5l0sQdjb2AwYWOzvcQAjUW+K/PgfskKbU9OUruQ'),(3,'manu','manu@gmail.com','2024-12-06 09:16:28.806',NULL,1,'2024-12-06 09:16:28.806',NULL,'$argon2id$v=19$m=65536,t=3,p=4$2lN2PYBM27mAKK8LWoR9cg$QyG8yDnw+ICpzy2rA6LYSQuZEJPu4VKoVuQ17ZSOXL0'),(4,'varun','arunjithsurendran22@gmail.com','2024-12-06 09:20:29.574',NULL,1,'2024-12-06 09:20:29.574',NULL,'$argon2id$v=19$m=65536,t=3,p=4$/93ZyTy9RSShd6YJsJzjvw$PN4RhAobxT0ipSa7hRGxr7HbVqvehrcQQv3TgF1C46g');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-06 15:10:16
