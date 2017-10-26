var inquirer = require("inquirer");
var db = require('./bamazon.js');

function prompt (){
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
      name: "quanitity"
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
    	//when the id is confirmed and the quantity have been confirmed
    	
    }
    else {
      console.log("\nThat's okay " + inquirerResponse.username + ", come again when you are more sure.\n");
    }
  });
}

function displayAll() {
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
  }else{
    console.log("You have to be connected to the db in order to do this.");
  }
}

function main(){
  console.log("the value before the connect is: " + db.connectedState);
  db.createConnection();
  db.connect(displayAll);
  //db.disconnect();
  //prompt();
}

main();

  //function that need to be runn
  //diplay eveything in the table
  //prompt messages 
  //	first one ill ask for the id of the product.
  //	second one ill ask for the quanitity of the products and then deduct from table