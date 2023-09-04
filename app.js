const express = require("express")
const session = require("express-session")
const app = express()
const PORT = 8080
const db = require("./models")
const cookieParser = require("cookie-parser")
const userRouter = require("./routes/userRouter.js")
const todoRouter = require("./routes/todoRouter.js")

db.sequelize.sync(
  {force : false}
)
.then(() => {
  app.listen(PORT, () => {
    console.log(`${PORT} listening`)
  })
})


app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use(express.static(__dirname + "/src/static"))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

const SECRET_KEY = "123"
app.use(cookieParser(SECRET_KEY))

app.use("/todo", todoRouter)
app.use("/", userRouter)

app.get("/404", (req, res) => {
  res.render("404")
})
app.get("*", (req, res) => {
  res.redirect("/404")
})


