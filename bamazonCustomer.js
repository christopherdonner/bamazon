var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

connection.connect(function(err){
    if (err) throw err;
    console.log("connected");
})

connection.query("select item_id, product_name, product_department, price from products order by item_id")

inquirer.prompt([
    {
        message: "Please enter the ID of the item you would like to purchase",
        name: "ID"
    }
])