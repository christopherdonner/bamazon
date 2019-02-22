var mysql = require("mysql");
var inquirer = require("inquirer");

var item_id
var item_quantity
var item_price
var quantity

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

function allTheThings(){
connection.query("select item_id, product_name, department_name, price from products order by item_id", function (err, results) {
    if (err) { throw err };
    for (i = 0; i < results.length; i++) {
        console.log(`Item ID: ${results[i].item_id}\nName: ${results[i].product_name}\nPrice: $${results[i].price}]`)
    }

    inquirer.prompt([
        {
            message: "Please enter the ID of the product you would like to purchase:",
            name: "ID",
            type: "input",
        }
    ]).then(function (res) {
        connection.query(`select * from products where item_id=${res.ID}`, function (err, results) {
            if (err) { throw err; }
            item_id = parseInt(results[0].item_id);
            item_quantity = parseInt(results[0].quantity);
            item_price = parseInt(results[0].price);
            inquirer.prompt([
                {
                    message: "How many would you like?",
                    name: "quantity",
                    type: "input"
                }
            ]).then(function (res) {
                quantity = parseInt(res.quantity)
                if (quantity > item_quantity) {
                    console.log("Insufficient quantity!")
                    allTheThings();
                }
                else {
                    item_quantity--;
                    console.log(item_id, item_quantity)
                    connection.query(`update products set quantity=${item_quantity} where item_id=${item_id}`)
                    console.log(`Purchase order accepted. $${item_price} has been charged to your credit card.`)
                    allTheThings();
                }
            })
        })
    })
})
}
allTheThings();
