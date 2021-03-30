const express = require('express');
const bodyParser = require('body-parser')
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(express.static('.'));

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});

app.get('/data', (req, res) => {
    fs.readFile('./server/goods.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        } else {
            console.log(err);
            res.end(data);
        }
    })
});

app.get('/cart', (req, res) => {
    fs.readFile('./server/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            res.setHeader('Content-Type', 'Application/json');
            res.end(data);
        } else {
            console.log(err);
            res.end(data);
        }
    })
});

app.post('/addToCart', bodyParser.json(), (req, res) => {
    fs.readFile('./server/cart.json', 'utf-8', (err, data) => {
        if (!err) {
            const goods = JSON.parse(data);

            goods.push(req.body);
            console.log(req.body);

            fs.writeFile('./server/cart.json', JSON.stringify(goods), (err) => {
                if (!err) {
                    res.end(JSON.stringify(goods));
                } else {
                    console.log(err);
                    res.end(data);
                }
            });

        } else {
            console.log(err);
            res.end(data);
        }
    })
});

app.patch('/patchCart', bodyParser.json(), (req, res) => {
    fs.writeFile('./server/cart.json', JSON.stringify(req.body), (err) => {
        if (!err) {
            res.end(JSON.stringify(req.body));
        } else {
            console.log(err);
            res.end(data);
        }
    })
});