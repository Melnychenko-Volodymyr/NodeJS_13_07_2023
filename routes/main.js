const express = require('express');

const router = express.Router();

const authCtrl = require('../controllers/auth');

userId = null;
username = '';

router.get('/', (req, res) => {
  if (userId) {
    res.send(`Ласкаво просимо, ${username}!`);
  }
else {
  res.redirect('/login');
}
});

router.get('/login', (req,res) => {
  res.render('login');
});

router.get('/work', (req,res) => {
  if (userId) {
     res.render('work');
  }   
});

router.post('/login', async (req, res, next) => {

  const { username, password } = req.body;
  
  authCtrl.login(username, password)
  .then(result => {

  if (result.status === 'ok') {
    userId = result.userId;
    req.session.userId = userId;
  }  
 
  res.json(result);
  

  })
  .catch(error => {
    console.log('Помилка: ', error);

  });

  
});

router.get('/logout', (req, res) => {
  req.session.userId = null;
  userId = null;
  username = '';
  res.redirect('/login');  
});


 
module.exports = router;