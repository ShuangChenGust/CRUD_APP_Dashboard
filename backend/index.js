//server starts point
const express = require("express");
const app = express();
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "cs951126",
  database: "CRUD_APP",
});

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cs951126",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Database - Connected!");
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//READ: Used to query data
app.get("/api/get", (req, res) => {
  const sqlSelect = "select * from filter_order limit 20";
  db.query(sqlSelect, (err, result) => {
    res.send(result);
    //console.log(`result`, result);
  });
});

//used to Create, insert data
app.post("/api/insert", (req, res) => {
  const OrderID = req.body.OrderID;
  const CustomerID = req.body.CustomerID;
  const ProductID = req.body.productID;
  const ProductName = req.body.productName;
  const ShipDate = req.body.shipDate;
  const Description = req.body.description;

  console.log(
    `Insert data`,
    req.body
    // OrderID,
    // CustomerID,
    // ProductID,
    // ProductName,
    // ShipDate,
    // Description
  );

  const sqlInsert =
    "INSERT INTO filter_order(order_id, customer_id, product_id, product_name, ship_date, description) VALUES(?,?,?,?,?,?);";
  db.query(
    sqlInsert,
    [OrderID, CustomerID, ProductID, ProductName, ShipDate, Description],
    (err, result) => {
      console.log(`error:`, err);
      console.log(`result`, result);
    }
  );
});
//used to delte
app.delete("/api/delete/:deleteID", (req, res) => {
  const ORDER_ID = req.params.deleteID;
  const sqlDelete = "DELETE FROM filter_order WHERE ORDER_ID = ?";

  db.query(sqlDelete, ORDER_ID, (error, result) => {
    if (error) {
      console.log("error:", error);
    } else {
      console.log(`result`, result);
    }
  });
});

//used to update
app.put("/api/update", (req, res) => {
  const order_id = req.body.OrderID;
  const description = req.body.description;
  console.log(`debug-orderID`, order_id);
  const sqlUpdate =
    "UPDATE filter_order SET DESCRIPTION = ? WHERE ORDER_ID = ?";

  db.query(sqlUpdate, [description, order_id], (error, result) => {
    if (error) {
      console.log("error:", error);
    } else {
      console.log(`result`, result);
    }
  });
});

app.get(`/healthcheck`, (req, res) => {
  const sqlInsert = "INSERT INTO filter_order(ORDER_ID) VALUES(123);";
  db.query(sqlInsert, (error, result) => {
    res.send(`hi there Shuang, you added one row`);
  });
  //res.send(`hi there Shuang`);
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
