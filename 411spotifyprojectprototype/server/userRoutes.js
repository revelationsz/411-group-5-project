const express = require('express')
const {createMood} = require('./userControllers')

const router = express.Router()

router.route('/').post(createMood)

module.exports = {router}