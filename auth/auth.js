const express = require('express')
const router = express.Router()
const User = require('../db/users');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const services = require('../Services/services')

router.post('/login', async (req, res) => {
    console.log("Connecting to ToDoList...")

    //Check if user exist    
    const user = await User.getOnebyUserName(req.body.userName)    
    if (user.rowCount == 0) return res.status(400).send('User not found')
    
    //Check if Password is valid
    const validPassword = await bcrypt.compare(req.body.password, user.rows[0].pass)    
    if (!validPassword) return res.status(400).send('Invalid password')

    //Check if User is ban
    const banUser = await User.getUserBan(req.body.userName)
    if (banUser.rows[0].isban == true) return res.status(400).send('Your account is actually close')    

    //Create token and sent it back
    const token = jwt.sign( {userName : req.body.userName}, 'blablasecret', {expiresIn: '2m'})
    await User.addTokenToUser(token)

    res.header('auth-token', token).send(token)    
})

router.post('/signup', (req, res) => {
  // Check si le nom et le pass sont valide  
  if (services.validateUser(req.body)) {
    // Check si l'user est unique
    console.log("userName & password OK...")
    User.getOnebyUserName(req.body.userName).then( result => {
      if (result.rows.length == 0) {
        var salt = bcrypt.genSaltSync(8);
        var hash = bcrypt.hashSync(req.body.password, salt);
        User.addUserToDatabase(req.body.userName, hash).then( result => {
          res.send("Added user to database")
        })
      } else {
        console.log("Error : User already exist")
        res.send("User already exist")
      }
    }) 
  } else {
    console.log("Error : Invalid user or password selected")
    res.send("Invalid User...")
  }
})

module.exports = router