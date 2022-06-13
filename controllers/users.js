const User = require('../models/Users');

module.exports.register = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await new User({ email, userName });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      console.log(err);
      res.json(req.user, err);
    });
  } catch (e) {
    console.log(e);
    res.send(e);
  }
};

module.exports.login = (req, res) => {
  res.json(req.user);
};

module.exports.logout = (req, res) => {
  req.logout();
  // req.session.destroy();
  res.json('/');
};

module.exports.passwordResetForm = async (req, res) => {
  const newPassword = req.body.password;
  const userName = req.body.userName;

  const { token } = req.params;
  const user = await User.findOne({ username: userName });
  if (!user || userName !== user.username || user.token !== token || !token) {
    res.json('/');
  }
  user.setPassword(req.body.password);
  user.token = '';
  res.json('/user/login');
};

module.exports.userProfile = async (req, res) => {
  const { userName } = req.params;
  const currentUser = await User.findOne({ username: userName });
  res.json(currentUser);
};
