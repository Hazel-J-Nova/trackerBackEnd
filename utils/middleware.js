require('dotenv').config();

module.exports.checkAdmin = async (req, res, next) => {
  const user = req.user;
  if (req.user.admin !== process.env.ADMIN_PASSWORD) {
    res.json('operation not allowed');
  }
  next();
};

module.exports.checkUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    res.json('operation not allowed');
  }
  next();
};

module.exports.checkIfLoggedIn = async (req, res, next) => {
  if (!req.user) {
    res.json('not logged in');
  }
  next();
};
