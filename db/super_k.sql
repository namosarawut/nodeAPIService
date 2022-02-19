-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 19, 2022 at 09:54 AM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `super_k`
--

-- --------------------------------------------------------

--
-- Table structure for table `tb_user`
--

CREATE TABLE `tb_user` (
  `user_id` int(11) NOT NULL,
  `user_username` text NOT NULL,
  `user_password` text NOT NULL,
  `user_fname` text NOT NULL,
  `user_lname` text NOT NULL,
  `user_fullname` text NOT NULL,
  `user_phone_number` text NOT NULL,
  `user_email` text NOT NULL,
  `customer_id` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tb_user`
--

INSERT INTO `tb_user` (`user_id`, `user_username`, `user_password`, `user_fname`, `user_lname`, `user_fullname`, `user_phone_number`, `user_email`, `customer_id`) VALUES
(27, 'namos', 'Namo1234', 'Sarawut', 'Saengchan', 'Sarawut Saengchan', '0995977876', 'jame@gmail.com', '1234567890'),
(28, 'namo', 'Namo1234', 'Sarawut', 'Saengchan', 'Sarawut Saengchan', '0976765654', 'namosarawut@gmail.com', '9552556468'),
(29, 'namosaraw', 'Namo7726', 'hotyum', 'koip', 'hotyum koip', '0976765655', 'namosarawut90@gmail.com', '5670441252'),
(30, 'kingo2099', 'Kingo1234', 'king', 'ko', 'king ko', '0858970866', 'kinkko@gmail.com', '2274637547'),
(31, 'test', 'Test111111', 'test', 'test', 'test test', '0887775566', 'chogun35@gmail.com', '2906885364'),
(32, 'mona', 'Namo7726', 'android ', 'king ', 'android  king ', '0853583310', 'android@gmail.com', '7701358778');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tb_user`
--
ALTER TABLE `tb_user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tb_user`
--
ALTER TABLE `tb_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
