CREATE DATABASE usuarios_db;

USE usuarios_db;
CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY NOT  NULL,
    userName VARCHAR(120) NOT NULL,
    surName VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT  NULL,
    userAtivo BOOL NOT NULL,
    dataCadastro DATE NOT NULL,
    `password` VARCHAR(120) NOT NULL
    );

CREATE TABLE products(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    enabled BOOL NOT NULL,
    productName VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL
    );
CREATE TABLE categories(
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    categorieName VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    use_in_menu BOOL
    );

CREATE TABLE imagesProducts(
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    product_id INTEGER,
    FOREIGN KEY (product_id) REFERENCES products(id),
    enabled BOOL,
    pathProduct VARCHAR(150) NOT NULL
);
CREATE TABLE option_products(
id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
product_id INT NOT NULL,
title VARCHAR(100) NOT NULL,
shape ENUM ('square', 'circle') DEFAULT 'square',
`type` ENUM('text','collor') DEFAULT 'text',
`values`VARCHAR(100) NOT NULL,
FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE categories_product(
product_id INTEGER NOT NULL,
category_id INTEGER NOT NULL,
PRIMARY KEY (product_id, category_id),
FOREIGN KEY (product_id) REFERENCES products(id), 
FOREIGN KEY (category_id) REFERENCES categories(id)
);
