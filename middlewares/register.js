let modelUser = require("../model/user");
const requestIp = require("request-ip");

async function verifyNames(req, res, next) {
  let usersDB = await modelUser.getAllUsersAndEmails();

  let userReq = req.body;
  let errorMessage;
  console.log(userReq);
  await usersDB[0].map((userdb) => {
    if (userReq.email == userdb.email) {
      errorMessage = { messageError: "Email em uso" };
    }
    if (userReq.userName == userdb.userName) {
      errorMessage = { messageError: "Nome de usuario em uso" };
    }
  });
  if (errorMessage) {
    res.send(JSON.stringify(errorMessage));
  } else {
    next();
  }
}
async function registerUser(req, res, next) {
  let clientIp = requestIp.getClientIp(req);
  clientIp = clientIp.replaceAll(":", "");
  clientIp = clientIp.replaceAll("f", "");

  let user = {
    email: req.body.email,
    password: req.body.password,
    userName: req.body.userName,
    publicName: req.body.publicName,
    imgPerfil: req.body.imgPerfil,
    imgBanner: req.body.imgBanner,
    ip: clientIp,
    terms: 1,
  };

  let resRegister = await modelUser.registerUser(user);

  if (resRegister[0] == false) {
    res.send(resRegister[1]);
  } else {
    next();
  }
}

module.exports = {
  verifyNames,
  registerUser,
};
