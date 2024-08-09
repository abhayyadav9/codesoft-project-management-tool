const express = require("express");
const app = express();
require("dotenv").config();
require("./conn/conn");
const cors = require("cors");
const UserAPI = require("./routes/user");
const TaskAPI = require("./routes/task")
app.use(cors());
app.use(express.json());
app.use("/api/", UserAPI); 
app.use("/api", TaskAPI);
//it will run on //localhost:5000/api/sign-in

const PORT = 5000;

app.listen(PORT, ()=> {console.log("Server started")});
