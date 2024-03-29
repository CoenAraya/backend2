import { Router } from 'express';
import UsersManager from '../Dao/UserManagerMongo.js';
import { __dirname } from '../utils.js';

const path = __dirname + '/productosAgregar.json';

const router = Router();
const usersManager = new UsersManager();

router.get('/', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');
});

router.get('/errorRegister', (req, res) => {
  res.render('errorRegister');
});

router.get('/errorLogin', (req, res) => {
  res.render('errorLogin');
});

router.post('/register', async (req, res) => {
  const newUser = await usersManager.createUser(req.body);
  if (newUser) {
    res.redirect('/login');
  } else {
    res.redirect('/login/errorRegister');
  }
});

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await usersManager.loginUser(req.body);
    if (user) {
      req.session['username'] = username;
      req.session['firstName'] = user.firstName;
      if (username === 'adminCoder@coder.com' && password === 'adminCod3r123') {
        req.session['role'] = 'admin';
      } else {
        req.session['role'] = 'user';
      }
      res.redirect(`/views`);
    } else {
      res.redirect('/login/errorLogin');
    }
});

router.get('/logout', async (req, res) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (error) {
    console.log(error);
    res.status(500).json('error');
  }
});



export default router;
