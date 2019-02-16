var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
})

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected");
})

connection.query("select item_id, product_name, department_name, price from products order by item_id", function (err, results) {
    if (err) { throw err };
    // console.log(results)
    for(i=0;i<results.length;i++){
        console.log(`${results[i].item_id}\n${results[i].product_name}\n${results[i].price}]`)
    }

    inquirer.prompt([
        {
            message: "Please enter the ID of the product you would like to purchase:",
            name: "ID",
            type: "input",
            }
    ]).then(function (res) {
        connection.query(`select * from product where item_id=${res}`, function (err, results) {
            if (err) { throw err; }
            console.log(results)
        })
    })
})
