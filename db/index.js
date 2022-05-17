const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  // get all employees function
  findAllEmployees() {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
      );
  }

  // find all managers
  findAllManagers(employeeId) {
    return this.connection.promise.query(
      "SELECT id, first_name, first_name FROM employee WHERE ID ! = ?",
      employeeId
    );
  }
  // create an employee
  createEmployee(employee) {
    return this.connection
      .promise()
      .query("INSERT INTO employee SET ?", employee);
  }
  // remove an employee
  removeEmployee(employeeId) {
    return this.connection
      .promise()
      .query("DELETE FROM employee WHERE id = ?", employeeId);
  }
  // update employee role
  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET role_id = ? WHERE = ?", [roleId, employeeId]);
  }
  // update employees manager
  updateEmployeeManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query("UPDATE employee SET manager_id = ? WHERE id =?", [
        managerId,
        employeeId,
      ]);
  }
  // find by role
  findAllRoles() {
    return this.connection
      .promise()
      .query(
        "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
      );
  }
  // create a role
  createRole(role) {
    return this.connection.promise().query("INSERT INTO role SET ?", role);
  }
  // remove a role
  removeRole(roleId) {
    return this.connection
      .promise()
      .query("DELETE FROM role WHERE ID = ?", roleId);
  }
  //find all departmnents
  findAllDepartment() {
    return this.connection
      .promise()
      .query("SELECT department.id, department.name FROM departments;");
  }
  // view department budget

  //create a department
  createDepartment(department) {
    return this.connection
      .promise()
      .query("INSERT INTO department SET ?", department);
  }
  // remove department

  // find all employees by depeartment
  findAllEmployeesByDepartment(departmentId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
        departmentId
      );
  }
  // find all employees by managers
  findAllEmployeesByManager(managerId) {
    return this.connection
      .promise()
      .query(
        "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
        managerId
      );
  }
}

module.exports = new DB(connection);
