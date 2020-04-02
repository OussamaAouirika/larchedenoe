-- Name : MYSQL DATABASE 
-- Project : L'ARCHE DE NOE
-- Author : Aouirika Oussama
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2018 at 08:09 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: animaldb
--

-- --------------------------------------------------------

--
-- Table structure for table animal
--

CREATE TABLE animal (
  idAnimal int(11) NOT NULL,
  nom varchar(100) NOT NULL,
  age int(10) NOT NULL,
  poids float(10) NOT NULL,
  regneAnimal int(10) NOT NULL,
  proprietaire int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table animal
--

INSERT INTO animal (idAnimal, nom, age, poids, regneAnimal, proprietaire) VALUES
(1, 'Pilouf', 2, 13, 3, 2),
(2, 'Lapinou', 1, 3, 2, 1),
(3, 'Minet', 7, 5, 1, 3),
(4, 'Nemo', 1, 0.1, 4, 2),
(5, 'Tortank', 154, 44, 5, 4),
(6, 'Cobra', 12, 7, 5, 5),
(7, 'Rio', 4, 0.8, 6, 6),
(8, 'Simba', 6, 88, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table regne
--

CREATE TABLE regne (
  idRegne int(11) NOT NULL,
  nomregne varchar(100) NOT NULL,
  provenance varchar(100) NOT NULL,
  espace varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table regne
--

INSERT INTO regne (idRegne, nomregne, provenance, espace) VALUES
(1, 'Félin', 'Inde ou Afrique du Nord', 'Grand Espace'),
(2, 'Rongeur', 'Europe de l Ouest', 'Cage ou Intérieur'),
(3, 'Canidé', 'Europe ou Asie Centrale', 'Niche ou Intérieur'),
(4, 'Poisson', 'Océanie ou Amérique Latine', 'Aquarium'),
(5, 'Réptile', 'Amérique ou Afrique', 'Terrarium'),
(6, 'Oiseau', 'Asie ou Afrique', 'Cage ou Grand Espace Fermé');

-- --------------------------------------------------------

--
-- Table structure for table utilisateur
--

CREATE TABLE utilisateur (
  idUser int(11) NOT NULL,
  login varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  isAdmin boolean NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table utilisateur
--

INSERT INTO utilisateur (idUser, login, password, isAdmin) VALUES
(1, 'Hercule', 'passwoord', false),
(2, 'Aladdin', 'mdp123', false),
(3, 'PeterPan', 'azerty', false),
(4, 'Zorro', 'motdepasseimpossible', false),
(5, 'Superman', 'cestpastesaffaires', false),
(6, 'Mugiwarano', 'lemdpparfait', false),
(7, 'admin', 'admin', true);

--
-- Indexes for dumped tables
--

--
-- Indexes for table animal
--
ALTER TABLE animal
  ADD PRIMARY KEY (idAnimal);

--
-- Indexes for table regne
--
ALTER TABLE regne
  ADD PRIMARY KEY (idRegne);

--
-- Indexes for table user
--
ALTER TABLE utilisateur
  ADD PRIMARY KEY (idUser);

--
-- AUTO_INCREMENT for table animal
--
ALTER TABLE animal
  MODIFY idAnimal int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table regne
--
ALTER TABLE regne
  MODIFY idRegne int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table utilisateur
--
ALTER TABLE utilisateur
  MODIFY idUser int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
  
--
-- FOREIGN_KEYS for table animal
--

ALTER TABLE animal ADD CONSTRAINT fk_regneId FOREIGN KEY animal(regneAnimal) REFERENCES regne(idRegne);
ALTER TABLE animal ADD CONSTRAINT fk_utilisateurId FOREIGN KEY animal(proprietaire) REFERENCES utilisateur(idUser);

COMMIT;

