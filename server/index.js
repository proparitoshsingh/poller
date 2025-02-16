const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db');
const pollsRouter = require('./routes/pollRoutes');
const loggerMiddleware = require('./middleware/loggerMiddleware');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/polls', pollsRouter);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});