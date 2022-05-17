const { prompt } = require("inquirer");
const db = require("./db");
const logo = require("asciiart-logo");
require("console.table");

init();

function init() {
  const logosign = logo({
    name: "Employee Manager",
  }).render();

  console.log(logosign);
  startingPrompt();
}

function startingPrompt() {
  prompt([
    {
      type: "list",
      name: "choice",
      message: "Choose Role",
      choices: [
        {
          name: "View Employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View Employees by Department",
          value: "VIEW_EMPLOYEES_BY_DEPARTMENT",
        },
        {
          name: "View Employees by Manager",
          value: "VIEW_EMPLOYEES_BY_MANAGER",
        },
        {
          name: "Add Employee",
          value: "ADD_EMPLOYEE",
        },
        {
          name: "Remove Employee",
          value: "REMOVE_EMPLOYEE",
        },
        {
          name: "Update Employee Role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },
        {
          name: "Update Employee Manager",
          value: "UPDATE_EMPLOYEE_MANAGER",
        },
        {
          name: "View Roles",
          value: "VIEW_ROLES",
        },
        {
          name: "Add Role",
          value: "ADD_ROLE",
        },
        {
          name: "Remove Role",
          value: "REMOVE_ROLE",
        },
        {
          name: "View All Departments",
          value: "VIEW_DEPARTMENTS",
        },
        {
          name: "Add Department",
          value: "ADD_DEPARTMENT",
        },
        {
          name: "Remove Department",
          value: "REMOVE_DEPARTMENT",
        },
        {
          name: "View Budget by Department",
          value: "VIEW_BUDGET_BY_DEPARTMENT",
        },
        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then((res) => {
    let choice = res.choice;
    console.log(choice);
    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "VIEW_EMPLOYEES_BY_DEPARTMENT":
        viewEmployeesbyDepartment();
        break;
      case "VIEW_EMPLOYEES_BY_MANAGER":
        viewEmployeesbyManager();
        break;
      case "ADD_EMPLOYEE":
        addEmployee();
        break;
      case "REMOVE_EMPLOYEE":
        removeEmployee();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployeeRole();
        break;
      case "UPDATE_EMPLOYEE_MANAGER":
        updateEmployeeManager();
        break;
      case "VIEW_DEPARTMENTS":
        viewDepartments();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "REMOVE_DEPARTMENT":
        removeDepartment();
        break;
      case "VIEW_BUDGET_BY_DEPARTMENT":
        viewBudgetbyDepartment();
        break;
      case "VIEW_ROLES":
        viewRoles();
        break;
      case "ADD_ROLE":
        addRole();
        break;
      case "REMOVE_ROLE":
        removeRole();
        break;
      default:
        quit();
    }
  });
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      console.log(rows);
      let employee = rows;
      console.log(employee);
      console.log("\n");
      console.table(employee);
    })
    .then(() => startingPrompt());
}

function viewEmployeesbyDepartment() {
  db.findAllDepartments().then(([rows]) => {
    let departments = rows;
    const departmentChoices = departments.map(({ id, name }) => ({
      name: name,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "departmentId",
        message: "Which department would you like to see employees for?",
        choices: departmentChoices,
      },
    ])
      .then((res) => db.findEmployeesbyDepartment(res.departmentId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        console.table(employees);
      })
      .then(() => startingPrompt());
  });
}

function viewEmployeesbyManager() {
  db.findAllEmployees().then(([rows]) => {
    let managers = rows;
    const managerChoices = managers.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "managerId",
        message: "Which employee do you want to see direct reports for?",
        choices: managerChoices,
      },
    ])
      .then((res) => db.findEmployeesbyManager(res.managerId))
      .then(([rows]) => {
        let employees = rows;
        console.log("\n");
        if (employees.length === 0) {
          console.log("The selected employee has no direct reports");
        } else {
          console.table(employees);
        }
      })
      .then(() => startingPrompt());
  });
}

function removeEmployee() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    }));

    prompt([
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to remove?",
        choices: employeeChoices,
      },
    ])
      .then((res) => db.removeEmployee(res.employeeId))
      .then(() => console.log("Removed employee from database"))
      .then(() => startingPrompt());
  });

  function quit() {
    console.log(goodbye);
    process.exit();
  }
}
