--Install Command:  source ~/workspace/install.sql
CREATE TABLE IF NOT EXISTS users(
uid INT AUTO_INCREMENT PRIMARY KEY,
utype VARCHAR(9),
table_id INT
);

CREATE TABLE IF NOT EXISTS customers(
custid INT AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
phone VARCHAR(11),
address VARCHAR(50),
city VARCHAR(20),
state CHAR(2) DEFAULT 'WI',
zip VARCHAR(5),
emp_entry VARCHAR(30),
time_entered TIMESTAMP,
password CHAR(32)
);

CREATE TABLE IF NOT EXISTS employees(
empid INT AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(30) NOT NULL,
lastname VARCHAR(30) NOT NULL,
email VARCHAR(30) NOT NULL,
phone VARCHAR(11),
password CHAR(32),
emp_entry VARCHAR(30),
token CHAR(32)
);

CREATE TABLE IF NOT EXISTS dvd(
dvdid INT AUTO_INCREMENT PRIMARY KEY,
dvd_name VARCHAR(50),
emp_entry VARCHAR(30),
time_entered TIMESTAMP
);

CREATE TABLE IF NOT EXISTS movies(
movieid INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(50),
genre VARCHAR(50),
release_year CHAR(4),
length int,
language VARCHAR(50) DEFAULT 'English',
director VARCHAR(50),
lead_role VARCHAR(50),
dvd_id INT,
emp_entry VARCHAR(30),
time_entered TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS transaction(
transactionid INT AUTO_INCREMENT PRIMARY KEY,
dvdid INT,
customerid INT,
empid VARCHAR(30),
rental_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
due_date TIMESTAMP,
returned_date TIMESTAMP DEFAULT NULL,
transaction_charges DOUBLE,
late_charges DOUBLE
);

CREATE TABLE IF NOT EXISTS returns(
customerid INT,
late_charges DOUBLE,
dvdid INT,
returned_date TIMESTAMP,
emp_entry VARCHAR(30),
time_entered TIMESTAMP
);