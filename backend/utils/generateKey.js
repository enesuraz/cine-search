const generateKey = (email, username) => {
  const data = email + username;
  return Buffer.from(data).toString("base64");
};

module.exports = generateKey;
