const express = require('express')
const port = 3000
const cors = require('cors')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://shihabmilky:shihab@cluster0.4czm1.mongodb.net/movie?retryWrites=true&w=majority";
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

app.listen(port)