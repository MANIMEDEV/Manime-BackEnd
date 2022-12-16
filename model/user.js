const db = require("../DB/connection/connection");
const Sequelize = require("sequelize");

async function getAllUsersAndEmails() {
  const conn = await db.connect();

  try {
    let result = await conn.query("SELECT userName,email FROM users;");

    return result;
  } catch (e) {
    console.log(e);
  }
}

async function registerUser(user) {
  const conn = await db.connect();
  let errorMessage = false;

  console.log("USER IP:>", user.ip);
  try {
    await conn.query(
      `insert into users (ip,email,password,userName,publicName,imgPerfil,imgBanner,terms) values (?,?,?,?,?,?,?,?);`,
      [
        user.ip,
        user.email,
        user.password,
        user.userName,
        user.publicName,
        user.imgPerfil,
        user.imgBanner,
        1,
      ]
    );
  } catch (e) {
    console.log(e);
    errorMessage = e;
  }

  if (errorMessage) {
    return [
      false,
      { error: "Erro com Banco de Dados, favor tentar novamente mais tarde" },
    ];
  } else {
    return [true, { Message: "Usuario cadastrado" }];
  }
}

module.exports = {
  getAllUsersAndEmails,
  registerUser,
};
