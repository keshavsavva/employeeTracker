const connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
}
function printDoubleQuestionMarks(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("??");
  }

  return arr.toString();
}

  var orm = {
    all: function(tableInput, cb) {
      var queryString = "SELECT * FROM ??;";
      connection.query(queryString, [tableInput], function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    create: function(table, cols, vals, cb) {
      var queryString = "INSERT INTO ??";
      queryString += " (";
      queryString += printDoubleQuestionMarks(cols.length);
      queryString += ") ";
      queryString += "VALUES (";
      queryString += printQuestionMarks(vals.length);
      queryString += ") ";
      var inputs = [];
      inputs.push(table);
      cols.forEach(el => {
        inputs.push(el);
      });
      vals.forEach(el => {
        inputs.push(el);
      });
      console.log(queryString); 
      connection.query(queryString, inputs, function(err, result) {
        if (err) {
          throw err;
        }
  
        cb(result);
      });
    },
    getList: function(table, col, cb) {
      var queryString = `SELECT ?? FROM ??`;
      connection.query(queryString, [col, table], (err, result) => {
        if (err) throw err;
        cb(result);
      })
    }
  };

module.exports = orm;