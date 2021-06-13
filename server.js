'use strict';
const express = require('express');
const cors = require('cors');
const path = require('path');
const port = 8000;
const HOST = '0.0.0.0';

const db = require('./config/mongoose');
const Items = require('./models/items');
const Transactions = require('./models/transactions')

const app = express();

// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(express.urlencoded());

// app.use(express.static('assets')); 

app.get('/get', function(req, res){
    console.log("Get call");
    return res.end("Get Call");
});

app.post('/add-items', function(req, res){
    console.log(req.query);
    let item = {
        name: req.query.name,
        price: req.query.price
    };
    let flag = true;
    Items.create(item, function(err, newItem){
        if(err){
            console.log('Error in adding item!');
            console.error(err);
            flag = false;
        }
        console.log('New Item Added: ',newItem);
        
    });

    item['status'] = flag ? "Successful" : "Failed";
    
    res.json(item);
});

function getItemPrice(itemName){
    return new Promise(function(resolve, reject){
        Items.find({name: itemName}, function (err, item){
            if(err){
                console.log("Error in fetching item price");
            }
            resolve(item);;
        });
    }).catch(function(reason) {
        console.error("Promise rejected: "+reason);
     });
}

app.get('/transaction',async function(req, res){
    let amount = req.query.amount;
    let item = req.query.item;
    amount = parseInt(amount);

    let itemDoc = await getItemPrice(item);
    itemDoc = itemDoc[0];
    
    let flag = true;

    if(itemDoc.price > amount){
        console.log("Insufficient Amount");
        flag = false;
    }
    let change = amount - itemDoc.price;
    let status = flag ? "Successful" : "Failed";

    let response = {
        item: itemDoc.name,
        price: itemDoc.price,
        amount: amount,
        change: change,
        status: status
    };

    Transactions.create(response, function(err, newTransaction){
        if(err){
            console.log('Error in updating transaction value.');
            console.error(err);
            return;
        }
        console.log('Transation: ', newTransaction);
        
    });

    res.json(response);
});






app.listen(port, HOST, function(err){
    if(err){
        console.log("Error in running the server");
    }
    console.log("Server is running on Port ", port);
});