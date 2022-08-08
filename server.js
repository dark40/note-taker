const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');


const port = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Wildcard route to direct user to homepage
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname,'./public/index.html'))
);

// APIs
// GET request to read all notes in db.json
app.get('/api/notes', (req, res) =>{
    let data = JSON.parse(fs.readFileSync('./db/db.json', "utf8"))
    res.json(data)
})

// POST request to add a note
app.post('/api/notes', (req, res) => {

    let response = req.body;

    response.id = uuidv4();

    let data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    
    data.push(response);

    fs.writeFileSync('./db/db.json', JSON.stringify(data));
   
    res.json(data);
    });


app.listen(port, () =>
    console.log(`App listening at http://localhost:${port} 🚀`)
);
