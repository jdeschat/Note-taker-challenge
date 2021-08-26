const fs = require('fs');
const path = require('path');
const express = require('express');
// const { animals } = require('./data/animals');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static("public"));


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    res.json(parseNotes);
});

app.post('/api/notes', (req, res) => {
    const dataNotes = fs.readFileSync(path.join(__dirname, './db/db.json'), "utf-8");
    const parseNotes = JSON.parse(dataNotes);
    parseNotes.push(req.body);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(parseNotes), "utf-8");
    res.json("You have successfully added a note!");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// });

// app.get('/api/notes/:id', (req, res) => {
//     const result = findById(req.params.id, animals);
//     if (result) {
//         res.json(result);
//     } else {
//         res.send(404);
//     }
// });

// app.post('/api/animals', (req, res) => {
//     // set id based on what the next index of the array will be
//     req.body.id = animals.length.toString();

//     // if any data in req.body is incorrect, send 400 error back
//     if (!validateAnimal(req.body)) {
//         res.status(400).send('The animal is not properly formatted.');
//     } else {
//         const animal = createNewAnimal(req.body, animals);
//         res.json(animal);
//     }
// });

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});