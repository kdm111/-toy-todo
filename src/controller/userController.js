// const userModel = require("../model/userModel.js")
const {userModel} = require("../../models")

exports.index = (req, res) => {
  res.redirect("/login")
}
exports.login = (req, res) => {
  res.render("./user/login")
}
exports.user = (req, res) => {

  // userModel.getUser(req.params.id, (response) => {
  //   res.render("./user/user", {user : response[0]})
  // })

  userModel.findOne({
    where : {id : req.params.id}
  })
  .then((response) => {
    res.render("./user/user", {user : response.dataValues})
  })
}

exports.checkUserId = (req, res) => {
  // userModel.checkUserId(req.body.userid, (response) => {
  //   if (response.length) {
  //     res.json({value : true})
  //   } else {
  //     res.json({value : false})
  //   }
  // })

  userModel.findOne({
    where : {userid : req.body.userid}
  })
  .then((response) => {
    if (response === null) {
      res.send()
    } else {
      res.status(400).send()
    }
  })
}
exports.createUser = (req, res) => {
  userModel.createUser(req.body, (response) => {
    res.send({user : response})
  })
}

exports.loginUser = (req, res) => {
  // userModel.loginUser(req.body, (response) => {
  //   if (response.length && req.body.pw === response[0].pw) {
  //     res.json({isLogin : true, userid : response[0].userid, id : response[0].id})
  //   } else{
  //     res.json({isLogin : false})
  //   }
  userModel.findOne({
    where : {userid : req.body.userid}
  })
  .then((response) => {
    console.log(response)
    if (response === null) {
      res.status(401).json()
    } else {
      const {id} = response.dataValues
      res.status(200).json({id})
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