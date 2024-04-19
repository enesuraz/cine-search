const generateKey = require("./generateKey");

const createUser = (_email, _username) => {
  let today = new Date().toISOString().split("T")[0];
  let user = {
    api_key: generateKey(_email, _username),
    username: _username,
    email: _email,
    usage: [{ date: today, count: 0 }],
  };

  return user;
};

module.exports = createUser;
