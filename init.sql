CREATE DATABASE IF NOT EXISTS fastfood;
USE `fastfood`;

CREATE TABLE IF NOT EXISTS `products` (
  `id` CHAR(36) PRIMARY KEY,
  `description` varchar(45) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `category` varchar(45) NOT NULL
);

INSERT INTO `products` (`id`,`description`,`price`,`category`) VALUES ('256a49c2-cc80-4216-8ec4-8d132048c805','Milk-Shake',15.00,'SOBREMESA');
INSERT INTO `products` (`id`,`description`,`price`,`category`) VALUES ('2be14dfc-1387-4228-a85a-f85fe075b005','Hamburger',20.00,'LANCHE');
INSERT INTO `products` (`id`,`description`,`price`,`category`) VALUES ('46c22eb8-8985-4b29-bab6-3095b172e6a6','Refrigerante',8.00,'BEBIDA');
INSERT INTO `products` (`id`,`description`,`price`,`category`) VALUES ('6ce0cba6-c777-4547-8788-ba463f0e733c','Fritas',10.00,'ACOMPANHAMENTO');
INSERT INTO `products` (`id`,`description`,`price`,`category`) VALUES ('781676b3-4d53-4c58-8b7d-6033d045a3cb','Sunday',15.00,'SOBREMESA');
INSERT INTO `products` (`id`,`description`,`price`,`category`) VALUES ('edb50ed0-7099-4917-b41f-1c217b9d3966','Suco de laranja',8.00,'BEBIDA');


CREATE TABLE IF NOT EXISTS `orders` (
  `id` CHAR(36) PRIMARY KEY,
  `client_id` CHAR(36) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `status` varchar(45) NOT NULL
);

CREATE TABLE IF NOT EXISTS `order_items` (
  `id` CHAR(36) PRIMARY KEY,
  `order_id` CHAR(36) NOT NULL,
  `product_id` CHAR(36) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `quantity` int NOT NULL
);

CREATE TABLE IF NOT EXISTS `customer` (
  `id` CHAR(36) PRIMARY KEY,
  `cpf` varchar(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `name` varchar(45) NOT NULL
);

INSERT INTO `customer` (`id`,`cpf`,`email`,`name`) VALUES ('5c4650cd-1daf-47b7-928c-5ff35f694609','00000000000','fastfood@mail.com','fastfood');
INSERT INTO `customer` (`id`,`cpf`,`email`,`name`) VALUES ('b3e01230-bc30-4ae7-92c4-4888894df4f0','78236592049','joao@mail.com','João');
