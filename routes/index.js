const express = require("express")
const router = express.Router()
const userController = require("../src/controller/userController.js")

router.get("/", userController.index)

module.exports= router