const express = require('express')
const router = express.Router()

const {signup,getOneManager,getAllManagers } = require('../controllers/main')

// const authMiddleware = require('../middleware/auth')

// router.route('/').get(signup)
router.route('/').post(signup)
router.route('/').get(getOneManager) // Route for getting a single manager by ID
router.route('/all').get(getAllManagers) // Route for getting all managers
// router.route('/login').post(login)

module.exports = router
