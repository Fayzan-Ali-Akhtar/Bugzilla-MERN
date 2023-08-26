const express = require('express')
const router = express.Router()

const {signup,login,getOneManager,getAllManagers } = require('../controllers/main')

// const authMiddleware = require('../middleware/auth')

// router.route('/').get(signup)
router.route('/signup').post(signup)
router.route('/login').post(login) // Route for getting all managers

router.route('/').get(getOneManager) // Route for getting a single manager by ID
router.route('/all').get(getAllManagers) // Route for getting all managers
// router.route('/login').post(login)

module.exports = router
