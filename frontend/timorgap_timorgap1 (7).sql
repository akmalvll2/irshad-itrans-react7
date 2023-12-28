-- phpMyAdmin SQL Dump
-- version 4.9.11
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Mar 23, 2023 at 03:57 PM
-- Server version: 10.5.19-MariaDB-cll-lve-log
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `timorgap_timorgap1`
--

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_name` varchar(20) NOT NULL,
  `company_registration_number` varchar(255) NOT NULL,
  `company_short_name` varchar(255) NOT NULL,
  `pic_name` varchar(255) NOT NULL,
  `pic_number` varchar(255) NOT NULL,
  `pic_email` varchar(255) NOT NULL,
  `company_website` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_name`, `company_registration_number`, `company_short_name`, `pic_name`, `pic_number`, `pic_email`, `company_website`) VALUES
('TIMOR GAP, E. P.', 'TIMOR GAP, E. P.', 'TIMOR GAP, E. P.', 'TIMORGAP', '3310953', 'info@timorgap.com', 'www.timorgap.com');

-- --------------------------------------------------------

--
-- Table structure for table `competency`
--

CREATE TABLE `competency` (
  `competency_id` int(255) NOT NULL,
  `competency_code` varchar(255) DEFAULT NULL,
  `competency_name` varchar(80) NOT NULL,
  `competency_description` varchar(500) NOT NULL,
  `competency_cluster` varchar(10) NOT NULL,
  `competency_level1` varchar(500) DEFAULT NULL,
  `competency_level2` varchar(500) DEFAULT NULL,
  `competency_level3` varchar(500) DEFAULT NULL,
  `competency_level4` varchar(500) DEFAULT NULL,
  `competency_level5` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `competency`
--

INSERT INTO `competency` (`competency_id`, `competency_code`, `competency_name`, `competency_description`, `competency_cluster`, `competency_level1`, `competency_level2`, `competency_level3`, `competency_level4`, `competency_level5`) VALUES
(6, '', 'Leadership and Management', 'Leadership and Management', 'Core', '2', '2', '2', '2', '2'),
(7, '', 'Training Management', 'To manage training and assessment for all staff  in an organization', 'Core', 'Elementary', 'Foundation', 'Intermediate', 'Advanced', 'Expert'),
(9, '', 'Payroll Processing', 'To manage and control payroll', 'Functional', 'Elementary', 'Foundation', 'Intermediate ', 'Advance', 'Expert'),
(10, '', 'ICT Management', 'This training is required for high-level management for the ICT department. It is intended to improve the quality of management under the ICT department. ', 'Generic', 'Elementary', 'Foundation', 'Intermediate', 'Advanced', 'Expert'),
(12, '', 'Helpdesk', 'Providing on-site help to users experiencing a problem.', 'Functional', 'Elementary ', 'Foundation', 'Intermediate', 'Advanced', 'Expert'),
(13, '', 'Training and Development', 'To improve training and development skill', 'Core', 'Elementary', 'Foundation', 'Intermediate', 'Advanced', 'Expert'),
(14, '', 'Training HR  Regulatory  & Compliance', 'to regulate all staff ', 'Functional', 'elementary', 'elementary', 'Advanced', 'expert', 'expert');

-- --------------------------------------------------------

--
-- Table structure for table `competency_training`
--

CREATE TABLE `competency_training` (
  `competency_training_id` int(255) NOT NULL,
  `competency_id` int(255) NOT NULL,
  `training_id` int(255) NOT NULL,
  `gap_level` int(5) NOT NULL DEFAULT 5
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `competency_training`
--

INSERT INTO `competency_training` (`competency_training_id`, `competency_id`, `training_id`, `gap_level`) VALUES
(3, 14, 5, 1),
(5, 12, 5, 1),
(7, 12, 8, 2),
(10, 7, 5, 1),
(11, 12, 5, 2),
(12, 9, 12, 2),
(13, 13, 11, 2),
(14, 10, 6, 4);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(255) NOT NULL,
  `department_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`department_id`, `department_name`) VALUES
(1, 'Human Resource '),
(3, 'ICT Department'),
(4, 'Procurement & Logistic ');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `job_title` varchar(255) NOT NULL,
  `job_short_title` varchar(255) DEFAULT NULL,
  `job_grade` varchar(10) NOT NULL,
  `job_id` int(255) NOT NULL,
  `job_level` int(255) DEFAULT 1,
  `job_scope` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`job_title`, `job_short_title`, `job_grade`, `job_id`, `job_level`, `job_scope`) VALUES
('General Manager', NULL, 'N/A', 1, 1, 'desc'),
('GM', NULL, 'G1-S1', 7, 1, 'Business Professional A'),
('Training & Recruitment Analyst', NULL, 'G4-S1', 8, 1, 'Business Professional A'),
('HR Payroll & Benefit Analyst', NULL, 'G4-S1', 9, 1, 'Business Professional A'),
('HRIS Assistant', NULL, 'G4-S1', 10, 1, ''),
('ICT Assistant', NULL, 'G1-S1', 12, 1, 'Business Professional B'),
('HR-IT', NULL, 'G8-S1', 14, 1, 'Technical Professional'),
('Senior Manager ', NULL, 'G1-S1', 16, 1, 'Business Professional A');

-- --------------------------------------------------------

--
-- Table structure for table `job_competency`
--

CREATE TABLE `job_competency` (
  `job_id` int(20) NOT NULL,
  `competency_id` int(20) NOT NULL,
  `expected_level` int(10) NOT NULL,
  `job_competency_id` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_competency`
--

INSERT INTO `job_competency` (`job_id`, `competency_id`, `expected_level`, `job_competency_id`) VALUES
(14, 6, 2, 5),
(10, 6, 2, 6),
(1, 12, 2, 9),
(1, 12, 3, 15),
(1, 12, 3, 16),
(9, 9, 3, 21),
(8, 13, 3, 23),
(9, 14, 3, 25),
(8, 7, 2, 26),
(12, 12, 3, 27),
(12, 10, 3, 28),
(12, 13, 2, 29),
(12, 12, 2, 30),
(12, 10, 4, 31),
(12, 13, 3, 32);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `username` varchar(15) NOT NULL,
  `password` varchar(15) NOT NULL,
  `cpassword` varchar(15) NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `login`
--

INSERT INTO `login` (`username`, `password`, `cpassword`, `type`) VALUES
('tgadmin', '#timordemo2023', '#timordemo2023', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_name` varchar(50) NOT NULL,
  `staff_id` varchar(255) NOT NULL,
  `staff_ic` bigint(14) DEFAULT NULL,
  `staff_department` varchar(50) DEFAULT NULL,
  `job_id` int(10) DEFAULT NULL,
  `date_join` date NOT NULL,
  `qualification` varchar(50) DEFAULT 'no',
  `certification` varchar(50) DEFAULT 'no',
  `reporting_to` varchar(255) NOT NULL DEFAULT '000',
  `password` varchar(15) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff`
--

INSERT INTO `staff` (`staff_name`, `staff_id`, `staff_ic`, `staff_department`, `job_id`, `date_join`, `qualification`, `certification`, `reporting_to`, `password`, `email`, `type`) VALUES
('Aristony Lopes', '000044', NULL, 'Human Resource ', 1, '2020-01-07', 'HRM Practicioner', 'MSc HRM&D', '000', '000044', 'aristony.lopes@timorgap.com', 'admin'),
('Arcansia Rozario da CRuz', '00160', NULL, 'ICT Department', 12, '2020-11-01', 'Bachelor', '', 'TG-0096', '00160', 'arcansia.rosario@timorgap.com', 'user'),
('Mariana Fatima Pereira', '00161', 2, 'ICT Department', 12, '2023-03-14', '', '', '00166', '00161', 'mariana.fatima@timorgap.com', 'admin'),
('Elisabeth Fernandes', '00166', 2, 'Human Resource ', 9, '2021-09-01', '', '', '000044', '00166', 'elisabeth.eta48@gmail.com', 'admin'),
('Nelson Freitas', 'TG-0096', NULL, 'ICT Department', 12, '2014-07-14', 'Master of Computing System', '', '00161', 'TG-0096', 'nelson.freitas@timorgap.com', 'user'),
('Chandra Lemos', 'TGD003', 3, 'Human Resource ', 8, '2023-04-03', '', '', '000044', 'TGD003', 'cstefia@gmail.com', 'admin');

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
  `staff_competency_gap` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `staff_competency`
--

INSERT INTO `staff_competency` (`staff_competency_id`, `staff_id`, `competency_id`, `staff_competency_date`, `staff_competency_supervisor`, `current_competency_level`, `staff_competency_gap`) VALUES
(2, '00161', 12, '2023-03-14', '00166', 2, 1),
(21, '00166', 9, '2023-03-14', '000044', 2, 1),
(22, '00166', 14, '2023-03-14', '000044', 2, 1),
(25, 'TGD003', 13, '2023-03-14', '000044', 2, 1),
(26, 'TGD003', 7, '2023-03-14', '000044', 2, 0),
(27, '00160', 12, '2023-03-14', 'TG-0096', 2, 1),
(28, '00160', 10, '2023-03-14', 'TG-0096', 4, -1),
(29, '00160', 13, '2023-03-14', 'TG-0096', 2, 0);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `test_table`
--

CREATE TABLE `test_table` (
  `test_id` int(255) NOT NULL,
  `test_name` varchar(15) NOT NULL,
  `test_desc` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_id` int(255) NOT NULL,
  `training_code` varchar(255) DEFAULT NULL,
  `training_group` varchar(255) NOT NULL,
  `training_name` varchar(100) NOT NULL,
  `training_objective` varchar(1000) NOT NULL,
  `training_duration` varchar(255) NOT NULL DEFAULT '1',
  `training_required_level` int(255) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training`
--

INSERT INTO `training` (`training_id`, `training_code`, `training_group`, `training_name`, `training_objective`, `training_duration`, `training_required_level`) VALUES
(5, '', 'Core', 'Management Training', 'To manage training and assessment to all staff within an organization', '5', 0),
(6, '', 'Core', 'ICT Management', 'To improve the quality on planning, controlling, and monitoring of all projects and activities under the ICT department', '20', 0),
(7, '', 'Functional', 'SAP Training', 'To improve SAP knowledge and skill as well as to achieve the standard requirement for an SAP user', '15', 0),
(8, '', 'Generic', 'General ICT ', 'To achieve the general understanding of ICT domain system and also being familiar with all the latest ICT technologies', '10', 0),
(9, '', 'Functional', 'HR Regulatory & Compliance', 'To monitoring all staff', '5', 0),
(10, '', 'Core', 'Leadership Management ', 'To improve the quality of leadership on all employees and better prepare all staff in the future', '10', 0),
(11, '', 'Functional', 'Training and Development', 'To improve training and development skill', '5', 0),
(12, '', 'Functional', 'Payroll Management and Effective Controls', 'Skills to identify risk and implement controls', '5', 0);

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
  MODIFY `competency_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `competency_training`
--
ALTER TABLE `competency_training`
  MODIFY `competency_training_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `job`
--
ALTER TABLE `job`
  MODIFY `job_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `job_competency`
--
ALTER TABLE `job_competency`
  MODIFY `job_competency_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `job_department`
--
ALTER TABLE `job_department`
  MODIFY `job_department_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_competency`
--
ALTER TABLE `staff_competency`
  MODIFY `staff_competency_id` int(200) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

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
  MODIFY `training_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
