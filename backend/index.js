const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");




const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST","OPTIONS", "PUT", "DELETE", "UPDATE"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));



const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Password1@",
  database: "krrish",
});

app.post("/add", (req, res) => {
  const name = req.body.name;
  const position = req.body.position;
  const qualification= req.body.qualification;
  const age = req.body.age;


    db.query(
      "INSERT INTO data (name, position, qualification, age) VALUES (?,?,?,?)",
      [name, position, qualification, age],
      function (err, insert)   {
        if(err) {
          console.log(err);
        }
        
        res.send({ signed: true });
        console.log("Data uploaded");
      }
    );
  });
app.get("/users", (req,res) => {
  db.query("SELECT * FROM data", function (err, result) {
    if (err) throw err;
    console.log("result");
     res.send(result);
     
     
  });
});
app.get("/users/:id", (req,res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM data WHERE id = '${id}'` , function (err, result) {
    if (err) throw err;
    console.log("r");
     res.send(result);
     console.log(result);
     
  });
});
app.delete("/users/:id", (req,res) => {
  let { id } = req.params.id;
  let sql = `DELETE FROM data WHERE id = ${req.params.id}`;

  db.query('sql', function (err, result) {
    if (err) throw err;
    console.log("delete agala");
     res.send(result);
     
     
  });
});
app.put("/users/:id", (req,res) => {
  // console.log(user);
  let id = req.params.id;
let user= req.body;
delete user.id
console.log(user);

  db.query(`UPDATE data SET ? WHERE id = ${id}, [user]`, function (err, result) {
    if (err) {
      console.log("upload agala");
    }
    console.log(user);

     res.send(user);
     
     
  });
});

app.listen(3003, () => {
  console.log("running server");
});