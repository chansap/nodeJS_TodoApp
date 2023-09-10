const router = require('express').Router()
const userController  = require('../controllers/userController.js')
const authenticated = require('../middlewares/auth.js')



router.get("/allUsers", userController.getAllUsers)

router.post("/register" , userController.register)

router.post("/login" , userController.login)

router.get("/myProfile", authenticated, userController.getMyProfile)

router.get('/logout', authenticated, userController.logout)

module.exports = router