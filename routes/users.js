const express = require('express');
const router = express.Router();
const User = require('../db/users');
const bcrypt = require('bcryptjs')
const services = require('../Services/services')

//Get all users in database
router.get("/all" , async (req, res) => {
    result = await User.getAllUsers()
    console.table(result.rows)
    res.setHeader("content-type", "application/json")
    res.status(200).send(JSON.stringify(result.rows))
})

//Ajoute un utilisateur a la database
router.post("/add" , async (req, res) => {   
  if (services.validateUser(req.body)) {   
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

//Get if a user is admin
router.get("/isadmin", services.authentificateToken , async (req, res) => {
  console.log("is admin route")
  result = await User.getUserIsAdmin(req.user.userName)   
  res.setHeader("content-type", "application/json")
  res.status(200).send(JSON.stringify(result.rows))
})

//Delete un utilisateur de la database
router.delete("/delete", services.authentificateToken , async (req, res) => {
  console.log("user id to delete " + req.query.pkIdUser)
  result = await User.deleteUser(req.query.pkIdUser)   
  res.setHeader("content-type", "application/json")
  res.status(200).send("Deleted a User from database")
})

//Edit un utilisateur dans la database
router.put("/edit", services.authentificateToken , async (req, res) => {  
  result = await User.editUser(req.body.userName, req.body.pkIdUser),   
  res.setHeader("content-type", "application/json")
  res.status(200).send(JSON.stringify(result.rows))
})

//Ban un utilisateur
router.put("/ban", services.authentificateToken , async (req, res) => {  
  result = await User.banUser(req.body.userName)   
  res.setHeader("content-type", "application/json")
  res.status(200).send(JSON.stringify(result.rows))
})

//Unban un utilisateur
router.put("/unban", services.authentificateToken , async (req, res) => {  
  result = await User.unBanUser(req.body.userName)   
  res.setHeader("content-type", "application/json")
  res.status(200).send(JSON.stringify(result.rows))
})

module.exports = router;