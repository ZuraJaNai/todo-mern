const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const dbURI = require('./src/config/keys').mongoURI;
const users = require('./src/routes/users');
const tasks = require('./src/routes/tasks');
const types = require('./src/routes/types');
const checkToken = require('./src/validation/request');

const app = express();
const port = process.env.PORT || 5000;
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Routes
app.use('/api/users', users);
app.use('/api/tasks', checkToken, tasks);
app.use('/api/types', checkToken, types);

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
