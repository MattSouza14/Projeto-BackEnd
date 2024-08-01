CREATE DATABASE usuarios_db;

USE usuarios_db;

CREATE TABLE users(
	id INT AUTO_INCREMENT PRIMARY KEY NOT  NULL,
    userName VARCHAR(120) NOT NULL,
    surName VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT  NULL,
    userAtivo BOOL NOT NULL,
    dataCadastro DATE NOT NULL
    );

CREATE TABLE products(
	id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    enabled BOOL NOT NULL,
    productName VARCHAR(100) NOT NULL,
    slug VARCHAR(100) NOT NULL
    );
    
CREATE TABLE users_products(
	users_id INT NOT NULL,
    products_id INT NOT NULL,
    PRIMARY KEY(users_id, products_id),
    FOREIGN KEY(users_id) REFERENCES users(id),
    FOREIGN KEY(products_id) REFERENCES products(id)
    );

