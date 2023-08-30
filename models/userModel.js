const userModel = (sequelize, dataTypes) => {
  const model = sequelize.define("user",{
    id : {
      type : dataTypes.INTEGER,
      allowNull : false,
      primaryKey : true,
      authIncrement : true
    },
    userid : {
      type : dataTypes.STRING(20),
      allowNull : false,
    },
    name : {
      type : dataTypes.STRING(10),
      allowNull : false
    },
    pw : {
      type : dataTypes.STRING(20),
      allowNull : false
    }
  }, {
    tableName : "user",
    freezeTableName : true,
    charset : "utf8",
    collate : "utf8_general_ci",
    timestamps : false
  })
  return model
}

module.exports = userModel