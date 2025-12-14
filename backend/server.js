const express = require('express');
const { MongoClient } = require('mongodb');
const bodyparser=require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const cors=require('cors')

const url = process.env.MONGO_URI;
const client = new MongoClient(url);

const dbName = 'PassBox';
const app = express();
const port =  process.env.PORT ||3000;
const hostname = '127.0.0.1';
app.use(bodyparser.json());
app.use(cors())

 client.connect();

app.get('/', async (req, res) => {
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
})
app.post('/', async (req, res) => {
    const password=req.body;
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.insertOne(password);
    res.send({success:true , result:findResult});
})
app.delete('/', async (req, res) => {
    const password=req.body;
    const db=client.db(dbName);
    const collection=db.collection('passwords');
    const findResult = await collection.deleteOne(password);
    res.send({success:true , result:findResult});
})


app.listen(port, () => {
    console.log(`Server running `);
});
