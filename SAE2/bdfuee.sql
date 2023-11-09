-- Création de la table `client` avec clé primaire auto-incrémentée
CREATE TABLE `client` (
  `ID_Client` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) DEFAULT NULL,
  `Prenom` varchar(255) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Points_Fidelite` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Client`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Création de la table `commande` avec clé primaire auto-incrémentée
CREATE TABLE `commande` (
  `ID_Commande` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Client` int(11) DEFAULT NULL,
  `Date_Commande` datetime DEFAULT NULL,
  `Statut` varchar(50) DEFAULT NULL,
  `Montant_Total` decimal(10,2) DEFAULT NULL,
  `Points_Gagnes` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Commande`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Création de la table `plat` avec clé primaire auto-incrémentée
CREATE TABLE `plat` (
  `ID_Plat` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) DEFAULT NULL,
  `illustration` varchar(250) NOT NULL,
  `Description` text DEFAULT NULL,
  `Categorie` varchar(50) DEFAULT NULL,
  `Prix` decimal(10,2) DEFAULT NULL,
  `offres` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID_Plat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Création de la table `commande_plat` avec clé primaire auto-incrémentée
CREATE TABLE `commande_plat` (
  `ID_Commande_Plat` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Commande` int(11) DEFAULT NULL,
  `ID_Plat` int(11) DEFAULT NULL,
  `Quantite` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Commande_Plat`),
  KEY `ID_Commande` (`ID_Commande`),
  KEY `ID_Plat` (`ID_Plat`),
  CONSTRAINT `commande_plat_ibfk_1` FOREIGN KEY (`ID_Commande`) REFERENCES `commande` (`ID_Commande`) ON DELETE SET NULL,
  CONSTRAINT `commande_plat_ibfk_2` FOREIGN KEY (`ID_Plat`) REFERENCES `plat` (`ID_Plat`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Création de la table `file_d_attente` avec clé primaire auto-incrémentée
CREATE TABLE `file_d_attente` (
  `ID_File_d_attente` int(11) NOT NULL AUTO_INCREMENT,
  `ID_Commande` int(11) DEFAULT NULL,
  `Heure_Arrivee` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_File_d_attente`),
  KEY `ID_Commande` (`ID_Commande`),
  CONSTRAINT `file_d_attente_ibfk_1` FOREIGN KEY (`ID_Commande`) REFERENCES `commande` (`ID_Commande`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Création de la table `systeme_fidelite` avec clé primaire
CREATE TABLE `systeme_fidelite` (
  `ID_Client` int(11) NOT NULL,
  `Points` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID_Client`),
  CONSTRAINT `systeme_fidelite_ibfk_1` FOREIGN KEY (`ID_Client`) REFERENCES `client` (`ID_Client`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
