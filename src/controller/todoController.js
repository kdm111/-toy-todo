const myCookieConf = {
  httpOnly : true,
  signed : true
}


exports.todoMain = (req, res) => {
  res.cookie("todoLogin", req.params.name, myCookieConf)
  const {name} = req.params
  res.render("./todo/todoMain", { name : name })
}

exports.checkCookie = (req, res) => {
  console.log(req.signedCookies)

}