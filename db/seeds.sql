USE company;

INSERT INTO department
(name)
VALUES
('sales'),
('engineering'),
('finance'),
('legal');

INSERT INTO role
    (title, salary, department_id)
    VALUES
    ('sales lead', 65000, 1),
    ('salesperson', 45000, 1),
    ('lead engineer', 100000, 2),
    ('software engineer', 80000, 2),
    ('account manager'100000, 3),
    ('accountant', 80000, 3),
    ('legal lead', 550000, 4),
    ('lawyer', 250000, 4);

    INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
    VALUES
    ('Dave', 'Dirt', 3, NULL),
    ('Jeremy', 'Johnson', 2, NULL),
    ('Steve', 'Sampson', 4, NULL),
    ('Bill', 'Burges', 1, NULL)