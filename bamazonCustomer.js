var inquirer = require("inquirer");
var db = require('./bamazon.js');

function prompt (cb){
  inquirer.prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is the product id of the item you would like",
      name: "id"
    },
    {
    	type: "confirm",
    	message:"are you sure this is the id you would like?",
    	name:"confirmId",
    	default: false
    },
    {
      type: "input",
      message: "How many would you like?",
      name: "quantity"
    },
    {
    	type: "confirm",
    	message:"are you sure that is how many you want?",
    	name:"confirmQuantity",
    	default: false
    }
  ])
  .then(function(inqRes) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inqRes.confirmId && inqRes.confirmQuantity) {
      console.log("in the then part of the promt");
      //if the id is in the table and there is enough quanitiy then deduct it from the SQL DB and present the customer with the ssale. 
      cb(inqRes.id, inqRes.quantity);
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    }
  });
}

function buy(id, quantity){
  console.log("You are about the buy the item with an id of " + id + " and quantity of " + quantity);
  db.connection.query("SELECT * FROM `products` WHERE `id` =" + id, function(err, res){
    if(err){
      console.log(err);
      throw err;
    }else{
      //if the id is in the products table, now we check the quantity;
      // [ RowDataPacket 
      //   {
      //     id: 2,
      //     product_name: 'Jordans',
      //     department_name: 'sports',
      //     price: 120.99,
      //     stock_quantity: 80 
      //   } 
      // ]
      
      if(res[0].stock_quantity >= quantity){
        console.log("Lucky you! We still have this item in stock!! We still have " + res[0].stock_quantity + " of that product");
        //deduct quantitiy amount of item id from the db
        var stock = res[0].stock_quantity - quantity;
        db.updateProduct(res[0].product_name, res[0].department_name, res[0].price, stock);
        var total = res[0].price * quantity;
        console.log("Thank you for visiting Bamazon! your total is: " + total);
      }else{
        console.log("Insufficient quantity! sorry that item does not have enough in stock");
      }
    }
  });
}

function displayAll(cb1, cb2) {
  //need to diplay everything in the Database here.
  console.log("inside of displayAll")
  console.log(db.connectedState); 
  if (db.connectedState) {
    db.connection.query("SELECT * FROM `products`", function(err, res) {
      if (err){
        console.log(res);
        throw err;
      }else{
        console.log("id product_name department_name price stock_quantity");
        for(var i = 0; i< res.length; i++){
          console.log(res[i].id,res[i].product_name,res[i].department_name,res[i].price,res[i].stock_quantity);
        }
      } 
    });
    cb1(cb2);
  }else{
    console.log("You have to be connected to the db in order to do this.");
  }
}

function main(){
  console.log("the value before the connect is: " + db.connectedState);
  db.createConnection();
  db.connect(displayAll, prompt, buy);
}

main();

  //function that need to be runn
  //diplay eveything in the table
  //prompt messages 
  //	first one ill ask for the id of the product.
  //	second one ill ask for the quanitity of the products and then deduct from table