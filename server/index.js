const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "react_practice",
});
//App Front Page
app.get('/', (req, res) => {
    res.send("Hello server!");
});
//App GET * From todos
app.get('/todos', (req, res) => {
    const select = "SELECT * FROM todos";
    db.query(select, (err, result) => {
        if (err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});
//App ADD From todos
app.post('/add', (req, res) => {
    const text = req.body.text;
    
    const insQuery = "INSERT INTO todos (text, status) VALUES (?, 0)"
    db.query(insQuery, [text], (err, result) =>{
        if(err){
            console.log(err);
        }else{
            res.send("Submitted Values");
        }
    });
});
//App DELETE From todos
app.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    
    const delQuery = "DELETE FROM todos WHERE id = ?";
    db.query(delQuery, [id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Deleted Value");
        }
    });
});

//App PUT new status of todo in todos
app.put('/update', (req, res) => {
    const id = req.body.id;
    const status = req.body.status;

    const putQuery = "UPDATE todos SET status = ? WHERE id = ?";
    db.query(putQuery, [status, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Updated status value");
        }
    });
});

//App PUT new todoText for todo in todos
app.put('/change', (req, res) => {
    const id = req.body.id;
    const newText = req.body.text;

    const putQuery = "UPDATE todos SET text = ? WHERE id = ?";
    db.query(putQuery, [newText, id], (err, result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Updated text value");
        }
    })
});

app.listen(3001, () =>{
    console.log("running on port 3001");
});
