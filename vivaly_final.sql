-- Suppression et recréation de la base de données
DROP DATABASE IF EXISTS vivaly;
CREATE DATABASE vivaly CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vivaly;

-- TABLE users
-- Stocke les informations des utilisateurs, incluant prénom, nom, email, mot de passe, numéro de téléphone, acceptation des CGV et rôle
CREATE TABLE users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  phone_number VARCHAR(15) DEFAULT NULL,
  cgv_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE addresses
-- Stocke les adresses des utilisateurs
CREATE TABLE addresses (
  id_address INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_user INT UNSIGNED NOT NULL,
  address_line1 VARCHAR(100) NOT NULL,
  address_line2 VARCHAR(100) DEFAULT NULL,
  postal_code VARCHAR(10) NOT NULL,
  city VARCHAR(50) NOT NULL,
  country VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_user (id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE categories
-- Stocke les catégories de produits
CREATE TABLE categories (
  id_category INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE suppliers
-- Stocke les informations des fournisseurs
CREATE TABLE suppliers (
  id_supplier INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) DEFAULT NULL,
  phone_number VARCHAR(15) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE products
-- Stocke les informations des produits
CREATE TABLE products (
  id_product INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_category INT UNSIGNED NOT NULL,
  id_supplier INT UNSIGNED NOT NULL,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_ht DECIMAL(10,2) NOT NULL,
  stock INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_category) REFERENCES categories(id_category) ON DELETE RESTRICT,
  FOREIGN KEY (id_supplier) REFERENCES suppliers(id_supplier) ON DELETE RESTRICT,
  INDEX idx_category (id_category),
  INDEX idx_supplier (id_supplier)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE orders
-- Stocke les commandes des utilisateurs
CREATE TABLE orders (
  id_order INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_user INT UNSIGNED NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') NOT NULL DEFAULT 'pending',
  order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE RESTRICT,
  INDEX idx_user (id_user)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE order_items
-- Stocke les articles de chaque commande
CREATE TABLE order_items (
  id_order INT UNSIGNED NOT NULL,
  id_product INT UNSIGNED NOT NULL,
  quantity INT UNSIGNED NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  size VARCHAR(10) DEFAULT NULL,
  color VARCHAR(20) DEFAULT NULL,
  PRIMARY KEY (id_order, id_product),
  FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE,
  FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE RESTRICT,
  INDEX idx_product (id_product)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE deliveries
-- Stocke les informations de livraison
CREATE TABLE deliveries (
  id_delivery INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_order INT UNSIGNED NOT NULL,
  status ENUM('pending', 'shipped', 'delivered') NOT NULL DEFAULT 'pending',
  delivery_date DATE DEFAULT NULL,
  delivery_method VARCHAR(50) NOT NULL,
  tracking_number VARCHAR(50) DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE,
  INDEX idx_order (id_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE payments
-- Stocke les informations de paiement
CREATE TABLE payments (
  id_payment INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_order INT UNSIGNED NOT NULL,
  payment_method ENUM('credit_card', 'paypal', 'bank_transfer') NOT NULL,
  status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
  amount DECIMAL(10,2) NOT NULL,
  payment_date TIMESTAMP NULL DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_order) REFERENCES orders(id_order) ON DELETE CASCADE,
  INDEX idx_order (id_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- TABLE promotions
-- Stocke les promotions sur les produits
CREATE TABLE promotions (
  id_promotion INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  id_product INT UNSIGNED NOT NULL,
  discount_percentage DECIMAL(5,2) NOT NULL CHECK (discount_percentage BETWEEN 0 AND 100),
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_product) REFERENCES products(id_product) ON DELETE CASCADE,
  INDEX idx_product (id_product)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ======================================
-- INSERTIONS D'EXEMPLE
-- ======================================

-- Users
INSERT INTO users (id, first_name, last_name, email, password, phone_number, cgv_accepted, role, created_at) VALUES
(1, 'Admin', 'Utilisateur', 'admin@example.com', '$2y$10$L5f57PUAdYyk3vXt3T02juX2Hw7dS.MKMuF4kBWUXSkvQKZTCnXmy', '+33123456789', TRUE, 'admin', '2025-06-10 12:52:18'),
(2, 'Youssouf', 'Bathily', 'youssoufbathily624@gmail.com', '$2y$10$b/Lx.47uRS1wIjpYZOU4CeqXkMCi.NoNtrAXlGntr.Say4LMr7Lce', '+33198765432', TRUE, 'user', '2025-06-10 12:55:46');

-- Addresses
INSERT INTO addresses (id_user, address_line1, address_line2, postal_code, city, country) VALUES
(1, '12 Rue de la Paix', 'Apt 3B', '75001', 'Paris', 'France'),
(2, '45 Avenue des Champs', NULL, '75008', 'Paris', 'France');

-- Categories
INSERT INTO categories (name, description) VALUES
('Vêtements', 'Vêtements pour hommes et femmes'),
('Chaussures', 'Chaussures de sport et élégantes'),
('Accessoires', 'Sacs, ceintures et bijoux');

-- Suppliers
INSERT INTO suppliers (name, email, phone_number) VALUES
('ModeParis', 'contact@modeparis.fr', '+33123456789'),
('SportTrend', 'info@sporttrend.com', '+33198765432');

-- Products
INSERT INTO products (id_category, id_supplier, name, description, price_ht, stock) VALUES
(1, 1, 'T-shirt Coton', 'T-shirt en coton bio', 15.00, 100),
(2, 2, 'Baskets Running', 'Baskets pour course à pied', 50.00, 50),
(3, 1, 'Sac à Main', 'Sac à main en cuir', 80.00, 20);

-- Orders
INSERT INTO orders (id_user, total_amount, status, order_date) VALUES
(1, 78.00, 'delivered', '2025-01-15 10:00:00'),
(1, 60.00, 'pending', '2025-06-10 12:00:00');

-- Order_Items
INSERT INTO order_items (id_order, id_product, quantity, unit_price, size, color) VALUES
(1, 1, 2, 15.00, 'M', 'Blanc'),
(1, 2, 1, 50.00, '42', 'Noir'),
(2, 2, 1, 60.00, '42', 'Bleu');

-- Deliveries
INSERT INTO deliveries (id_order, status, delivery_date, delivery_method, tracking_number) VALUES
(1, 'delivered', '2025-02-01', 'Colissimo', 'TRK123456789'),
(2, 'pending', NULL, 'Chronopost', NULL);

-- Payments
INSERT INTO payments (id_order, payment_method, status, amount, payment_date) VALUES
(1, 'credit_card', 'completed', 78.00, '2025-01-15 10:30:00'),
(2, 'paypal', 'pending', 60.00, NULL);

-- Promotions
INSERT INTO promotions (id_product, discount_percentage, start_date, end_date) VALUES
(1, 20.00, '2025-03-01', '2025-03-31'),
(2, 15.00, '2025-04-01', '2025-04-30');