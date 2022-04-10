// 1. Write your functions here


// 2. Example Usage

const katzDeli = [];

// It will contain the index of the products ordered by the customer
let orderArray = [];

// Store inventory
const products = [
    {name: 'Apple',            price: 1, inventory: 5, minimumQty: 5},
    {name: 'Cesar Salad',      price: 7, inventory: 10, minimumQty: 9},
    {name: 'Cold Cut',         price: 9, inventory: 10, minimumQty: 6},
    {name: 'Chocolate Muffin', price: 3, inventory: 15, minimumQty: 10},
    {name: 'Soup of the Day',  price: 4, inventory: 30, minimumQty: 20}
]

// Add a customer name to the waiting line
function takeANumber(katzDeli, customerName) {
    katzDeli.push(customerName);
    console.log(`Welcome, ${customerName}. Your number in line is ${katzDeli.length}`);
}

// Display the customer names currently waiting to be served
function line(katzDeli) {
    console.log(`The line is currently: ` + katzDeli.map((name, index) => {return index+1 + '. ' + name + ' '}).join(' '));
}

// Print customer order
function printCustomerOrder(order, customerName) {
    console.log('============================');
    console.log(`${customerName}, this is your receipt`);
    console.log('============================');
    let orderTotal = 0;
    for (item of order) {
        let len = products[item].name.length;
        console.log(products[item].name + ' '.repeat(19 - len), products[item].price);
        orderTotal += products[item].price;
    }

    console.log('Order total:' + ' '.repeat(8-orderTotal.toString().length) + '$' + orderTotal);
    console.log('============================');
    console.log('Thank you for your bussines.');
}

function updateInventory(order) {
    for (item of order) {
        products[item].inventory--;
    }
}

// Display the customer name who is currently being served and removes her/his name from the list
function nowServing(katzDeli) {
    console.log(`Currently serving ${katzDeli[0]}`);
    printCustomerOrder(orderArray, katzDeli[0]);
    updateInventory(orderArray);
    katzDeli.shift();
    if (katzDeli.length === 0)
        console.log('There is nobody waiting to be served!');
}

// Print the inventory report
function inventoryReport() {
    console.log('\nInventory Report');
    console.log('Item               Qty  Needed');
    console.log('=================  ===  ======');
    products.map(item => {
        let itemsNeeded = 0;
        if (item.inventory < item.minimumQty) {
            itemsNeeded = item.minimumQty - item.inventory;
        }
        console.log(item.name + ' '.repeat(20-item.name.length) + item.inventory + ' '.repeat(6) + itemsNeeded);
        }
    );
}

takeANumber(katzDeli, "Ada") //=> Welcome, Ada. You are number 1 in line.
takeANumber(katzDeli, "Grace") //=> Welcome, Grace. You are number 2 in line.
takeANumber(katzDeli, "Kent") //=> Welcome, Kent. You are number 3 in line.

line(katzDeli) //=> "The line is currently: 1. Ada 2. Grace 3. Kent"

orderArray = [0, 2, 1]; // Ada ordered 3 items
nowServing(katzDeli) //=> "Currently serving Ada."

line(katzDeli) //=> "The line is currently: 1. Grace 2. Kent"

takeANumber(katzDeli, "Matz") //=> Welcome, Matz. You are number 3 in line.

line(katzDeli) //=> "The line is currently: 1. Grace 2. Kent 3. Matz"

takeANumber(katzDeli, "John") //=> Welcome, John. You are number 4 in line.

orderArray = [3, 4, 0, 1]; // Grace ordered 4 items
nowServing(katzDeli) //=> "Currently serving Grace."

line(katzDeli) //=> "The line is currently: 1. Kent 2. Matz"

orderArray = [2]; // the customer only ordered 1 item
nowServing(katzDeli) //=> "Currently serving Grace."

inventoryReport();
