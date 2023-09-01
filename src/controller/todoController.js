
exports.todoMain = (req, res) => {
  const {id} = req.params
  res.render("./todo/todoMain", { user : id })
}