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

CREATE TABLE categories_product(
	product_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
    );
create table option_products(
id int primary key auto_increment,
product_id int not null,
title varchar(100) not null,
shape enum ('square', 'circle') default '0',
`type` enum('text','collor') default 'text',
`values`varchar(100) not null,
foreign key (product_id) references products(id)
);
