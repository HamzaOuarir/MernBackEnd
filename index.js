const express = require("express");
const cors = require("cors");
const connectDB = require("./Connect");
const bodyParser = require('body-parser');
const UserRoutes = require('./Routes/AuthRoute');
const projectRoutes = require('./Routes/ProjectRoute');
const skillRoutes = require('./Routes/SkillRoute');
const depRoutes = require("./Routes/CertDepRoutes");
const workExpRoutes = require("./Routes/WorkExpRoute");
const path = require('path');
const app = express();
const PORT = 4000;

// Connect to MongoDB
connectDB;
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Routes
app.use('/api/users', UserRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/deplomates', depRoutes);
app.use('/api/experience', workExpRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
