const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "UPDATE"],
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
  const qualification = req.body.qualification;
  const age = req.body.age;

  db.query(
    "INSERT INTO data (name, position, qualification, age) VALUES (?,?,?,?)",
    [name, position, qualification, age],
    function (err, insert) {
      if (err) {
        console.log(err);
      }

      res.send({ signed: true });
      console.log("Data uploaded");
    }
  );
});
app.get("/users", (req, res) => {
  db.query("SELECT * FROM data", function (err, result) {
    if (err) throw err;
    console.log("result");
    res.send(result);
  });
});
app.get("/users/:id", (req, res) => {
  let id = req.params.id;
  db.query(`SELECT * FROM data WHERE id = '${id}'`, function (err, result) {
    if (err) throw err;
    console.log("r");
    res.send(result);
    console.log(result);
  });
});
app.post("/users/:id", (req, res) => {
  let id = req.params.id;
  let user = req.body;
  delete user.id;
  console.log(user);
  let nameup = user.name;
  let positionup = user.position;
  let qualificationup = user.qualification;
  let ageup = user.age;

  db.query(
    `UPDATE data SET name='${nameup}',position='${positionup}', qualification='${qualificationup}', age='${ageup}'  WHERE id = ${id}`,
    function (err, result) {
      if (err) {
        console.log("upload agala");
      }
      console.log("name uploaded");

      res.send(user);
    }
  );
});
app.delete("/users/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
  db.query(`DELETE FROM data WHERE id = '${id}'`, function (err, result) {
    if (err) {
      console.log("can't delete");
      res.send("Can't Deleted");
    }
    console.log("Data will be Deleted");
    res.send("Data will be Deleted");
  });
});

app.post("/dropadd", (req, res) => {
  const position = req.body.position;
  const qualification = req.body.qualification;
  db.query(
    "INSERT INTO dropdata ( position, qualification) VALUES (?,?)",
    [position, qualification],
    function (err, insert) {
      if (err) {
        console.log(err);
      }

      res.send({ DataUpload: true });
      console.log("Drop Data uploaded");
    }
  );
});

app.get("/dropget1", (req, res) => {
  const position = req.body.position;
  const qualification = req.body.qualification;

  db.query(
    "SELECT qualification FROM dropdata",
    [position, qualification],
    function (err, result) {
      if (err) {
        console.log(err);
      }
      res.send(result);

      console.log("Drop Data uploaded");
    }
  );
});
app.listen(3003, () => {
  console.log("running server");
});
