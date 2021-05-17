const express = require('express')
const port = 3000
require('dotenv').config()
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4czm1.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

client.connect(err => {
    const movie = client.db("movie").collection("movie");
    app.get('/movie/:category', (req, res) => {
        movie.find({ cetagory: req.params.category })
            .toArray((err, documents) => {
                res.send(documents)
            })
    })
});
app.get('/', (req, res) => {
    res.send('work')
})

app.listen(process.env.PORT || port)