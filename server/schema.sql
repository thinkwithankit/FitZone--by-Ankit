-- FitZone Gym Database Schema for MySQL
CREATE DATABASE IF NOT EXISTS fitzone_db;
USE fitzone_db;

-- 1. Membership Plans
CREATE TABLE IF NOT EXISTS plans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  slug VARCHAR(50) NOT NULL UNIQUE,
  monthly_price INT NOT NULL,
  yearly_price INT NOT NULL,
  currency VARCHAR(10) DEFAULT '₹',
  is_popular BOOLEAN DEFAULT FALSE,
  description VARCHAR(255),
  features JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Members
CREATE TABLE IF NOT EXISTS members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membership_code VARCHAR(30) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  plan VARCHAR(50) NOT NULL,
  billing_cycle ENUM('monthly', 'yearly') DEFAULT 'monthly',
  amount_paid DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Card/UPI',
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status ENUM('active', 'expired', 'paused') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Trainers
CREATE TABLE IF NOT EXISTS trainers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  experience_years INT DEFAULT 5,
  bio TEXT,
  rating DECIMAL(2, 1) DEFAULT 4.9,
  image VARCHAR(255),
  instagram VARCHAR(255),
  facebook VARCHAR(255),
  linkedin VARCHAR(255),
  certifications VARCHAR(255)
);

-- 4. Classes / Schedule
CREATE TABLE IF NOT EXISTS classes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  trainer_name VARCHAR(100) NOT NULL,
  day_of_week VARCHAR(20) NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  capacity INT DEFAULT 20,
  booked_count INT DEFAULT 0,
  intensity ENUM('Low', 'Medium', 'High', 'Extreme') DEFAULT 'High'
);

-- 5. Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  booking_code VARCHAR(30) UNIQUE NOT NULL,
  class_id INT,
  class_title VARCHAR(100) NOT NULL,
  member_name VARCHAR(100) NOT NULL,
  member_email VARCHAR(100) NOT NULL,
  member_phone VARCHAR(20) NOT NULL,
  booking_date DATE NOT NULL,
  time_slot VARCHAR(50) NOT NULL,
  status ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Inquiries / Contact Messages
CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(150),
  message TEXT NOT NULL,
  status ENUM('new', 'in_progress', 'resolved') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Newsletter Subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 8. Testimonials / Reviews
CREATE TABLE IF NOT EXISTS reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  member_name VARCHAR(100) NOT NULL,
  role_or_title VARCHAR(100) DEFAULT 'FitZone Member',
  rating INT DEFAULT 5,
  comment TEXT NOT NULL,
  avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
