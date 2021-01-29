import express from  'express';
import mongoose from 'mongoose';
import Cards from './dbCards.js';
import Cors from 'cors';

//? App Config 
const app = express();
const port = process.env.PORT || 8001;
const connection__url = 'mongodb+srv://admin:tinderclone@cluster0.0elas.mongodb.net/tinderdb?retryWrites=true&w=majority' 

//? Middlewares
app.use(express.json());
app.use(Cors());

//? DB config
mongoose.connect(connection__url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

//? API Endpoints
app.get('/', (req, res) => res.status(200).send('HELLO WORLD!!!'));

app.post('/tinder/cards', (req, res) => {
    const dbCard = req.body;

    Cards.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(201).send(data)
        }
    }) 
}); 

app.get('/tinder/cards', (req, res) => {
    Cards.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
});


//? Listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));

