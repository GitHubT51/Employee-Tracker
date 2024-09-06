import inquirer from 'inquirer';
import { pool, connectionToDb } from './connection.js';
await connectionToDb();
function mainMenu() {
    inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: 'What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    }).then(async ({ choice }) => {
        switch (choice) {
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'View all employees':
                viewEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateEmployeeRole();
                break;
            case 'Quit':
                process.exit();
        }
    });
}
//View from departments
function viewDepartments() {
    pool.query('SELECT * FROM department', (err, { rows }) => {
        if (err)
            throw err;
        console.table(rows);
        mainMenu();
    });
}
//add a new department
function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    }).then(({ name }) => {
        const sql = 'INSERT INTO department (name) VALUES ($1)';
        const params = [name];
        pool.query(sql, params, (err) => {
            if (err)
                throw err;
            console.log("department created");
        });
    });
}
;
//view from roles
function viewRoles() {
    pool.query('SELECT * FROM role', (err, { rows }) => {
        if (err)
            throw err;
        console.table(rows);
        mainMenu();
    });
}
//add a new role
function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'number',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'number',
            name: 'department_id',
            message: 'What is the department id of the role?'
        }
    ]).then(({ title, salary, department_id }) => {
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
        const params = [title, salary, department_id];
        pool.query(sql, params, (err) => {
            if (err)
                throw err;
            console.log("New role created");
        });
    });
}
//view from employees
function viewEmployees() {
    pool.query('SELECT * FROM employee', (err, { rows }) => {
        if (err)
            throw err;
        console.table(rows);
        mainMenu();
    });
}
//add a new employee
function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is the first name of the employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'What is the role id of the employee?'
        },
        {
            type: 'number',
            name: 'manager_id',
            message: 'What is the manager id of the employee?'
        }
    ]).then(({ first_name, last_name, role_id, manager_id }) => {
        const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
        const params = [first_name, last_name, role_id, manager_id];
        pool.query(sql, params, (err) => {
            if (err)
                throw err;
            console.log("New employee created");
        });
    });
}
//update an employee role
function updateEmployeeRole() {
    inquirer.prompt([
        {
            type: 'number',
            name: 'employee_id',
            message: 'What is the id of the employee?'
        },
        {
            type: 'number',
            name: 'role_id',
            message: 'What is the new role id of the employee?'
        }
    ]).then(({ employee_id, role_id }) => {
        const sql = 'UPDATE employee SET role_id = $1 WHERE id = $2';
        const params = [role_id, employee_id];
        pool.query(sql, params, (err) => {
            if (err)
                throw err;
            console.log("Employee role updated");
            mainMenu();
        });
    });
}
mainMenu();
