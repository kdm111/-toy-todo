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
exports.checkUserId = (userid, callBack) => {
  conn.query(`
    SELECT 1 FROM user
    WHERE userid = "${userid}";
  `, (err, rows) => {
    if (err)
      throw(err);
    callBack(rows)
  })
}
exports.createUser = (data, callBack) => {
  const {userid, name, pw} = data
  conn.query(`
    INSERT INTO user(userid, name, pw)
      VALUES("${userid}", "${name}", "${pw}");
  `, (err, rows) => {
    if (err)
      throw(err);
      conn.query(`
        SELECT * from user
        WHERE id = "${rows.insertId}";
      `, (err, rows) => {
        if (err)
          throw(err);
        callBack(rows)
      })
  })
}


exports.getUser = (id, callBack) => {
  conn.query(`
    SELECT * FROM user
    WHERE id = "${id}";
  `, (err, rows) => {
    if (err)
      throw (err);
    callBack(rows);
  })
}
