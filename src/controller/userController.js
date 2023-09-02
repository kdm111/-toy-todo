// const userModel = require("../model/userModel.js")
const {userModel} = require("../../models")

exports.index = (req, res) => {
  res.redirect("/login")
}
exports.login = (req, res) => {
  res.render("./user/login")
}
exports.user = async (req, res) => {
  try {
    const response = await userModel.findOne({
      where : {id : req.params.id}
    })
    if (!response)
      throw error()
    res.render("./user/user", {user : response.dataValues})
  } catch {
    res.render("404")
  }
}

exports.checkUserId = (req, res) => {
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
  userModel.findOne({
    where : {userid : req.body.userid}
  })
  .then((response) => {
    if (response === null) {
      res.status(401).json()
    } else {
      const {id, name} = response.dataValues
      res.status(200).json({id : id, name : name})
    }
  })

}
exports.editUser = (req, res) => {
  userModel.update({
    name : req.body.name,
    pw : req.body.pw
  }, {
    where : {userid : req.body.userid}
  })
  .then(() => {
    res.status(201).send()
  })
}
exports.deleteUser = (req, res) => {
  userModel.destroy({
    where : {userid : req.body.userid}
  })
  .then(() => {
    res.status(204).send()
  })

}

exports.signup = (req, res) => {
  res.render("./user/signup")
}