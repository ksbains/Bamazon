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

  connect: function(cb, cb1, cb2) {
    var self = this;
    console.log('connecting...');
    this.connection.connect(function(err) {
      console.log('connected?');
      if (err) console.log(err);
      console.log("connected as id " + self.connection.threadId);
      self.connectedState = true;
      cb(cb1,cb2);
    });
  },

  disconnect: function(cb) {
    this.connectedState = false;
    this.connection.end();
    cb();
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
  var query = this.connection.query(
    "UPDATE products SET ? WHERE ?",
    [
      {
        department_name: department,
        price: price,
        stock_quantity: quantity
      },
      {
        product_name: name
      }
    ],
    function(err, res) {
      if(err){
        console.log(err);
        throw err;
      }else{
      console.log(res.affectedRows + " products updated!\n");
      }
    }
  );
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