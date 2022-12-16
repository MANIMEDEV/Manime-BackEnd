async function connect() {
  if (global.connection && global.connection.state !== "disconnected") {
    return global.connection;
  }
  const mysql = require("mysql2/promise", "mysql2");
  const connection = await mysql.createConnection(
    "mysql://root:Manimedev123@localhost:3306/manime"
  );
  console.log("Conectou no MYSQL!");
  global.connection = connection;
  return connection;
}

module.exports = { connect };
