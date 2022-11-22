require('dotenv').config();
const express = require('express');
const cors = require('cors');

// config
const db = require('./config/db');
const corsOptions = require('./config/cors');
// handlers
const errorsHandling = require('./handlers/errorsHandler');
// routes
const initialRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

db.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

initialRoutes(app);

// handling errors status
app.use(errorsHandling);

app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});
