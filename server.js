const express = require('express');
const path = require('path');
const api = require('./public/assets/js/index');

const port = 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));

// Wildcard route to direct user to homepage
app.get('*', (req, res) => 
    res.sendFile(path.join(__dirname,'./public/index.html'))
);

// GET route for notes
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname,'./public.notes.html'))
)

app.listen(port, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);