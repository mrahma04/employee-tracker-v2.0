SELECT employee.*, role.title, role.salary
FROM employee
INNER JOIN role ON employee.role_id = role.id;

SELECT role.*, department.name
FROM role
INNER JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id AS manager
FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id;

UPDATE employee
SET role_id = 2
WHERE id = 1;