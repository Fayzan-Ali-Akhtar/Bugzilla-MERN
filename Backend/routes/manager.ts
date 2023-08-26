const express = require('express')
const router = express.Router()

const { login, dashboard,signup } = require('../controllers/main')

// const authMiddleware = require('../middleware/auth')

// router.route('/').get(signup)
router.route('/').post(signup)
// router.route('/login').post(login)

module.exports = router
