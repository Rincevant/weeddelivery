const jwt = require('jsonwebtoken')
const User = require('../db/users')
module.exports = {

  validateUser(user) {
    console.log("Checking signup inputs...")
    const validUserName = typeof user.userName == 'string' && user.userName.trim() != '' && user.userName.trim().length >= 3 ;
    const validPass = typeof user.password == 'string' && user.password.trim() != '' && user.password.trim().length >= 4;
    return validPass && validUserName
  },

  async authentificateToken(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(403)

    //Searching if token exist
    var result = await User.findToken(token)
    if (result.rows.length == 0) return res.sendStatus(403)

    jwt.verify(token, 'blablasecret', (err, user) => {
      if (err) return res.sendStatus(403)
      req.user = user
      next()
    })
  }
}