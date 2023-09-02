
exports.todoMain = (req, res) => {
  const {name} = req.params
  res.render("./todo/todoMain", { name : name })
}