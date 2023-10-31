const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const config = require('./config/config');
const cors = require('cors');

const app = express();
const commentRoutes = require("./routes/Comment");
app.use(bodyParser.json());


app.use(cors());


mongoose
  .connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.use('/api/auth', authRoutes);
app.use('/api', commentRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
