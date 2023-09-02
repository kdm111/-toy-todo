const express = require("express")
const router = express.Router()
const todoController = require("../src/controller/todoController")

router.get("/:name", todoController.todoMain)

module.exports = router
