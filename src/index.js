/** 
Basics:
API: Application Programming Interface - Allows your program to communicate to other programs for cross funtionality and data retrieval

Express: Lightweight framework for JS to handle API's

Node.js: Runtime environment to JS apps on servers

cURL: Command line tool to send HTTP Requests

Postman: Graphical UI to test and debug API calls


**/

const users = [];

const { v4: uuidv4 } = require('uuid');

const express = require('express');
    //imports express.js a framework to help build apps to be ran on Node.JS

const app = express();
    //creates Express app instance

const port = 3000;
    //determines the port used to recieve incoming requests. Does not require elevated access unlike port 80 or 443

app.use(express.json());
    //automatically parses incoming JSON bodies. Neccessary for clients sending JSON data like in PUT(Update) and POST(Create)

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

app.get('/', (req, res) => {
    res.send('Hello World!');
});
    //defines the GET route URL where clients can send data to and where the server can respond from EX) http://localhost:3000/test

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }
    const newUser = {
        id: uuidv4(),
        name,
        email
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({error: "User not found"});
    }

    res.status(200).json(user);
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required" });
    }

    const user = users.find(user => user.id === id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    user.name = name;
    user.email = email;

    res.status(200).json(user);
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const index = users.findIndex(user => user.id === id);

    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }

    users.splice(index, 1);
    res.status(204).send();
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing