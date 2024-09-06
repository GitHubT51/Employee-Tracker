INSERT INTO department (id, name)
VALUES (1, 'Engineering'),
       (2, 'Finance'),
       (3, 'Legal'),
       (4, 'Sales');

INSERT INTO role (id, title, salary, department_id)
VALUES (1, 'Software Engineer', 100000, 1),
       (2, 'Accountant', 80000, 2),
       (3, 'Lawyer', 120000, 3),
       (4, 'Salesperson', 80000, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, 'Kerry', 'Oki', 1, NULL),
       (2, 'Liv', 'Long', 2, NULL),
       (3, 'Camp', 'Payne', 3, 1),
       (4, 'Ford', 'Parker', 4, NULL);
