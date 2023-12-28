-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 07, 2023 at 10:33 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `itransdemo`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_name` varchar(255) NOT NULL,
  `company_registration_number` varchar(255) NOT NULL,
  `company_short_name` varchar(255) NOT NULL,
  `pic_name` varchar(255) NOT NULL,
  `pic_number` varchar(255) NOT NULL,
  `pic_email` varchar(255) NOT NULL,
  `company_website` varchar(255) NOT NULL,
  `company_logo` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_name`, `company_registration_number`, `company_short_name`, `pic_name`, `pic_number`, `pic_email`, `company_website`, `company_logo`) VALUES
('Kopetro', '', 'KP', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `competency`
--

CREATE TABLE `competency` (
  `competency_id` int(255) NOT NULL,
  `competency_code` varchar(255) NOT NULL,
  `competency_name` varchar(80) NOT NULL,
  `competency_description` varchar(255) NOT NULL,
  `competency_cluster` varchar(10) NOT NULL,
  `competency_level1` varchar(255) NOT NULL DEFAULT 'Level 1 Description',
  `competency_level2` varchar(255) NOT NULL DEFAULT 'Level 2 Description',
  `competency_level3` varchar(255) NOT NULL DEFAULT 'Level 3 Description',
  `competency_level4` varchar(255) NOT NULL DEFAULT 'Level 4 Description',
  `competency_level5` varchar(255) NOT NULL DEFAULT 'Level 5 Description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `competency`
--

INSERT INTO `competency` (`competency_id`, `competency_code`, `competency_name`, `competency_description`, `competency_cluster`, `competency_level1`, `competency_level2`, `competency_level3`, `competency_level4`, `competency_level5`) VALUES
(1, '', 'Organisational Awareness', 'Understands the organisationâ€™s vision, mission, objectives, targets and overall operations, and how itâ€™s social, political, economic, legal, environmental and technological systems work and operates effectively within them. \r\n', 'Core', 'lv1', 'lv2', 'lv3', 'lv4', 'lv5'),
(2, '', 'Team Collaboration', 'Works together in a team to complete a project or task towards a common goal that benefits the team and organisation.\r\n', 'Core', 'lv1', 'lv2', 'lv3', 'lv4', 'lv5'),
(3, '', 'Interpersonal Communication', 'Develops rapport, listens attentively and speaks clearly when communicating with others. Comprehend with cultural and gender differences and diversity (cultural sensitivity).\r\n', 'Core', '', '', '', '', ''),
(4, '', 'Customer Focus', 'Gives priority to customers (internal and external) and stakeholders, delivers high quality services which meet their needs. \r\n', 'Core', '', '', '', '', ''),
(5, '', 'Result Driven', 'Ables to sustained energy and determination when facing the obstacles to meet challenging targets, in compliance with quality, time and standards.\r\n', 'Core', '', '', '', '', ''),
(6, '', 'Continues Learning & Development', 'Able to take responsibility for keeping up-to-date on current research and technology in one\'s work, identifying and pursuing areas for development and training that will enhance job performance, and learning from ongoing organizational changes.\r\n', 'Core', '', '', '', '', ''),
(7, '', 'Microsoft', 'desc', 'Generic', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `competency_training`
--

CREATE TABLE `competency_training` (
  `competency_training_id` int(255) NOT NULL,
  `competency_id` int(255) NOT NULL,
  `training_id` int(255) NOT NULL,
  `gap_level` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `competency_training`
--

INSERT INTO `competency_training` (`competency_training_id`, `competency_id`, `training_id`, `gap_level`) VALUES
(1, 1, 2, 3),
(2, 6, 3, 1),
(3, 1, 3, 1),
(4, 4, 4, 1),
(5, 3, 5, 1);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(255) NOT NULL,
  `department_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`) VALUES
(1, 'Top Management'),
(2, 'Human Resource'),
(3, 'Human Resource, Training & Development'),
(4, 'Human Resource, Recruitment');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `job_title` varchar(1000) NOT NULL,
  `job_short_title` varchar(255) DEFAULT NULL,
  `job_grade` varchar(10) DEFAULT 'grade',
  `job_id` int(255) NOT NULL,
  `job_level` int(255) DEFAULT 1,
  `job_scope` varchar(255) DEFAULT 'description'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`job_title`, `job_short_title`, `job_grade`, `job_id`, `job_level`, `job_scope`) VALUES
('Chief Executive Officer', NULL, '', 1, 1, ''),
('General Manager', NULL, '', 2, 1, ''),
('Manager', NULL, '', 3, 1, ''),
('Assistant Manager', NULL, '', 4, 1, ''),
('Executive', NULL, '', 5, 1, ''),
('Clerk', NULL, '', 6, 1, '');

-- --------------------------------------------------------

--
-- Table structure for table `job_competency`
--

CREATE TABLE `job_competency` (
  `job_id` int(20) NOT NULL,
  `competency_id` int(20) NOT NULL,
  `expected_level` int(10) NOT NULL,
  `job_competency_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `job_competency`
--

INSERT INTO `job_competency` (`job_id`, `competency_id`, `expected_level`, `job_competency_id`) VALUES
(6, 1, 2, 1),
(5, 1, 3, 5),
(5, 2, 3, 7),
(5, 7, 3, 12),
(6, 2, 2, 13),
(6, 4, 2, 14),
(6, 3, 2, 15),
(6, 6, 1, 16),
(2, 6, 4, 17),
(2, 4, 4, 18);

-- --------------------------------------------------------

--
-- Table structure for table `job_department`
--

CREATE TABLE `job_department` (
  `job_department_id` int(255) NOT NULL,
  `job_id` int(255) NOT NULL,
  `department_id` int(255) NOT NULL,
  `staff_id` varchar(255) NOT NULL DEFAULT 'vacant',
  `reporting_to` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `cpassword` varchar(15) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `cpassword`, `type`) VALUES
('admin', 'admin123', 'admin123', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_name` varchar(70) NOT NULL,
  `staff_id` varchar(255) NOT NULL,
  `staff_email` varchar(255) DEFAULT NULL,
  `department_id` int(255) NOT NULL,
  `job_id` int(10) DEFAULT NULL,
  `date_join` date NOT NULL,
  `qualification` varchar(50) NOT NULL DEFAULT 'not available',
  `certification` varchar(50) NOT NULL DEFAULT 'not available',
  `reporting_to` varchar(255) NOT NULL DEFAULT '000',
  `reviewer_one` varchar(255) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_name`, `staff_id`, `staff_email`, `department_id`, `job_id`, `date_join`, `qualification`, `certification`, `reporting_to`, `reviewer_one`, `password`, `type`) VALUES
('Ali Bin Mamat', 'IDE001', NULL, 1, 1, '2022-11-14', '', '', '000', NULL, 'IDE001', 'admin'),
('Siti Aminah Binti Abdullah', 'IDE002', NULL, 2, 2, '2022-11-14', '', '', 'IDE001', NULL, '482c811da5d5b4b', 'user'),
('Ahmad Bin Abu', 'IDE003', NULL, 3, 3, '2022-11-14', '', '', 'IDE002', NULL, 'IDE003', 'user'),
('Mohamad Bin Nizam', 'IDE004', NULL, 4, 3, '2022-11-14', '', '', 'IDE002', NULL, 'IDE004', 'user'),
('Chan Kok Seng', 'IDE005', NULL, 3, 4, '2022-11-14', '', '', 'IDE003', NULL, 'IDE005', 'user'),
('Mariani Binti Ibrahim', 'IDE006', NULL, 3, 5, '2022-11-14', '', '', 'IDE003', 'IDE002', 'IDE006', 'user'),
('Sulaiman Bin Faris', 'IDE007', NULL, 3, 6, '2022-11-14', '', '', 'IDE005', NULL, 'IDE007', 'user'),
('Raju A/L Anamalay', 'IDE008', NULL, 4, 5, '2022-11-14', '', '', 'IDE004', NULL, 'IDE008', 'user'),
('Monica Soon', 'IDE009', NULL, 4, 5, '2022-11-14', '', '', 'IDE004', NULL, 'IDE009', 'user'),
('Siti Fatima Binti Harun', 'IDE010', NULL, 3, 5, '2022-11-15', '', '', 'IDE003', NULL, 'IDE010', 'user'),
('Hamidah Binti Marzuki', 'IDE011', NULL, 4, 6, '2023-01-02', '', '', 'IDE004', 'IDE002', 'IDE011', 'user');

-- --------------------------------------------------------

--
-- Table structure for table `staff_competency`
--

CREATE TABLE `staff_competency` (
  `staff_competency_id` int(200) NOT NULL,
  `staff_id` varchar(15) NOT NULL,
  `competency_id` int(20) NOT NULL,
  `staff_competency_date` date NOT NULL,
  `staff_competency_supervisor` varchar(20) NOT NULL,
  `current_competency_level` int(20) NOT NULL,
  `staff_competency_gap` int(255) NOT NULL,
  `staff_competency_session` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `staff_competency`
--

INSERT INTO `staff_competency` (`staff_competency_id`, `staff_id`, `competency_id`, `staff_competency_date`, `staff_competency_supervisor`, `current_competency_level`, `staff_competency_gap`, `staff_competency_session`) VALUES
(1, 'IDE006', 6, '2022-11-15', 'IDE003', 2, 1, 2),
(2, 'IDE006', 4, '2022-11-15', 'IDE003', 1, 2, 2),
(3, 'IDE006', 3, '2022-11-15', 'IDE003', 2, 1, 2),
(4, 'IDE006', 1, '2022-11-15', 'IDE003', 3, 0, 2),
(5, 'IDE006', 5, '2022-11-15', 'IDE003', 3, 0, 2),
(6, 'IDE006', 2, '2022-11-15', 'IDE003', 2, 1, 2),
(7, 'IDE008', 6, '2022-12-13', 'IDE004', 1, 1, 1),
(8, 'IDE008', 4, '2022-12-13', 'IDE004', 3, 1, 1),
(9, 'IDE008', 3, '2022-12-13', 'IDE004', 2, 1, 1),
(10, 'IDE008', 1, '2022-12-13', 'IDE004', 4, -1, 1),
(11, 'IDE008', 5, '2022-12-13', 'IDE004', 4, 1, 1),
(12, 'IDE008', 2, '2022-12-13', 'IDE004', 3, 0, 1),
(13, 'IDE008', 4, '2022-12-13', 'IDE004', 2, 2, 1),
(14, 'IDE008', 6, '2022-12-13', 'IDE004', 2, 0, 1),
(15, 'IDE008', 3, '2022-12-13', 'IDE004', 1, 2, 1),
(16, 'IDE008', 5, '2022-12-13', 'IDE004', 2, 3, 1),
(17, 'IDE008', 7, '2022-12-13', 'IDE004', 2, 1, 1),
(18, 'IDE011', 1, '2023-01-02', 'IDE004', 2, 0, 3),
(19, 'IDE011', 2, '2023-01-02', 'IDE004', 1, 1, 3),
(20, 'IDE011', 4, '2023-01-02', 'IDE004', 2, 0, 3),
(21, 'IDE011', 3, '2023-01-02', 'IDE004', 1, 1, 3),
(22, 'IDE011', 6, '2023-01-02', 'IDE004', 2, -1, 3),
(23, 'IDE011', 1, '2023-01-02', 'IDE004', 1, 1, 2),
(24, 'IDE011', 2, '2023-01-02', 'IDE004', 1, 1, 2),
(25, 'IDE011', 4, '2023-01-02', 'IDE004', 2, 0, 2),
(26, 'IDE011', 3, '2023-01-02', 'IDE004', 2, 0, 2),
(27, 'IDE011', 6, '2023-01-02', 'IDE004', 2, -1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `staff_job`
--

CREATE TABLE `staff_job` (
  `job_id` int(10) NOT NULL,
  `staff_id` varchar(20) NOT NULL,
  `job_status` varchar(10) NOT NULL DEFAULT 'disactive',
  `report_to` varchar(255) NOT NULL,
  `staff_job_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `test_id` int(255) NOT NULL,
  `test_name` varchar(15) NOT NULL,
  `test_desc` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_id` int(255) NOT NULL,
  `training_code` varchar(255) DEFAULT NULL,
  `training_group` varchar(255) NOT NULL,
  `training_name` varchar(255) NOT NULL,
  `training_objective` varchar(255) DEFAULT NULL,
  `training_duration` varchar(255) NOT NULL,
  `training_required_level` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`training_id`, `training_code`, `training_group`, `training_name`, `training_objective`, `training_duration`, `training_required_level`) VALUES
(2, '', 'Core', 'Organisational Awareness', 'Description', '1', NULL),
(3, '', 'Core', 'Continues Learning and Development', 'objective', '1', NULL),
(4, '', 'Core', 'Customer Service Excellence', 'Enhance customer focus and service excellence', '2', NULL),
(5, '', 'Core', 'Interpersonal Communication', 'objective', '1', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_registration_number`);

--
-- Indexes for table `competency`
--
ALTER TABLE `competency`
  ADD PRIMARY KEY (`competency_id`);

--
-- Indexes for table `competency_training`
--
ALTER TABLE `competency_training`
  ADD PRIMARY KEY (`competency_training_id`),
  ADD KEY `competency_id` (`competency_id`),
  ADD KEY `training_id` (`training_id`) USING BTREE;

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`job_id`);

--
-- Indexes for table `job_competency`
--
ALTER TABLE `job_competency`
  ADD PRIMARY KEY (`job_competency_id`),
  ADD KEY `job_id` (`job_id`) USING BTREE,
  ADD KEY `competency_id` (`competency_id`) USING BTREE;

--
-- Indexes for table `job_department`
--
ALTER TABLE `job_department`
  ADD PRIMARY KEY (`job_department_id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `job_id` (`job_id`) USING BTREE;

--
-- Indexes for table `staff_competency`
--
ALTER TABLE `staff_competency`
  ADD PRIMARY KEY (`staff_competency_id`),
  ADD KEY `staff_id` (`staff_id`),
  ADD KEY `competency_id` (`competency_id`);

--
-- Indexes for table `staff_job`
--
ALTER TABLE `staff_job`
  ADD PRIMARY KEY (`staff_job_id`),
  ADD KEY `job_id` (`job_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `test_table`
--
ALTER TABLE `test_table`
  ADD PRIMARY KEY (`test_id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `competency`
--
ALTER TABLE `competency`
  MODIFY `competency_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `competency_training`
--
ALTER TABLE `competency_training`
  MODIFY `competency_training_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `job_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `job_competency`
--
ALTER TABLE `job_competency`
  MODIFY `job_competency_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `job_department`
--
ALTER TABLE `job_department`
  MODIFY `job_department_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_competency`
--
ALTER TABLE `staff_competency`
  MODIFY `staff_competency_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `staff_job`
--
ALTER TABLE `staff_job`
  MODIFY `staff_job_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `test_table`
--
ALTER TABLE `test_table`
  MODIFY `test_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `competency_training`
--
ALTER TABLE `competency_training`
  ADD CONSTRAINT `competency_training_ibfk_1` FOREIGN KEY (`competency_id`) REFERENCES `competency` (`competency_id`),
  ADD CONSTRAINT `competency_training_ibfk_2` FOREIGN KEY (`training_id`) REFERENCES `training` (`training_id`);

--
-- Constraints for table `job_competency`
--
ALTER TABLE `job_competency`
  ADD CONSTRAINT `job_competency_ibfk_1` FOREIGN KEY (`competency_id`) REFERENCES `competency` (`competency_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `job_competency_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `job_department`
--
ALTER TABLE `job_department`
  ADD CONSTRAINT `job_department_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  ADD CONSTRAINT `job_department_ibfk_2` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`);

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`);

--
-- Constraints for table `staff_competency`
--
ALTER TABLE `staff_competency`
  ADD CONSTRAINT `staff_competency_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`),
  ADD CONSTRAINT `staff_competency_ibfk_2` FOREIGN KEY (`competency_id`) REFERENCES `competency` (`competency_id`);

--
-- Constraints for table `staff_job`
--
ALTER TABLE `staff_job`
  ADD CONSTRAINT `staff_job_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `staff_job_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
