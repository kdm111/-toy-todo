const express = require("express")
const app = express()
const PORT = 8080
const router = require("./routes/index.js")

app.listen(PORT, (req, res) => {
  console.log(`${PORT} listening`)
})

app.set("view engine", "ejs")
app.set("views", "./src/views")

app.use(express.static(__dirname + "/src/static"))

app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.use("/", router)


