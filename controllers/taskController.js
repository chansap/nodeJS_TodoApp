const taskModel = require("../models/tasksModel")
const CustomeError = require("../utils/customErr")

const createTask = async(req, res, next) => {

    try{
        const {title, description} = req.body
    
        const taskData = await taskModel.create({
            title,
            description,
            user : req.userProfile._id
        })
    
        if(taskData){
            return res.status(201).json({
                status : 201,
                message : "Task created",
                task : taskData
            })
        }else{
            return next( new CustomeError())
        }
    }catch(err){
        next(err)
    }
} 

const allMyTasks = async(req, res, next) => {

    try{
        const allTaskData = await taskModel.find({user : req.userProfile._id}).select({__v:0, user:0})

        if(allTaskData){
            res.status(200).json({
                success : true,
                tasks : allTaskData
            })
        }else{
            return next(new CustomeError('No datas available', 400) )
        }
    }catch(err){
        next(err)
    }
}

const updateTask = async(req, res, next) => {

    try{
        const {id} = req.params

        const particularTask = await taskModel.findById(id)
    
        if(!particularTask){
            // return next(new Error('Invalid Error') )
            return next(new CustomeError('Invalid Task for Update', 400) )
        }
        else{
            particularTask.isCompleted = !particularTask.isCompleted
            particularTask.save()
        
            res.status(200).json({
                success : 200,
                message : "Task Updated Successfully"
            })
        }
    }catch(err){
        next(err)
    }

}

const deleteTask = async(req, res, next) => {

    try{
        const {id} = req.params

        const particularTask = await taskModel.findById(id)
    
        if(!particularTask){
            // return next(new Error('Invalid Error') )
            return next(new CustomeError('Invalid task to Delete', 404) )
        }
        else{
            particularTask.deleteOne()
    
            res.status(200).json({
                success : 200,
                message : "Task deleted Successfully"
            })
        }
    }catch(err){
        next(err)
    }
}

module.exports = {
    createTask,
    allMyTasks,
    updateTask,
    deleteTask
}