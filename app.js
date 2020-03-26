const inquirer = require("inquirer");
const orm = require("./config/orm.js");
const cTable = require("console.table");
const connection = require("./config/connection.js");

const initial = [
    {
        type: "list",
        name: "actionType",
        message: "What would you like to do?",
        default: "View All Employees",
        choices: [
            "View All Employees",
            "View All Roles",
            "View All Departments",
            "Add Employee",
            "Add Role",
            "Add Department",
            "Update Employee Role",
            "End"
        ]
    }
];
function start() {
    inquirer.prompt(initial).then(data => {
        if(data.actionType === "View All Employees") {
            connection.query("SELECT employee.id, employee.first_name as First, employee.last_name as Last, role.title as Role, department.name as Department, role.salary as Salary from employee inner join role on role.id = employee.role_id inner join department on department.id = role.department_id", (err, result) => {
                if (err) throw err;
                console.table(result);
                start();
            });
        } else if (data.actionType === "View All Roles") {
            connection.query("SELECT role.id, role.title as Title, role.salary as Salary, department.name as Department from role inner join department on department.id = role.department_id", (err, result) => {
                if (err) throw err;
                console.table(result);
                start();
            });
        } else if (data.actionType === "View All Departments") {
            orm.all("Department", function(result) {
                console.table(result);
                start();
            })
        } else if (data.actionType === "Add Employee") {
            getRoles(function(result) {
                const addEmployee = [
                    {
                        type: "input",
                        name: "first_name",
                        message: "What is the Employee's first name?"
                    },
                    {
                        type: "input",
                        name: "last_name",
                        message: "What is the Employee's last name?"
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "What is the Employee's role at the company?",
                        default: "View All Employees",
                        choices: result
                    }
                ];
                inquirer.prompt(addEmployee).then( (data) => {
                    if(data.role) {
                        const queryString = "SELECT id FROM role WHERE title = ?";
                        connection.query(queryString, [data.role], function(err, result) {
                            if (err) throw err;
                            let role_id = result[0].id;
                            orm.create("employee", ["first_name", "last_name", "role_id"], [data.first_name, data.last_name, role_id], function(result) {
                                console.log("Employee Added!")
                            })
                        });
                    }
                    start();
                })
            });
        } else if (data.actionType === "Add Role") {
            getDepartments(function(result) {
                const addRole = [
                    {
                        type: "list",
                        name: "department",
                        message: "What department do you want to add a role to",
                        default: "Engineering",
                        choices: result
                    },
                    {
                        type: "input",
                        name: "title",
                        message: "What role do you want to add to this department?"
                    }, 
                    {
                        type: "number",
                        name: "salary",
                        message: "What is the salary of this role?"
                    }, 
                ];
                inquirer.prompt(addRole).then( (data) => {
                    if(data.department) {
                        const queryString = "SELECT id FROM department WHERE name = ?";
                        connection.query(queryString, [data.department], function(err, result) {
                            if (err) throw err;
                            let department_id = result[0].id;
                            orm.create("role", ["title", "salary", "department_id"], [data.title, data.salary, department_id], function(result) {
                                console.log("Role Added!")
                            })
                        });
                    }
                    start();
                })
            });
        } else if (data.actionType === "Add Department") {
            const addDepartment = [
                {
                    type: "input",
                    name: "name",
                    message: "What department do you want to add to this company?"
                }
            ];
            inquirer.prompt(addDepartment).then( (data) => {
                if (data.name) {
                        orm.create("department", ["name"], [data.name], function(result) {
                            console.log("Department added!")
                        })         
                }
                start();
            })
        } else if (data.actionType === "Update Employee Role") {
            getEmployees( function(result) {
                let list = [];
                result.forEach(el => {
                    let item = `${el.first_name} ${el.last_name}`;
                    list.push(item);
                });
                getRoles(function(roles) {
                    const updateEmployeeRole = [
                        {
                            type: "list",
                            name: "employeeToBeUpdated",
                            message: "Which employee's role would you like to update?",
                            default: "Keshav Avva",
                            choices: list
                        },
                        {
                            type: "list",
                            name: "newRole",
                            message: "What should their new role be?",
                            default: "Senior Engineer",
                            choices: roles
                        }
                    ];
                    inquirer.prompt(updateEmployeeRole).then( (data) => {
                        if (data.newRole) {
                            connection.query(`SELECT id from role where title = ?`, [data.newRole], (err, returnId) => {
                                if (err) throw err;
                                let role_id = returnId[0].id;
                                var names = data.employeeToBeUpdated.split(" ");
                                var first_name = names[0];
                                var last_name = names[1];
                                const queryString = `update employee set role_id = ? where first_name = ? and last_name = ?`;
                                connection.query(queryString, [role_id, first_name, last_name], (err, x) => {
                                    console.log(`Updated ${data.employeeToBeUpdated}'s role to ${data.newRole}!`)
                                })
                            })
                            
    
                        }
                        start();
                    })
                })
                
            })
        } else if (data.actionType === "End") {
            console.log("All Done!")
        }
    })
}

function getRoles(cb) {
    orm.getList("role", "title", function(result) {
        let list = [];
        result.forEach(el => {
            list.push(el.title);
        }) 
        cb(list);
    });
};   

function getDepartments(cb) {
    orm.getList("department", "name", function(result) {
        let list = [];
        result.forEach(el => {
            list.push(el.name);
        }) 
        cb(list);
    });
}

function getEmployees(cb) {
   var queryString = `Select first_name, last_name from employee`;
   connection.query(queryString, (err, result) => {
       if (err) throw err;
       cb(result);
   } )
}

start();