-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 27, 2026 at 04:44 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `room_reservation`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `status`, `created_at`) VALUES
(19, 'PSA', 'Please Work', 'Published', '2026-06-23 02:22:43'),
(45, 'Test 10', 'Test 9 is a success, Test 10 check for phantom announcements if saved to draft instead', 'Draft', '2026-06-24 08:14:36'),
(46, 'PSA', 'Please Work! :) 12345678', 'Published', '2026-06-24 08:14:58');

-- --------------------------------------------------------

--
-- Table structure for table `capacity_settings`
--

CREATE TABLE `capacity_settings` (
  `id` int(11) NOT NULL,
  `booking_date` date NOT NULL,
  `max_table_bookings` int(11) DEFAULT 10,
  `max_event_bookings` int(11) DEFAULT 3,
  `full_venue_limit` varchar(50) DEFAULT '1 per day',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `capacity_settings`
--

INSERT INTO `capacity_settings` (`id`, `booking_date`, `max_table_bookings`, `max_event_bookings`, `full_venue_limit`, `created_at`) VALUES
(1, '2026-06-23', 2, 2, '1 per day', '2026-06-23 06:30:42'),
(2, '2026-06-24', 15, 3, 'Blocked', '2026-06-23 06:42:12'),
(3, '2026-06-26', 2, 3, 'Available', '2026-06-23 13:25:51');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `is_read`, `created_at`) VALUES
(22, 4, 'Reservation Approved', 'Your reservation has been approved.', 0, '2026-06-26 14:43:54'),
(23, 4, 'Reservation Approved', 'Your reservation has been approved.', 0, '2026-06-26 14:50:28'),
(24, 4, 'Reservation Rejected', 'Your reservation has been rejected.', 0, '2026-06-26 14:52:09');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reservation_type` varchar(20) NOT NULL,
  `reservation_date` date NOT NULL,
  `reservation_time` varchar(20) DEFAULT NULL,
  `guest_count` varchar(50) DEFAULT NULL,
  `table_preference` varchar(100) DEFAULT NULL,
  `occasion_type` varchar(100) DEFAULT NULL,
  `event_description` text DEFAULT NULL,
  `special_requests` text DEFAULT NULL,
  `status` varchar(20) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `capacity_status` varchar(50) DEFAULT 'Within Limit'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `reservation_type`, `reservation_date`, `reservation_time`, `guest_count`, `table_preference`, `occasion_type`, `event_description`, `special_requests`, `status`, `created_at`, `capacity_status`) VALUES
(2, 3, 'table', '2026-06-22', '5:00 PM', '5-6 guests', 'Outdoor', '', '', '', 'Approved', '2026-06-22 06:29:45', 'Within Limit'),
(7, 3, 'table', '2026-06-23', '5:00 PM', '1-2 guests', 'Window Seat', '', '', '', 'Pending', '2026-06-23 07:58:59', 'Within Limit'),
(15, 3, 'table', '2026-06-25', '7:00 PM', '7+ guests', 'VIP Area', '', '', '', 'Cancelled', '2026-06-23 13:20:54', 'Within Limit'),
(16, 2, 'table', '2026-06-24', '5:00 PM', '7+ guests', 'VIP Area', '', '', '', 'Pending', '2026-06-24 15:16:25', 'Within Limit'),
(17, 2, 'table', '2026-06-24', '5:00 PM', '7+ guests', 'VIP Area', '', '', '', 'Pending', '2026-06-24 15:17:53', 'Within Limit'),
(18, 2, 'table', '2026-06-24', '5:00 PM', '7+ guests', 'VIP Area', '', '', '', 'Pending', '2026-06-24 15:18:34', 'Within Limit'),
(19, 2, 'table', '2026-06-20', '5:00 PM', '1-2 guests', 'No preference', '', '', '', 'Pending', '2026-06-24 15:19:56', 'Within Limit'),
(20, 3, 'table', '2026-06-20', '5:00 PM', '1-2 guests', 'No preference', '', '', '', 'Pending', '2026-06-24 15:20:23', 'Within Limit'),
(21, 3, 'table', '2026-06-25', '7:00 PM', '7+ guests', 'Window Seat', '', '', '', 'Pending', '2026-06-24 15:20:41', 'Within Limit'),
(22, 3, 'table', '2026-06-25', '7:00 PM', '7+ guests', 'Window Seat', '', '', '', 'Pending', '2026-06-24 15:21:38', 'Within Limit'),
(23, 3, 'table', '2026-06-20', '5:00 PM', '1-2 guests', 'No preference', '', '', '', 'Pending', '2026-06-24 15:29:41', 'Within Limit'),
(24, 3, 'table', '2026-06-25', '7:00 PM', '7+ guests', 'VIP Area', '', '', '', 'Pending', '2026-06-24 15:30:28', 'Within Limit'),
(25, 2, 'occasion', '2026-06-26', '5:00 PM', '30+ guests', '', 'Birthday', 'test', 'test', 'Pending', '2026-06-24 15:32:29', 'Within Limit'),
(26, 4, 'table', '2026-06-20', '8:00 PM', '7+ guests', 'Window Seat', '', '', '', 'Approved', '2026-06-25 14:45:09', 'Within Limit'),
(27, 4, 'table', '2026-06-20', '5:00 PM', '1-2 guests', 'VIP Area', '', '', '', 'Approved', '2026-06-25 14:46:09', 'Within Limit'),
(28, 4, 'table', '2026-06-20', '5:00 PM', '1-2 guests', 'No preference', '', '', '', 'Approved', '2026-06-26 14:00:08', 'Within Limit'),
(29, 4, 'table', '2026-06-20', '5:00 PM', '3-4 guests', 'Outdoor', '', '', '', 'Approved', '2026-06-26 14:26:36', 'Within Limit'),
(30, 4, 'occasion', '2026-06-20', '5:00 PM', '30+ guests', '', 'Birthday', '', '', 'Approved', '2026-06-26 14:40:24', 'Within Limit'),
(31, 4, 'venue', '2026-06-20', '', '20 persons', '', '', '', '', 'Approved', '2026-06-26 14:43:15', 'Within Limit'),
(32, 4, 'occasion', '2026-06-20', '5:00 PM', '3-10 guests', '', 'Wedding', '', '', 'Approved', '2026-06-26 14:49:57', 'Within Limit'),
(33, 4, 'table', '2026-06-20', '5:00 PM', '7+ guests', 'No preference', '', '', '', 'Rejected', '2026-06-26 14:51:41', 'Within Limit');

-- --------------------------------------------------------

--
-- Table structure for table `restaurant_tables`
--

CREATE TABLE `restaurant_tables` (
  `id` int(11) NOT NULL,
  `table_name` varchar(50) NOT NULL,
  `capacity` varchar(20) NOT NULL,
  `table_type` varchar(50) NOT NULL,
  `status` enum('Available','Reserved','Occupied') DEFAULT 'Available',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant_tables`
