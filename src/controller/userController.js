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

exports.loginUser = (req, res) => {
  userModel.loginUser(req.body, (response) => {
    if (response.length && req.body.pw === response[0].pw) {
      res.json({isLogin : true, userid : response[0].userid, id : response[0].id})
    } else{
      res.json({isLogin : false})
    }
  })
}
exports.editUser = (req, res) => {
  userModel.editUser(req.body, () => {
    res.json({editUser : true})
  })
}
exports.deleteUser = (req, res) => {
  userModel.deleteUser(req.body, () => {
    res.json({deleteUser : true})
  })

}

exports.signup = (req, res) => {
  res.render("./user/signup")
}