const express = require("express")
const router = express.Router()
const todoController = require("../src/controller/todoController")


router.get("/:name", todoController.todoMain)
router.get("/check/cookie", todoController.checkCookie)
module.exports = router
