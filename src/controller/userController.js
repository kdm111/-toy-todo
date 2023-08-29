const userModel = require("../model/userModel.js")


exports.index = (req, res) => {
  userModel.getAllUsers((result) => {
    for (let user of result) {
      console.log(user)
    }
    res.render("index", {users : result})

  })
}