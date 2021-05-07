const mysql = require('mysql');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');

app.use(bodyparser.json());


var mysqlConnection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'mom143honey',
    database : 'StudentDB'

});

mysqlConnection.connect((err)=>{
 if(!err)
 console.log('DB COnnection Success');
 else
 console.log('DB Connection Failed \n Error : ' + JSON.stringify(err,undefined,2));
});

app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

//Get all students
app.get('/students', (req, res) => {
    mysqlConnection.query('SELECT * FROM Student', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an student
app.get('/students/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM Student WHERE StdID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Delete an student
app.delete('/students/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM Student WHERE StdID = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});

//Insert an student
app.post('/students', (req, res) => {
    let emp = req.body;
    var sql = "SET @StdID = ?;SET @Name = ?;SET @College = ?;SET @Percentage = ?; \
    CALL StudentAddOrEdit(@StdID,@Name,@College,@Percentage);";
    mysqlConnection.query(sql, [emp.StdID, emp.Name, emp.College, emp.Percentage], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted employee id : '+element[0].EmpID);
            });
        else
            console.log(err);
    })
});

//Update an student
app.put('/students', (req, res) => {
    let emp = req.body;
    var sql = "SET @StdID = ?;SET @Name = ?;SET @College = ?;SET @Percentage = ?; \
    CALL StudentAddOrEdit(@StdID,@Name,@College,@Percentage);";
    mysqlConnection.query(sql, [emp.StdID, emp.Name, emp.College, emp.Percentage], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});
