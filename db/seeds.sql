INSERT INTO department (name)
VALUES ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');
INSERT INTO role (title, salary, department_id)
VALUE ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mike', 'Chan', 1, NULL),
    ('Ashley', 'Rodriguez', 2, NULL);