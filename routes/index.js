const express = require("express")
const router = express.Router()
const userController = require("../src/controller/userController.js")

router.get("/", userController.index)
router.get("/login", userController.login)
router.get("/user/:id", userController.user)
router.post("/create/user", userController.createUser)

router.post("/check/userid", userController.checkUserId)
router.get("/signup", userController.signup)


module.exports= router