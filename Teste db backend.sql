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

CREATE TABLE categories(
	id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    categorieName VARCHAR(120) NOT NULL,
    slug VARCHAR(120) NOT NULL,
    use_in_menu BOOL
    );

CREATE TABLE imagesProducts(
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    productId INTEGER,
    FOREIGN KEY (productID) REFERENCES Products(id),
    enabled BOOL,
    pathProduct VARCHAR(150) NOT NULL
);

CREATE TABLE imagesProducts(
	id INTEGER PRIMARY KEY AUTO_INCREMENT NOT NULL,
    productId INTEGER,
    FOREIGN KEY (productID) REFERENCES Products(id),
    enabled BOOL,
    pathProduct VARCHAR(150) NOT NULL
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

