-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 21, 2024 at 03:59 PM
-- Server version: 10.6.19-MariaDB-cll-lve-log
-- PHP Version: 8.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `irshadit_demomalakoff`
--

-- --------------------------------------------------------

--
-- Table structure for table `assessment`
--

CREATE TABLE `assessment` (
  `assessment_id` int(255) NOT NULL,
  `assessment_name` varchar(999) DEFAULT NULL,
  `assessment_start_date` date DEFAULT NULL,
  `assessment_end_date` date DEFAULT NULL,
  `assessment_type` varchar(999) DEFAULT NULL,
  `assessment_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessment_cluster`
--

CREATE TABLE `assessment_cluster` (
  `assessment_cluster_id` int(255) NOT NULL,
  `assessment_id` int(255) DEFAULT NULL,
  `cluster_id` int(255) DEFAULT NULL,
  `assessment_cluster_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `assessment_result`
--

CREATE TABLE `assessment_result` (
  `assessment_result_id` int(255) NOT NULL,
  `staff_assessor_id` int(255) DEFAULT NULL,
  `competency_id` int(255) DEFAULT NULL,
  `indicator_id` int(255) DEFAULT NULL,
  `assessment_result_score` int(255) DEFAULT NULL,
  `assessment_result_gap` int(255) DEFAULT NULL,
  `assessment_result_message` varchar(999) DEFAULT NULL,
  `assessment_result_date` datetime DEFAULT current_timestamp(),
  `assessment_id` int(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cluster`
--

CREATE TABLE `cluster` (
  `cluster_id` int(255) NOT NULL,
  `cluster_name` varchar(999) DEFAULT NULL,
  `cluster_description` varchar(999) DEFAULT NULL,
  `cluster_color` varchar(999) DEFAULT NULL,
  `cluster_level` int(255) DEFAULT NULL,
  `cluster_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(255) NOT NULL,
  `company_name` varchar(999) DEFAULT NULL,
  `company_short_name` varchar(999) DEFAULT NULL,
  `company_system_name` varchar(999) DEFAULT NULL,
  `company_logo` mediumblob DEFAULT NULL,
  `company_admin_name` varchar(999) DEFAULT NULL,
  `company_admin_username` varchar(999) DEFAULT NULL,
  `company_admin_password` varchar(999) DEFAULT NULL,
  `company_admin_role` varchar(999) DEFAULT 'admin',
  `company_self_weightage` int(255) DEFAULT NULL,
  `company_system_primary_color` varchar(255) DEFAULT '#321fdb',
  `company_system_secondary_color` varchar(255) DEFAULT '#9da5b1',
  `company_system_danger_color` varchar(255) DEFAULT '#e55353',
  `company_system_info_color` varchar(255) DEFAULT '#39f',
  `company_system_warning_color` varchar(255) DEFAULT '#f9b115',
  `company_system_success_color` varchar(255) DEFAULT '#2eb85c',
  `company_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `competency`
--

CREATE TABLE `competency` (
  `competency_id` int(255) NOT NULL,
  `competency_name` varchar(999) DEFAULT NULL,
  `competency_description` varchar(999) DEFAULT NULL,
  `cluster_id` int(255) DEFAULT NULL,
  `competency_level1` varchar(999) DEFAULT NULL,
  `competency_level2` varchar(999) DEFAULT NULL,
  `competency_level3` varchar(999) DEFAULT NULL,
  `competency_level4` varchar(999) DEFAULT NULL,
  `competency_level5` varchar(999) DEFAULT NULL,
  `competency_indicator1` varchar(999) DEFAULT NULL,
  `competency_indicator2` varchar(999) DEFAULT NULL,
  `competency_indicator3` varchar(999) DEFAULT NULL,
  `competency_indicator4` varchar(999) DEFAULT NULL,
  `competency_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `department_id` int(255) NOT NULL,
  `department_name` varchar(999) DEFAULT NULL,
  `department_description` varchar(999) DEFAULT NULL,
  `division_id` int(255) DEFAULT NULL,
  `department_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `division`
--

CREATE TABLE `division` (
  `division_id` int(255) NOT NULL,
  `division_name` varchar(999) DEFAULT NULL,
  `division_description` varchar(999) DEFAULT NULL,
  `division_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `indicator`
--

CREATE TABLE `indicator` (
  `indicator_id` int(255) NOT NULL,
  `competency_id` int(255) DEFAULT NULL,
  `indicator_description` varchar(999) DEFAULT NULL,
  `indicator_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `position`
--

CREATE TABLE `position` (
  `position_id` int(255) NOT NULL,
  `position_name` varchar(999) DEFAULT NULL,
  `position_grade` varchar(999) DEFAULT NULL,
  `position_category` varchar(999) DEFAULT NULL,
  `position_description` varchar(999) DEFAULT NULL,
  `position_department_report` tinyint(1) DEFAULT 0,
  `position_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `position_competency`
--

CREATE TABLE `position_competency` (
  `position_competency_id` int(255) NOT NULL,
  `position_id` int(255) DEFAULT NULL,
  `competency_id` int(255) DEFAULT NULL,
  `position_competency_expected_level` int(255) DEFAULT NULL,
  `position_competency_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff`
--

CREATE TABLE `staff` (
  `staff_id` int(255) NOT NULL,
  `staff_name` varchar(999) DEFAULT NULL,
  `staff_email` varchar(999) DEFAULT NULL,
  `department_id` int(255) DEFAULT NULL,
  `position_id` int(255) DEFAULT NULL,
  `manager_id` int(255) DEFAULT 0,
  `staff_role` varchar(999) DEFAULT 'user',
  `staff_password` varchar(999) DEFAULT NULL,
  `staff_image` mediumblob DEFAULT NULL,
  `staff_organization_register` date DEFAULT NULL,
  `staff_id_number` varchar(999) DEFAULT NULL,
  `staff_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `staff`
--
CREATE TRIGGER `after_staff_insert`
AFTER INSERT ON `staff`
FOR EACH ROW
BEGIN
    INSERT INTO staff_assessor (staff_id, assessor_id, staff_assessor_type)
    VALUES (NEW.staff_id, NEW.staff_id, 'self');
    IF NEW.manager_id <> 0 THEN
        INSERT INTO staff_assessor (staff_id, assessor_id, staff_assessor_type)
        VALUES (NEW.staff_id, NEW.manager_id, 'superior');
    END IF;
END;
-- --------------------------------------------------------

--
-- Table structure for table `staff_assessor`
--

CREATE TABLE `staff_assessor` (
  `staff_assessor_id` int(255) NOT NULL,
  `staff_id` int(255) DEFAULT NULL,
  `assessor_id` int(255) DEFAULT NULL,
  `staff_assessor_type` varchar(999) DEFAULT NULL,
  `staff_assessor_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `staff_training`
--

CREATE TABLE `staff_training` (
  `staff_training_id` int(255) NOT NULL,
  `training_id` int(255) DEFAULT NULL,
  `staff_id` int(255) DEFAULT NULL,
  `staff_training_status` varchar(999) DEFAULT NULL,
  `staff_training_start_date` date DEFAULT NULL,
  `staff_training_end_date` date DEFAULT NULL,
  `staff_training_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training`
--

CREATE TABLE `training` (
  `training_id` int(255) NOT NULL,
  `training_name` varchar(999) DEFAULT NULL,
  `training_description` varchar(999) DEFAULT NULL,
  `cluster_id` int(255) DEFAULT NULL,
  `training_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `training_competency`
--

CREATE TABLE `training_competency` (
  `training_competency_id` int(255) NOT NULL,
  `training_id` int(255) DEFAULT NULL,
  `competency_id` int(255) DEFAULT NULL,
  `training_competency_level` int(255) DEFAULT NULL,
  `training_competency_system_register` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `assessment`
--
ALTER TABLE `assessment`
  ADD PRIMARY KEY (`assessment_id`);

--
-- Indexes for table `assessment_cluster`
--
ALTER TABLE `assessment_cluster`
  ADD PRIMARY KEY (`assessment_cluster_id`),
  ADD KEY `assessment_cluster` (`assessment_id`,`cluster_id`),
  ADD KEY `cluster_id` (`cluster_id`);

--
-- Indexes for table `assessment_result`
--
ALTER TABLE `assessment_result`
  ADD PRIMARY KEY (`assessment_result_id`),
  ADD KEY `assessment_id` (`assessment_id`);

--
-- Indexes for table `cluster`
--
ALTER TABLE `cluster`
  ADD PRIMARY KEY (`cluster_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `competency`
--
ALTER TABLE `competency`
  ADD PRIMARY KEY (`competency_id`),
  ADD KEY `cluster` (`cluster_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`department_id`);

--
-- Indexes for table `division`
--
ALTER TABLE `division`
  ADD PRIMARY KEY (`division_id`);

--
-- Indexes for table `indicator`
--
ALTER TABLE `indicator`
  ADD PRIMARY KEY (`indicator_id`),
  ADD KEY `competency_id` (`competency_id`);

--
-- Indexes for table `position`
--
ALTER TABLE `position`
  ADD PRIMARY KEY (`position_id`);

--
-- Indexes for table `position_competency`
--
ALTER TABLE `position_competency`
  ADD PRIMARY KEY (`position_competency_id`),
  ADD KEY `competency_id` (`competency_id`),
  ADD KEY `position` (`position_id`);

--
-- Indexes for table `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `department` (`department_id`),
  ADD KEY `position` (`position_id`) USING BTREE;

--
-- Indexes for table `staff_assessor`
--
ALTER TABLE `staff_assessor`
  ADD PRIMARY KEY (`staff_assessor_id`),
  ADD KEY `staff` (`staff_id`,`assessor_id`),
  ADD KEY `assessor_id` (`assessor_id`);

--
-- Indexes for table `staff_training`
--
ALTER TABLE `staff_training`
  ADD PRIMARY KEY (`staff_training_id`),
  ADD KEY `training_id` (`training_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `training`
--
ALTER TABLE `training`
  ADD PRIMARY KEY (`training_id`),
  ADD KEY `cluster` (`cluster_id`);

--
-- Indexes for table `training_competency`
--
ALTER TABLE `training_competency`
  ADD PRIMARY KEY (`training_competency_id`),
  ADD KEY `training_competency` (`competency_id`,`training_id`),
  ADD KEY `training_id` (`training_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `assessment`
--
ALTER TABLE `assessment`
  MODIFY `assessment_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assessment_cluster`
--
ALTER TABLE `assessment_cluster`
  MODIFY `assessment_cluster_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `assessment_result`
--
ALTER TABLE `assessment_result`
  MODIFY `assessment_result_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cluster`
--
ALTER TABLE `cluster`
  MODIFY `cluster_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `competency`
--
ALTER TABLE `competency`
  MODIFY `competency_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `department_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `division`
--
ALTER TABLE `division`
  MODIFY `division_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `indicator`
--
ALTER TABLE `indicator`
  MODIFY `indicator_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `position`
--
ALTER TABLE `position`
  MODIFY `position_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `position_competency`
--
ALTER TABLE `position_competency`
  MODIFY `position_competency_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff`
--
ALTER TABLE `staff`
  MODIFY `staff_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_assessor`
--
ALTER TABLE `staff_assessor`
  MODIFY `staff_assessor_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `staff_training`
--
ALTER TABLE `staff_training`
  MODIFY `staff_training_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training`
--
ALTER TABLE `training`
  MODIFY `training_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `training_competency`
--
ALTER TABLE `training_competency`
  MODIFY `training_competency_id` int(255) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `assessment_cluster`
--
ALTER TABLE `assessment_cluster`
  ADD CONSTRAINT `assessment_cluster_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`assessment_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `assessment_cluster_ibfk_2` FOREIGN KEY (`cluster_id`) REFERENCES `cluster` (`cluster_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `assessment_result`
--
ALTER TABLE `assessment_result`
  ADD CONSTRAINT `assessment_result_ibfk_1` FOREIGN KEY (`assessment_id`) REFERENCES `assessment` (`assessment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `competency`
--
ALTER TABLE `competency`
  ADD CONSTRAINT `competency_ibfk_1` FOREIGN KEY (`cluster_id`) REFERENCES `cluster` (`cluster_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `indicator`
--
ALTER TABLE `indicator`
  ADD CONSTRAINT `indicator_ibfk_1` FOREIGN KEY (`competency_id`) REFERENCES `competency` (`competency_id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Constraints for table `position_competency`
--
ALTER TABLE `position_competency`
  ADD CONSTRAINT `position_competency_ibfk_2` FOREIGN KEY (`competency_id`) REFERENCES `competency` (`competency_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `position_competency_ibfk_3` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `staff`
--
ALTER TABLE `staff`
  ADD CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `staff_ibfk_4` FOREIGN KEY (`position_id`) REFERENCES `position` (`position_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `staff_assessor`
--
ALTER TABLE `staff_assessor`
  ADD CONSTRAINT `staff_assessor_ibfk_1` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `staff_assessor_ibfk_2` FOREIGN KEY (`assessor_id`) REFERENCES `staff` (`staff_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `staff_training`
--
ALTER TABLE `staff_training`
  ADD CONSTRAINT `staff_training_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `training` (`training_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `staff_training_ibfk_2` FOREIGN KEY (`staff_id`) REFERENCES `staff` (`staff_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `training`
--
ALTER TABLE `training`
  ADD CONSTRAINT `training_ibfk_1` FOREIGN KEY (`cluster_id`) REFERENCES `cluster` (`cluster_id`) ON DELETE SET NULL ON UPDATE SET NULL;

--
-- Constraints for table `training_competency`
--
ALTER TABLE `training_competency`
  ADD CONSTRAINT `training_competency_ibfk_1` FOREIGN KEY (`training_id`) REFERENCES `training` (`training_id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `training_competency_ibfk_2` FOREIGN KEY (`competency_id`) REFERENCES `competency` (`competency_id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
