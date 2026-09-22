-- ==============================================================================
-- Prome Agro Foods Limited - Official Database Schema
-- Architecture: Relational MySQL (InnoDB, UTF-8mb4)
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `prome_agro_db` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `prome_agro_db`;

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `reviews`;
DROP TABLE IF EXISTS `media_gallery`;
DROP TABLE IF EXISTS `inquiries`;
DROP TABLE IF EXISTS `order_items`;
DROP TABLE IF EXISTS `orders`;
DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `categories`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. Users & Authentication Table
-- Supports Admins, Registered Dealers/Wholesalers, and Retail Customers
-- ------------------------------------------------------------------------------
CREATE TABLE `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('admin', 'dealer', 'customer') NOT NULL DEFAULT 'customer',
    `phone` VARCHAR(30) NULL,
    `company_name` VARCHAR(200) NULL,
    `country` VARCHAR(100) NOT NULL DEFAULT 'Bangladesh',
    `status` ENUM('active', 'pending', 'suspended') NOT NULL DEFAULT 'active',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_users_email` (`email`),
    INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. Product Categories Table
-- Represents Prome Agro's 11 major manufacturing divisions
-- ------------------------------------------------------------------------------
CREATE TABLE `categories` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(120) NOT NULL UNIQUE,
    `icon` VARCHAR(50) DEFAULT 'utensils',
    `description` TEXT NULL,
    `image_url` VARCHAR(500) NULL,
    `sort_order` INT UNSIGNED DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. Products Table
-- Agro-processed food products with export and domestic pricing
-- ------------------------------------------------------------------------------
CREATE TABLE `products` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `category_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `slug` VARCHAR(220) NOT NULL UNIQUE,
    `sku` VARCHAR(50) NOT NULL UNIQUE,
    `weight_volume` VARCHAR(50) NOT NULL COMMENT 'e.g. 200g Jar, 1 Liter, 500ml',
    `price` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Domestic Retail Price in BDT',
    `wholesale_price` DECIMAL(10,2) NOT NULL DEFAULT 0.00 COMMENT 'Export/Wholesale B2B Price',
    `stock` INT UNSIGNED NOT NULL DEFAULT 100,
    `image_url` VARCHAR(500) NULL,
    `description` TEXT NULL,
    `ingredients` TEXT NULL,
    `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
    `is_export_ready` TINYINT(1) NOT NULL DEFAULT 1,
    `rating` DECIMAL(3,2) NOT NULL DEFAULT 5.00,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`category_id`) REFERENCES `categories`(`id`) ON DELETE CASCADE,
    INDEX `idx_products_cat` (`category_id`),
    INDEX `idx_products_featured` (`is_featured`),
    INDEX `idx_products_price` (`price`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. Orders Table
-- Supports domestic retail orders and global container shipment orders
-- ------------------------------------------------------------------------------
CREATE TABLE `orders` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `order_number` VARCHAR(50) NOT NULL UNIQUE,
    `user_id` INT UNSIGNED NULL,
    `customer_name` VARCHAR(150) NOT NULL,
    `customer_email` VARCHAR(150) NOT NULL,
    `customer_phone` VARCHAR(30) NOT NULL,
    `shipping_address` TEXT NOT NULL,
    `order_type` ENUM('retail', 'wholesale_export') NOT NULL DEFAULT 'retail',
    `destination_country` VARCHAR(100) NOT NULL DEFAULT 'Bangladesh',
    `total_amount` DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    `payment_method` VARCHAR(50) NOT NULL DEFAULT 'Cash on Delivery',
    `payment_status` ENUM('unpaid', 'paid', 'refunded') NOT NULL DEFAULT 'unpaid',
    `order_status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
    `notes` TEXT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE SET NULL,
    INDEX `idx_orders_status` (`order_status`),
    INDEX `idx_orders_created` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. Order Line Items Table
-- ------------------------------------------------------------------------------
CREATE TABLE `order_items` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `order_id` INT UNSIGNED NOT NULL,
    `product_id` INT UNSIGNED NOT NULL,
    `product_name` VARCHAR(200) NOT NULL,
    `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
    `unit_price` DECIMAL(10,2) NOT NULL,
    `subtotal` DECIMAL(12,2) NOT NULL,
    FOREIGN KEY (`order_id`) REFERENCES `orders`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. B2B Export & Corporate Inquiries Table
-- Captures wholesale/distributorship applications worldwide
-- ------------------------------------------------------------------------------
CREATE TABLE `inquiries` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(150) NOT NULL,
    `phone` VARCHAR(30) NOT NULL,
    `company` VARCHAR(200) NULL,
    `country` VARCHAR(100) NOT NULL,
    `product_interest` VARCHAR(150) NOT NULL,
    `estimated_volume` VARCHAR(100) NULL COMMENT 'e.g. 1x20ft Container, 500 Cartons',
    `message` TEXT NOT NULL,
    `status` ENUM('new', 'in_review', 'contacted', 'closed') NOT NULL DEFAULT 'new',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 7. Media Gallery & Agro Video Showcase Table
-- ------------------------------------------------------------------------------
CREATE TABLE `media_gallery` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(200) NOT NULL,
    `media_type` ENUM('video', 'photo') NOT NULL DEFAULT 'video',
    `video_url` VARCHAR(500) NULL,
    `thumbnail_url` VARCHAR(500) NULL,
    `category` ENUM('agro_farm', 'processing', 'packaging', 'corporate', 'awards') NOT NULL DEFAULT 'agro_farm',
    `description` TEXT NULL,
    `duration` VARCHAR(20) NULL DEFAULT '02:45',
    `is_hero_featured` TINYINT(1) NOT NULL DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 8. Customer & Global Buyer Reviews Table
-- ------------------------------------------------------------------------------
CREATE TABLE `reviews` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `product_id` INT UNSIGNED NULL,
    `reviewer_name` VARCHAR(150) NOT NULL,
    `country` VARCHAR(100) NOT NULL DEFAULT 'Bangladesh',
    `rating` TINYINT UNSIGNED NOT NULL DEFAULT 5,
    `comment` TEXT NOT NULL,
    `is_verified` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
