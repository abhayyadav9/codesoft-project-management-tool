const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");

//create task 

router.post("/create-task",async(req,res)=>{
    try{
        const {title, desc} = req.body;
        const {id} = req.headers;
        const newTask = new Task({title: title, desc:desc}); //create a new task

        const saveTask = await newTask.save();
        const taskId = saveTask._id;
        await User.findByIdAndUpdate(id, {$push:{tasks: taskId._id}}); //attaching this task in to the tasks object in the user collection
        res.status(200).json({message:"Task created"});


    }catch(error){
        console.log(error);
        res.status(400).json({message:"Internal server error"});
    }
});



router.get("/get-all-tasks",async(req,res)=>{
    try{
        const {id} = req.headers;
        const userdata=await User.findById(id).populate({path:"tasks", 
            options: {sort :{createdAt: -1}},
        });
        res.status(200).json({data: userdata});

    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "Internal Server Error"});
    }
})


//delete the tasks
router.delete("/delete-task/:id", async(req,res)=>{
    try{
        const {id} = req.params; //delete from tasks
        const userId = req.headers.id; //deleting from users route as well

        await Task.findByIdAndDelete(id);
        await User.findByIdAndUpdate(userId, {$pull :{tasks: id}});
        res.status(200).json({message: "Task deleted successfully"});
    }catch(err){
        res.status(400).json({message:"internal server error"});
    }
})

//update task

router.put("/update-task/:id", async(req,res)=> {
    try{
        const {id} = req.params;
        const {title, desc} = req.body;
        await Task.findByIdAndUpdate(id,{title: title, desc:desc});
        res.status(200).json({message: "Task updated successfully"});
    }catch(error){
       console.log(error);
       res.status(400).json({message: "Internal server error"});
    }
});


//update-Important Task
router.put("/update-imp-task/:id", async(req,res)=> {
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const ImpData = TaskData.important;
        await Task.findByIdAndUpdate(id,{important: !ImpData});
        res.status(200).json({message: "Task updated successfully"});
    }catch(error){
       console.log(error);
       res.status(400).json({message: "Internal server error"});
    }
});


//update-completed task
router.put("/update-completed-task/:id", async(req,res)=> {
    try{
        const {id} = req.params;
        const TaskData = await Task.findById(id);
        const compData = TaskData.completed;
        await Task.findByIdAndUpdate(id,{completed: !compData});
        res.status(200).json({message: "Task updated successfully"});
    }catch(error){
       console.log(error);
       res.status(400).json({message: "Internal server error"});
    }
});


//get-important tasks
router.get("/get-imp-tasks",async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data=await User.findById(id).populate({path:"tasks", 
            match:{important : true},
            options: {sort:{createdAt: -1}},
        });
        const Impdata = Data.tasks;
        res.status(200).json({data: Impdata});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "Internal Server Error"});
    }
});

//get completed-tasks

router.get("/get-complete-tasks",async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data=await User.findById(id).populate({path:"tasks", 
            match:{completed : true},
            options: {sort:{createdAt: -1}},
        });
        const compdata = Data.tasks;
        res.status(200).json({data: compdata});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "Internal Server Error"});
    }
});

//get-incomplete-tasks

router.get("/get-incomplete-tasks",async(req,res)=>{
    try{
        const {id} = req.headers;
        const Data=await User.findById(id).populate({path:"tasks", 
            match:{completed : false},
            options: {sort:{createdAt: -1}},
        });
        const compdata = Data.tasks;
        res.status(200).json({data: compdata});
    }
    catch(err){
        console.log(err);
        res.status(400).json({message: "Internal Server Error"});
    }
});



module.exports = router;