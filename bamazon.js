var mysql = require("mysql");

var db = {
  connectedState: false,
  connection: null,
  createConnection: function() {
    console.log('create connection');
    this.connection = mysql.createConnection({
      host: "localhost",
      port: 3306,

      // Your username
      user: "root",

      // Your password
      password: "root",
      database: "bamazon"
    })
  },

  connect: function(cb) {
    var self = this;
    console.log('connecting...');
    this.connection.connect(function(err) {
      console.log('connected?');
      if (err) console.log(err);
      console.log("connected as id " + self.connection.threadId);
      self.connectedState = true;
      cb();
    });
  },

  disconnect: function() {
    this.connectedState = false;
    this.connection.end();
    //cb();
  }
};


db.createProduct = function(name, department, price, quantity) {
  console.log("Inserting a new product...\n");
  var query = this.connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: name,
      department_name: department,
      price: price,
      stock_quantity: quantity
    },
    function(err, res) {
      console.log(res.affectedRows + " product inserted!\n");
      // Call updateProduct AFTER the INSERT completes
      updateProduct();
    }
  );
  // logs the actual query being run
  console.log(query.sql);
}
db.updateProduct = function(name, department, price, quantity) {
  console.log("Updating all Rocky Road quantities...\n");
  var query = this.connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        department_name: department,
        price: price,
        stock_quantity: 100
      },
      {
        product_name: name
      }
    ],
    function(err, res) {
      console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
      readProducts();
      //why are we calling delete? is it because set makes a new product?
    }
  );

  // logs the actual query being run
  console.log(query.sql);
}

db.deleteProduct = function(name) {
  console.log("Deleting "+ name);
  this.connection.query(
    "DELETE FROM products WHERE ?",
    {
      product_name: name
    },
    function(err, res) {
      console.log(res.affectedRows + " products deleted!\n");
      // Call readProducts AFTER the DELETE completes
      readProducts();
    }
  );
}

db.readProducts = function() {
  console.log("Selecting all products...\n");
  this.connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
    connection.end();
  });
}


module.exports = db;