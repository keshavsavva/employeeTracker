DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;
USE employee_db;

CREATE TABLE department
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
    primary key (id)
);

CREATE TABLE role
(
	id int NOT NULL AUTO_INCREMENT,
	title varchar(30) NOT NULL,
    salary decimal(10.2) NOT NULL,
    department_id INT NOT NULL,
    primary key (id)
);

CREATE TABLE employee
(
	id int NOT NULL AUTO_INCREMENT,
	first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id int null,
    primary key (id)
);

CREATE TABLE manager
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(30) NOT NULL,
    primary key (id)
);
