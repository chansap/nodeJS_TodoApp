const router = require('express').Router()
const taskController  = require('../controllers/taskController.js')
const authenticated = require('../middlewares/auth.js')

router.post('/new', authenticated, taskController.createTask)

router.get('/my', authenticated, taskController.allMyTasks)

router.route('/:id').put(taskController.updateTask).delete(taskController.deleteTask)

// router.put('/:id', authenticated, taskController.updateTask)

module.exports = router