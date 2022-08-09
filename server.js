const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const port = 3001;

const app = express();

app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Get route to notes
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);

// APIs
// GET request to read all notes in db.json
app.get('/api/notes', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json'))
    res.json(data);

})

// POST request to add a note
app.post('/api/notes', (req, res) => {

    let newNote = req.body;

    newNote.id = uuidv4();

    let data = JSON.parse(fs.readFileSync("./db/db.json"));

    data.push(newNote);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));
    res.json(data);
});


// Delete the targeted notes based on ID
app.delete('/api/notes/:id', (req, res) => {
    let noteSelected = (req.params.id).toString()
    let noteList = JSON.parse(fs.readFileSync('./db/db.json'))

    // filter the selected note out of the note list. 
    noteList = noteList.filter(target => {
        return target.id != noteSelected
    })

    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})

// Wildcard route to direct user to homepage
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))

);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);
