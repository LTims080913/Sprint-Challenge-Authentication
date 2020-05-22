const router = require('express').Router();
const bcryptjs = require('bcryptjs') 

const Jokes = require('../jokes/jokes-model')

router.post('/register', (req, res) => {
  // implement registration
  const {username, password} = req.body
  Jokes.add({username, password: bcryptjs.hashSync(password, 12)})
  .then(id => {
    res.status(201).json({message: 'Successfully registered user', id})
  })
  .catch(error => {
    console.log(error)
    res.status(500).json({message: 'Failed to register user. Please try again'})
  })
});

router.post('/login', (req, res) => {
  // implement login
  let {username, password} = req.body
  Jokes.findBy({username})
  .first()
  .then(user => {
    if (user && bcryptjs.compareSync(password, user.password)) {
      req.session.user = user
      res.status(200).json({message: `Welcome ${user.username}! Have you heard the latest dad joke?`})
    } else {
      res.status(401).json({message: 'You have provided invalid credentials. Please try again.'})
    }
  })
  .catch(error => {
    console.log(error)
    res.status(500).json(error)
  })
});

module.exports = router;