--

INSERT INTO `restaurant_tables` (`id`, `table_name`, `capacity`, `table_type`, `status`, `created_at`) VALUES
(1, 'Table 01', '2-4', 'Outdoor', 'Available', '2026-06-22 12:26:56'),
(2, 'Table 02', '2-4', 'Window', 'Available', '2026-06-22 12:26:56'),
(4, 'VIP 01', '6-10', 'VIP', 'Occupied', '2026-06-22 12:26:56');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `role` varchar(20) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `email`, `password`, `created_at`, `role`) VALUES
(2, 'Emmanuel Calangian', 'emgcalangian@gmail.com', '$2y$10$yVOCKLT6dNilIpImN7AvW.aSOwvQf0S2vg3qHgUBmpc129kI06UBO', '2026-06-21 11:55:05', 'admin'),
(3, 'UserM', '3mmanu3lgc@gmail.com', '$2y$10$fTX7HBiZTXfEhFyqf6jrNeYjc6FuBIgdX7iw5qEDt5AH5VR3MeEdm', '2026-06-21 13:59:58', 'user'),
(4, 'Adrian Yadao', 'adrianyadao006@gmail.com', '$2y$10$MzmFLs56T5j1pje9dny7/eExG2YeOcm7BGgflymO9IYs8xcw5GcUW', '2026-06-25 14:43:56', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `capacity_settings`
--
ALTER TABLE `capacity_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `restaurant_tables`
--
ALTER TABLE `restaurant_tables`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT for table `capacity_settings`
--
ALTER TABLE `capacity_settings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `restaurant_tables`
--
ALTER TABLE `restaurant_tables`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
