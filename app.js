const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const config = require('./config/config');
const cors = require('cors');

const app = express();
const commentRoutes = require("./routes/Comment");
const playlistRoutes = require("./routes/Playlist");
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(config.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    // Define routes and other server configurations here

    app.use('/api/auth', authRoutes);
    app.use('/api', commentRoutes);
    app.use('/api', playlistRoutes);
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
