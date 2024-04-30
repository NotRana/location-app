const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const app = express();
app.use(express.json());

/*//app.set('views',  'views');*/
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
mongoose.connect('mongodb+srv://azcodez9:azcodez9@cluster0.kqbv14n.mongodb.net/locations?retryWrites=true&w=majority');

const locationSchema = new mongoose.Schema({
    lat: String,
    long: String
  
});

const Location = mongoose.model('Location', locationSchema);

app.post('/api/get',(req,res)=>{
    const data = new Location({
        lat: req.body.lat,
        long: req.body.long
    });

    data.save()
        .then(() => {
            res.send("Data saved successfully");
        })
        .catch((err) => {
            res.status(400).send("Unable to save data");
        });
})

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
