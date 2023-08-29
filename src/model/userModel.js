const mysql = require("mysql")
const conn = mysql.createConnection({
  host : "localhost",
  user : "user",
  password : "1234",
  database : "todo"
})

exports.getAllUsers = (callBack) => {
  conn.query(`
    SELECT * FROM user;
  `, (err, rows) => {
    if (err)
      throw(err)
    callBack(rows)
  })
}
