const User = require('../models/user');

const login = (name, pwd) => {
  console.log(' пошук користувача в базі ', name);

  return new Promise((resolve, reject) => {
    User.findOne({ username: name })
      .then(user => {
        console.log('****', user);

        if (!user) {
          console.log("Невірне ім'я користувача");
          resolve({ status: "Невірне ім'я користувача" });
          return;
        }

        const passwordMatch = pwd === user.password;

        if (!passwordMatch) {
          console.log('Невірний пароль');
          resolve({ status: 'Невірний пароль' });
          return;
        }

        console.log('Користувача перевірено');
        resolve({ status: 'ok', userId: user._id });
      })
      .catch(err => {
        console.log('Помилка отримання користувача');
        reject({ status: 'error' });
      });
  });
};

module.exports = {
  login
};
