const User = require('../models/Users');
const email = require('../Email/index');

module.exports.register = async (req, res) => {
  const { email, userName, password } = req.body;
  try {
    const user = await new User({ email, userName });
    if (req.file) {
      user.avatar = req.file.url;
    }
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
    res.json('invalid token');
  }
  user.setPassword(req.body.password);
  user.token = '';
  res.json(user);
};

module.exports.userProfile = async (req, res) => {
  const { userName } = req.params;
  const currentUser = await User.findOne({ username: userName });
  res.json(currentUser);
};

module.exports.sendPasswordEmail = async (req, res) => {
  let token = new Date();
  token = Math.floor(token * Math.random());
  const userId = req.params;
  const user = await User.findById(userId);
  user.toke = token;
  await user.save;
  let emailOptions = {
    from: '"Hazel Tate" <Hazel.Tate@caesura.dev>',
    to: user.email,
    subject: 'password reset',

    text: 'click here to reset your password',
    html: `<p> click here to reset you password <a href=${user.token}>rest</a></p>`,
  };
};

module.exports.updateUser = async (req, res) => {
  let userId = req.params;
  let user = await User.findById(userId);
  for (let [key, value] of Object.entries(req.body)) {
    user[key] = value;
  }
  await user.save();
  res.json(user);
};
