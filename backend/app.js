const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./conn/conn");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task");

// Configure CORS
const corsOptions = {
    origin: 'https://project-management-tool-av.onrender.com', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(express.static(path.join(__dirname, 'build')));

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/", UserAPI); 
app.use("/api", TaskAPI);

const PORT = process.env.PORT || 5000; // Use environment variable for port if available


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
