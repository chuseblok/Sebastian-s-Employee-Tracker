  const sql = "INSERT INTO employee(id, first_name, last_name, role_id, manager_id) VALUES ?";
    const Values = [
        ['1','Sebastian', 'Chunley', '5', '60']
    ];
    connect.query(sql,[Values], function (err, result){
        if(err) throw err;
        console.log("number of records inserted:" + result.affectedRows);
    }); 