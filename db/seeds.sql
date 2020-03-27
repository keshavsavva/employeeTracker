insert into department (name) values ("Engineering"),("Human Relations"),("Finance"),("Quality Control"),("Legal");

insert into role (title, salary, department_id) values ("Junior Engineer", 60000.00, 1),
("Senior Engineer", 85000.00, 1),
("Staffing Coordinator", 35000.00, 2),
("Personnel Manager", 57000.00, 2),
("Accountant", 65000.00, 3),
("Billing Analyst", 75000.00, 3),
("Quality Analyst", 52000.00, 4),
("Quality Coordinator", 62000.00, 4),
("Lawyer", 80000.00, 5);

insert into employee (first_name, last_name, role_id, manager_id) values
("Keshav","Avva", 1, 1),
("Doug","Judy", 2, 1),
("Jake","Peralta", 3, 2),
("Amy","Santiago", 4, 2),
("Terry","Crews", 5, 2),
("Ted","Mosbey", 6, 3),
("Marshall","Ericson", 7, 3),
("Lilly","Ericson", 8, 4),
("Barney","Stinson", 9, 4);

insert into manager (name) values
("George Washington"),
("Thomas Jefferson"),
("Abraham Lincoln"),
("Theodore Roosevelt");

