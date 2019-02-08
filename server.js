const bcrypt = require('bcrypt-nodejs');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const knex = require('knex')

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');
const profile = require('./controllers/profile');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smartbrain'
    }
});

const app = express();

// parse body for json.
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT || 8080, () => {
    console.log(`Listening on port ${process.env.port}` );
});

// This should not be here anymore, but leaving incase of future
// updates to course that changes it.
// app.get('/', (req, res) => {
//     res.send(database.users);
// });

// can move arrow functions to inside the controller
app.put('/image', image.handleImagePut(db))

app.post('/imageurl', image.handleApiCall())

//or keep them outside
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) })