DROP DATABASE IF EXISTS `bamazon`;
CREATE DATABASE `bamazon`;
USE `bamazon`;

CREATE TABLE `products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `product_name` VARCHAR(145) NULL,
  `department_name` VARCHAR(145) NULL,
  `price` DECIMAL(10,2) NULL,
  `stock_quantity` INT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `products` (product_name,department_name, price, stock_quantity)
VALUES ("basektball", "sports", 18.99, 100),("Jordans", "sports", 120.99, 80),("Lenovo T470s", "electronics", 1127.99, 100),
("Sony XBR65X750D 4K TV", "electronics", 1298.00, 65),("Playstation 4", "electronics", 299.99, 75), ("ramen", "food", 22.64, 1000),
("Cotton Cheesecloth", "food", 3.99, 3000), ("football", "sports", 15.99, 100);
