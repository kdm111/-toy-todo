const userModel = require("../model/userModel.js")

exports.index = (req, res) => {
  res.redirect("/login")
}
exports.login = (req, res) => {
  res.render("./user/login")
}
exports.user = (req, res) => {
  userModel.getUser(req.params.id, (response) => {
    res.render("./user/user", {user : response[0]})
  })
}

exports.checkUserId = (req, res) => {
  userModel.checkUserId(req.body.userid, (response) => {
    if (response.length) {
      res.json({value : true})
    } else {
      res.json({value : false})
    }
  })
}
exports.createUser = (req, res) => {
  userModel.createUser(req.body, (response) => {
    res.send({user : response})
  })
}
exports.signup = (req, res) => {
  res.render("./user/signup")
}