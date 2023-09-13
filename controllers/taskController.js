const taskModel = require("../models/tasksModel")
const CustomeError = require("../utils/customErr")
const logger = require('../utils/winstonLog.js')

const createTask = async(req, res, next) => {

    try{
        const {title, description} = req.body
    
        const taskData = await taskModel.create({
            title,
            description,
            user : req.userProfile._id
        })
    
        if(taskData){
            logger.info("Task created successfully")
            return res.status(201).json({
                status : 201,
                message : "Task created",
                task : taskData
            })
        }else{
            return logger.error(next( new CustomeError()) )
        }
    }catch(err){
        logger.error(next(err) )
    }
} 

const allMyTasks = async(req, res, next) => {

    try{
        const allTaskData = await taskModel.find({user : req.userProfile._id}).select({__v:0, user:0})

        if(allTaskData){
            logger.info(`Getting all the tasks for ${req.userProfile.email}`)
            res.status(200).json({
                success : true,
                tasks : allTaskData
            })
        }else{
            return logger.error( next(new CustomeError('No datas available', 400) ) )
        }
    }catch(err){
        logger.error( next(err) )
    }
}

const updateTask = async(req, res, next) => {

    try{
        const {id} = req.params

        const particularTask = await taskModel.findById(id)
    
        if(!particularTask){
            // return next(new Error('Invalid Error') )
            return logger.warn( next(new CustomeError('Invalid Task for Update', 400) ) )
        }
        else{
            particularTask.isCompleted = !particularTask.isCompleted
            particularTask.save()
        
            logger.info("Task has been updated")
            res.status(200).json({
                success : 200,
                message : "Task Updated Successfully"
            })
        }
    }catch(err){
        logger.error( next(err) )
    }

}

const deleteTask = async(req, res, next) => {

    try{
        const {id} = req.params

        const particularTask = await taskModel.findById(id)
    
        if(!particularTask){
            // return next(new Error('Invalid Error') )
            return logger.error( next(new CustomeError('Invalid task to Delete', 404) ) )
        }
        else{
            particularTask.deleteOne()
    
            logger.info("Task deleted successfully")
            res.status(200).json({
                success : 200,
                message : "Task deleted Successfully"
            })
        }
    }catch(err){
        logger.error( next(err) )
    }
}

module.exports = {
    createTask,
    allMyTasks,
    updateTask,
    deleteTask
}